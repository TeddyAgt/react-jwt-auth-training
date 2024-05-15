const UserModel = require("../../database/models/user.model");
const bcrypt = require("bcrypt");
const router = require("express").Router();

router.post("/", async (request, response) => {
  const { username, email, password } = request.body;
  const newUser = new UserModel({
    username,
    email,
    password: await bcrypt.hash(password, 8),
  });

  try {
    const user = await newUser.save();
    response.json(user);
  } catch (err) {
    if (err.code === 11000) {
      response.status(400).json("Email déjà utilisé");
    } else {
      response.status(400).json("Erreur lors de la création de l'utilisateur");
    }
  }
});

module.exports = router;
