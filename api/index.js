const express = require("express");
const cookie = require("cookie-parser");
const app = express();
const routes = require("./routes");

app.use(cookie());
app.use(express.json());

require("./database");

app.use(routes);

app.use("*", (request, response) => {
  response.status(404).end();
});

app.listen(3001);
