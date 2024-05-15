const UserModel = require("../../database/models/user.model");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../keys");

router.post("/", async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await UserModel.findOne({ email }).exec();

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jsonwebtoken.sign({}, key, {
          subject: user._id.toString(),
          expiresIn: 3600 * 24 * 7, // token valide une semaine
          algorithm: "RS256",
        });

        response.cookie("token", token, { httpOnly: true });
        response.json(user);
      } else {
        response.status(400).json("Invalid Credentials");
      }
    } else {
      response.status(400).json("Invalid Credentials");
    }
  } catch (err) {
    response.status(400).json("Invalid Credentials");
  }
});

router.get("/current", async (request, response) => {
  const { token } = request.cookies;
  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, keyPub);
      const currentUser = await UserModel.findById(decodedToken.sub)
        .select("-password -__v")
        .exec();

      if (currentUser) {
        return response.json(currentUser);
      } else {
        return response.json(null);
      }
    } catch (err) {
      return response.json(null);
    }
  } else {
    return response.json(null);
  }
});

router.delete("/", (request, response) => {
  response.clearCookie("token");
  response.end();
});

module.exports = router;
