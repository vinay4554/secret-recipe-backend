import mongoose from "mongoose";

const schema = mongoose.Schema;

const userschema = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: {
    type: String,
  },
});

const User = mongoose.model("User", userschema);

export default User;
