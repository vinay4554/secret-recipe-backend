import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { firstname, lastname, email, password, confirmpassword } = req.body;

  try {
    const userexists = await User.findOne({ email: email });

    if (userexists)
      return res.status(404).json({ message: "user Already Exists" });

    if (password !== confirmpassword)
      return res.status(404).json({ message: "Passwords not matched" });

    const hashedpassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: `${firstname} ${lastname}`,
      email,
      password: hashedpassword,
    });

    const token = jwt.sign({ email: user.email, id: user._id }, "secret", {
      expiresIn: "1h",
    });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) return res.status(404).json({ message: "user Does not Exists" });

    const passwordcrt = await bcrypt.compare(password, user.password);

    if (!passwordcrt)
      return res.status(404).json({ message: "password is Incorrect" });

    const token = jwt.sign({ email: user.email, id: user._id }, "secret", {
      expiresIn: "1h",
    });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "something Went Wrong" });
  }
};
