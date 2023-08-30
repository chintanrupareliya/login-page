require("dotenv").config();
let jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const fatchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.stutes(401).send({ error: "please authenticate using valide token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "authenticate using valide token" });
  }
};
module.exports = fatchuser;
