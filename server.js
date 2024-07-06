const express = require("express");
const app = express();

const PORT = 8090;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, (req, res) => {
  console.log(`Listening to server on port ${PORT}`);
});
