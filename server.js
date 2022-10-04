const express = require("express"); //helps build out API
const app = express();
const mongoose = require("mongoose"); //helps talk to mongoDB
const passport = require("passport"); //user authentication
const session = require("express-session"); //to allow users to stay logged in as they move across app
const MongoStore = require("connect-mongo")(session); //storing session in mongoDB (to keep you logged in)
const methodOverride = require("method-override"); //browser only does GET/POST, we use this to override the methods for the CRUD app
const flash = require("express-flash");
const logger = require("morgan"); //logger of methods/routes
const connectDB = require("./config/database"); //getting database
const mainRoutes = require("./routes/main"); //basic route for home page
const postRoutes = require("./routes/posts"); //basic route for posts
const commentRoutes = require("./routes/comments"); //basic route for comments

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
