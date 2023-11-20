import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
 // grabs user feed when on their homepage
//  the homepage takes every single post in the database and serves it
// IF YOU WANT THIS TO BE CURATED -> YOU WOULD NEED A VERY SOPHISTICATED ALGORITHM
// NOW THEY USE AI & ML TO MAKE SURE THOSE FEEDS ARE RELEVANT AND PROVIDING VALUE TO THE ADVERTISERS TOO
router.get("/", verifyToken, getFeedPosts);
// grab only posts a particular user posted 
router.get("/:userId/posts", verifyToken, getUserPosts); // says this is redundant
// what he said was redundant was actually perfect, but I think I am the one who maybe wrong here tho
// router.get("/:userId", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost); // like and unlike a post

export default router;
