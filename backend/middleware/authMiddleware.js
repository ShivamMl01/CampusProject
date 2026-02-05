import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
     return res.status(401).json({
        message: "Please login to continue",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    console.log("Decoded JWT:", decoded);

    //  normalize user object
    req.user = {
      id: decoded.sub,
    };

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
