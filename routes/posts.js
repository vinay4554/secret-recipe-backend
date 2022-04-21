import express from "express";
import {
  getpost,
  createpost,
  deletepost,
  likepost,
  GetPost,
} from "../controllers/post.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getpost);
router.post("/createpost", auth, createpost);
router.delete("/:id", auth, deletepost);
router.post("/likepost/:id", auth, likepost);
router.get("/getpost/:id", auth, GetPost);

export default router;
