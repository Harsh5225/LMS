import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  // generate token
  // payload,
  // secret key,
  // expires
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  // cookie set
   res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success:true,
      message,
      user:{user}
    })
};
