const JWt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const tokenRoot = req.headers.authorization.startsWith("Bearer");
  if (tokenRoot) {
    token = req.headers.authorization.split(" ")[1];
    JWt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) throw new Error("token is valid or exprire");
      req.user = decode;
    });
    next();
  }
};
module.exports = verifyToken;
