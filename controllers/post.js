import postMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getpost = async (req, res) => {
  try {
    const postmessages = await postMessage.find();

    res.status(200).send(postmessages);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};

export const GetPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postMessage.findById(id);
    console.log(post);
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
export const createpost = async (req, res) => {
  const post = req.body;
  const newpost = new postMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newpost.save();
    res.status(201).json(newpost);
  } catch (error) {
    res.status(409).json({ message: "Post Creation Failed" });
  }
};

export const deletepost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post Present with that data");

  try {
    await postMessage.findByIdAndRemove(id);

    res.status(200).json({ message: "Post Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const likepost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post Present with that data");
  try {
    const post = await postMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedpost = await postMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.json(updatedpost);
  } catch (error) {
    console.log(error);
  }
};
