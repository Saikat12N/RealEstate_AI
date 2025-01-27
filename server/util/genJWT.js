import jwt from "jsonwebtoken";

export const generateTokenandSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true, // can be accesssed with http only
    secure: process.env.NODE_ENV === "production",  // or you  can set true
    sameSite: "strict", // prevent csrf attack
    maxAge: 7 * 24 * 60 * 1000,
  });

  return token;
};

export default generateTokenandSetCookie;