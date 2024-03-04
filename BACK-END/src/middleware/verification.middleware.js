const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (token) {
    const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);

    if (verifiedUser) {
      req.user = verifiedUser;
    } else {
      return res
        .status(401)
        .json({ response: false, payload: "invalid Token" });
    }
  } else {
    return res.status(401).json({
      response: false,
      payload: "Token is required for user authentication!",
    });
  }
  next();
};

module.exports = verifyUser;
