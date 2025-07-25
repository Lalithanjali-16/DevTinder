const express = require("express")
const userRouter = express.Router();
const {userAuth} = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest")
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"
const User = require("../models/user")

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA);

        res.json({
            message: "Received connection requests",
            data: connectionRequest
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch connection requests",
            error: err.message
        });
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            status: "accepted",
            $or: [
                { toUserId: loggedInUser._id },
                { fromUserId: loggedInUser._id }
            ]
        })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequest.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            } else {
                return row.fromUserId;
            }
        });


        res.json({data });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});



userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        // user should see all the cards except
        // 1) his own card 
        // 2) his connections 
        // 3) already sent the connextion request

        const loggedInUser = req.user;

        //Find all the connection request (sent + received)
        const connectionRequest = await ConnectionRequest.find({
            $or : [
                {fromUserId : loggedInUser._id} , {toUserId : loggedInUser._id}
            ]
        }).select("fromUserId toUserId")

        const hideUsersFromFeed = new Set();
        connectionRequest.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
           $and : [{ _id : {$nin : Array.from(hideUsersFromFeed)} },
            { _id : {$ne : loggedInUser._id}}
           ]
        }).select(USER_SAFE_DATA)
        
        console.log(hideUsersFromFeed)

        res.send(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = userRouter;