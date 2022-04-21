import express from "express";
import { signin } from "../controllers/user.js";
import { signup } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

export default router;
