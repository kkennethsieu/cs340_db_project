// ########## SETUP

const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "dist")));

const PORT = 4450;

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

// ########## LISTENER

app.listen(PORT, () => {
  console.log(
    `Server running: http://classwork.engr.oregonstate.edu:${PORT}...`
  );
});
