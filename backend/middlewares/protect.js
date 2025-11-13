import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);  // Verify token using SECRET_KEY
    req.user = decoded; // Store the decoded user data in request object
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

export default protect;
