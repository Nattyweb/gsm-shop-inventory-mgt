

const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.authorisation

  if (!token) return res.status(403).send("You are not signed in, sign in to continue");
  
  try {
    const validToken = jwt.verify(token, process.env.SECRET);
    if(!validToken) return res.status(400).send("signin to continue");
    next();
 
  } catch (err) {
    return res.status(401).send(err);
  }
};

module.exports = verifyToken;