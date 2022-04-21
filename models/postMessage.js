import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Postschema = new Schema({
  creator: String,
  name: String,
  title: {
    type: String,
  },
  items: {
    type: String,
  },
  process: {
    type: String,
  },
  tags: [String],
  SelectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", Postschema);

export default PostMessage;
