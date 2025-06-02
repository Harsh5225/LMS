import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  // generate token
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  // cookie set with proper cross-origin settings
  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // Required for cross-site cookies with HTTPS
    sameSite: "none", // Required for cross-site cookies
    maxAge: 24 * 60 * 60 * 1000,
    path: "/", // Ensure cookie is available for all paths
  });

  return res.status(200).json({
    success: true,
    message,
    user: { user }
  });
};
