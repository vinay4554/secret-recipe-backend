import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodeddata;

    decodeddata = jwt.verify(token, "secret");
    req.userId = decodeddata?.id;

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
