- Create a repository
- Initialize the repository
- nodu_modules, package.json, package-lock.json
- Install express
- Create a server
- Listen to port 3000
- Write request handlers for '/home'
- Install nodemon and update scripts inside package.json


- What are dependencies?
- Dependencies are external Node.js packages (modules) that your project needs to run. They are typically installed via npm (Node Package Manager) and listed inside the package.json file so that anyone who downloads your project knows which libraries to install.


- What is the use of -g while npm install?
- The -g (or --global) flag means “install this package globally”, i.e., for your entire system, not just for one specific project.


- Difference between caret and tilde (^ vs ~)

🔹 ^ (Caret) – "Compatible with" (more flexible)
        "express": "^4.17.1"
        Allows updates within the same major version.This includes bug fixes and new features, but not breaking changes.

        In this case, it will allow versions:

        >=4.17.1 and <5.0.0
        ✅ So it'll accept:
        4.17.2
        4.18.0
        ❌ But not: 5.0.0

        🔹 ~ (Tilde) – "Approximately equivalent to" (more strict)

        "express": "~4.17.1"
        Allows updates only within the same minor version. Usually used when you want to avoid surprises.
        In this case, it will allow versions:

        >=4.17.1 and <4.18.0
        ✅ So it'll accept:
        4.17.2
        ❌ But not:
        4.18.0
        5.0.0

- Played with routes and route extensions


⭐ Order of the routes matter ⭐

- Installed Postman and used it for API testing
- Tested get,post,delete API calls
- Difference btn app.use and app.all
- Middlewares
- Error handling
- Create a free cluster on MongoDB official website
- Install mongoose library
- Connect your application to the Database "Connection url"/devTinder
- Call the connectDB and connect to database
- Create a user schema, user model
- Create POST Signup API calls to add data to database
- Push some documents using API calls from postman
- Error handling using try , catch
- JS Object vs JSON
- Add the express.json middleware to your app
- Make your signup API dynamic to receive data from the end user
- API -Get user by email
- API - Feed API - GET/feed - get all the users from the database
- Delete a user API
- Update a user API
- Validations for schema and added timestamps in schema
- Data sanitization - Add API Validation for each field
- Installed validator and explored validator functions
- Validated user data in signup ,installed bcrypt package ,created password hash using bcrypt.hash and Encrypted Passwords
- Created login API and compared passswords and throw errors when email or password is invalid
- install cookie-parser, jsonwebtoken and import them
- Create a cookie
- In login API , Create a JWT token
- Send token to cookie
- Create profile page and send cookie to it and find out who is logged in 
- Used middleware for authentication ( userAuth)
- Set the expiry of JWT token and cookies to 7 days
- Create User schema method for JWT and password validation
- Group multiple routes under respective routers
- Created authRouter, profileRouter, requestRouter
- Imported thede routers in app.js
- Created POST/logout
- Created PATCH/profile/edit
- Created connection request schema
- Added proper validation,handled  many corner cases
- $or query
- schema.pre("save")

- ⭐Read more about indexes
- ⭐⭐Why do we need index in DB
- ⭐⭐What is the advantages and disadvantages of creating index
- ⭐⭐Why we shouldn't create more indexes


- Wrote code for /request/review/:status/:requestId