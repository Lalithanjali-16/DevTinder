const mongoose = require("mongoose")
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: [true, "First name is required"],
        minlength: [4, "First name must be at least 4 characters"],
        maxlength: [50, "First name cannot exceed 50 characters"]
    },
    lastName : {
        type: String,
        maxlength: [50, "Last name cannot exceed 50 characters"]
    },
    emailId: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email format");
            }
        }
    },
    password :{
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password"+ value)
            }
        }
    },
    age : {
        type : Number,
        min: [0, "Age must be a positive number"]
    },
    gender : {
        type : String,
        validate(value){
            if(!["male",'M',"Male","MALE","FEMALE","OTHER","Female","F","Other"].includes(value)){
                throw new Error ("Gender data is not valid")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid URL for photo");
            }
        }
    },
    about :{
        type : String,
        default: "Hi there ! I am a new user",
        maxlength: [300, "About section cannot exceed 300 characters"]
    },
    skills : {
        type : [String],
        validate: {
            validator: function (arr) {
                return arr.length <= 20;
            },
            message: "You can add up to 20 skills"
            }
    }
},{
    timestamps : true
});
const User = mongoose.model("User",userSchema)
module.exports = User;