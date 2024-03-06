const UserController = require("../controller/user.controller");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const verifyUser = require("../middleware/verification.middleware");
const authorization = require("../middleware/authorization.middleware");

module.exports = () => {
  const api = Router();

  api.get("/", [verifyUser, authorization(["Admin"])], async (req, res) => {
    try {
      const response = await UserController.getUsers();
      res.status(200).json({ response: true, payload: response });
    } catch (error) {
      res.status(500).json({ response: false, payload: error.message });
    }
  });

  api.get(
    "/:id",
    [verifyUser, authorization(["Admin", "Regular"])],
    async (req, res) => {
      try {
        const id = req.params.id;
        const response = await UserController.getUser(id);
        res.status(200).json({ response: true, payload: response });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  api.post("/create-user", async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        img,
        email,
        phoneNumber,
        password,
        userRole,
      } = req.body;

      const saltRounds = 10;
      const salt = await bycrpt.genSalt(saltRounds);
      const hashPassword = await bycrpt.hash(password, salt);

      const response = await UserController.createUser(
        firstName,
        lastName,
        img,
        email,
        phoneNumber,
        hashPassword,
        userRole
      );
      res.status(200).json({ response: true, payload: response });
    } catch (error) {
      res.status(500).json({ response: false, payload: error.message });
    }
  });

  api.put(
    "/update-user/:id",
    [verifyUser, authorization(["Admin"])],
    async (req, res) => {
      try {
        const id = req.params.id;
        const { firstName, lastName, img, phoneNumber, password } = req.body;

        let hashPassword;

        if (password) {
          const saltRounds = 10;
          const salt = await bycrpt.genSalt(saltRounds);
          hashPassword = await bycrpt.hash(password, salt);
        } else {
          hashPassword = password;
        }
        const response = await UserController.updateUser(
          id,
          firstName,
          lastName,
          img,
          phoneNumber,
          hashPassword
        );
        res
          .status(200)
          .json({ response: true, payload: "User updated Successfully!" });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  api.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserController.getUserByEmail(email);
        if (user != null) {
          const passwordCheck = await bycrpt.compare(password, user.password);
          if (passwordCheck) {
            // generate token
            //crypto.randomBytes(32).toString('hex') to generate random key in env file.
            const token = jwt.sign(
              { email, userRole: user.userRole },
              process.env.SECRET_KEY,
              { expiresIn: "48h" }
            );
            res.status(200).json({
              response: true,
              payload: { user, token },
            });
          } else {
            res.status(402).json({
              response: false,
              payload: "Email or Password is incorrect",
            });
          }
        } else {
          res.status(402).json({
            response: false,
            payload: "Email or Password is incorrect",
          });
        }
      } else {
        res.status(402).json({
          response: false,
          payload: "Email and Password are required for login!",
        });
      }
    } catch (error) {
      res.status(500).json({ response: false, payload: error.message });
    }
  });

  api.delete(
    "/:id",
    [verifyUser, authorization(["Admin"])],
    async (req, res) => {
      try {
        const id = req.params.id;
        const response = await UserController.deleteUser(id);
        res
          .status(200)
          .json({ response: true, payload: "User Deleted Successfully!" });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  return api;
};
