import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  // generate token
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  // Update cookie settings
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only use secure in production
    sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax", // Use "none" for cross-site in production
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message,
    user: { user }
  });
};
