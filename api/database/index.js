const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://teddyAgt:FMB9KZEyTo1Uo6wJ@cluster0.ux3rk4p.mongodb.net/react-jwt?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connexion DB ok");
  })
  .catch((e) => {
    console.log("connexion DB ko", e);
  });
