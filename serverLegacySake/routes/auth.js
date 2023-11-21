import express from "express";
import { login } from "../controllers/auth.js";

// allows Express to recognize that these routes will be configured
// allows us to have it in separate files -> keeping us organized 
const router = express.Router();

// he didn't specify auth here because app.use (is already applying the auth in index js)
router.post("/login", login);


export default router;
