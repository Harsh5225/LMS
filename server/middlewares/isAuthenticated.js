import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("token",token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }
    // verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error authenticated mai problem hai",
    });
  }
};

export default isAuthenticated;
