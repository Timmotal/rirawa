import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// - Says with the Users we are not going to follow CRUD to the Teeth
// - Because this will take forever
/* READ */ // -> Literally READ the data
router.get("/:id", verifyToken, getUser); // call the database with this particular ID
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
//  we need both the ID of the current user and the friend we wannt to add/remove
// also this app friend list works more like twitter not facebook -> follow
router.patch("/:id/:friendId", verifyToken, addRemoveFriend); 

export default router;
