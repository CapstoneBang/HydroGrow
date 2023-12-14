import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { SECRET_KEY } = process.env;

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      error: true,
      status: 401,
      message: "Unauthorized - Missing Token",
    });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        error: true,
        status: 403,
        message: "Forbidden - Invalid Token",
      });
    }

    req.user = user;
    next();
  });
};

export { authenticateToken };
