import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("Authentication attempt with token:", token ? "Token present" : "No token");
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }
    
    // verify token
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log("Token decoded successfully:", decoded);
      
      req.id = decoded.userId;
      next();
    } catch (jwtError) {
      console.log("JWT verification failed:", jwtError);
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  } catch (error) {
    console.log("Authentication error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error in authentication",
    });
  }
};

export default isAuthenticated;
