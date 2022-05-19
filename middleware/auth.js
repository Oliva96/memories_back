import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodeedData;

    if (token && isCustomAuth) {
      decodeedData = jwt.verify(token, "test");

      req.userId = decodeedData?.id;
    } else {
      decodeedData = jwt.decode(token);

      req.userId = decodeedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
