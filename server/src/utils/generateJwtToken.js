import jwt from "jsonwebtoken";

const generateJwtToken = (res, id, cookieName = "token") => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "3d",
  });

  res.cookie(cookieName, token, {
    httpOnly: false,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
  });
};

export default generateJwtToken;
