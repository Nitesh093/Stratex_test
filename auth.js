const jwt = require("jsonwebtoken");
const JWT_SECRET = 'your-secret-key'; // Replace with your actual secret key

const auth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  jwt.verify(token, "my_secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    
    req.user = decoded;
    next();
  });
};

module.exports = auth;
