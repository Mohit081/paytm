import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.body.headers.Authorization;
   console.log(authHeader,"thhf hfhghg hfhhhg chchfjf hvhjjgg ")
  if (!authHeader) { 
    return res.status(403).json({
      message: "Not authorize"
    });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    

    if (decoded.userId) {       
      req.userId = decoded.userId;
      next();
    }
  } catch (error) {
    return res.status(403).json({
      message: "authorization error",
      error
    });
  }
};

export { authenticateToken };
