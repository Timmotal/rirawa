import express from "express";
import bodyParser from "body-parser"; //to process the request body
import mongoose from "mongoose"; // data base modelling
import cors from "cors"; //cross origin requests -> so the domain can be accessed anywhere
import dotenv from "dotenv"; // to hide certain credentials
import multer from "multer"; // for files upload
import helmet from "helmet"; // security package -> for REQUESTS safety
import morgan from "morgan"; // for login
import path from "path";// allows us to properly set the paths, when we configure directories
import { fileURLToPath } from "url";  //and this too
import authRoutes from "./routes/auth.js"; // paths & routes for every type of feature (auth here)
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

/* <<<<<<<<<MIDDLEWARE & PACKAGE CONFIGURATIONS >>>>>>>>>>>>>*/
// middleware is basically something that runs between different request
// basically functions that runs between different things

// so we can grab the file URL, specifically when we use the modules, so we can use dir name
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); // this is only when you use the type modules
dotenv.config(); // use dot.env files
const app = express(); // invoke express app, so we can use our middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));// so we do not have any issues
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); 
app.use(cors()); // will invoke cross origin sharing policies
// sets the directory of where we keep the assets
// /we will store this locally, in a real life -> it is stored in an actual storage
// eg. cloud storage like S3 (13 Mins Tutorial Hours) -> we are keeping things simple
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
// he got the config from the Github repo of Multer
// / this is how you can save your files, any time someone uploads a file unto your website
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets"); // will be saved into this folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage }); // helps us to save it | we use this to upload a file

/* ROUTES WITH FILES */
// upload is the middleware here -> he doesn't do the route folder
// because we need the upload in the index file, right above, so not in a separate file
app.post("/auth/register", upload.single("picture"), register);
// when a post is made, we need to allow for picture upload, hence this route
app.post("/posts", verifyToken, upload.single("picture"), createPost);
// INSTALL INTELLISENSE

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001; // as a backup
mongoose
  .connect(process.env.MONGO_URL, { // surprised we do use quotation for this credential
    useNewUrlParser: true, // why this and the option below
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD MOCK DATA ONE TIME */
    // be careful to add this DATA only onetime
    // User.insertMany(users);
    // Post.insertMany(posts);
  })  
  .catch((error) => console.log(`${error} did not connect`));
