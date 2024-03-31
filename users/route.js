const express = require("express");
const router = express.Router();
const userSchema = require("./models/user.js");
const { UserController } = require("./controllers/user.controller.js");

const userController = new UserController();

router.post("/register", async (req, res) => {
  const userData = req.body;

  const { error, value } = userSchema.validate(userData);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const result = await userController.Add(value);
    if (result) {
      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(404).json({ message: "Error creating user" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
