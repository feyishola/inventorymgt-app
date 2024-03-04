const authorization = (arry) => {
  return (req, res, next) => {
    if (req.user.userRole) {
      const authorizedRole = "Admin";
      if (
        !arry.includes(authorizedRole) ||
        req.user.userRole == authorizedRole
      ) {
        next();
      } else {
        return res
          .status(400)
          .json({ response: false, payload: "Permission Denied" });
      }
    } else {
      return res
        .status(400)
        .json({ response: false, payload: "Invalid entry" });
    }
  };
};

module.exports = authorization;
