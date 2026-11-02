const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Express server runs");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`SERVER RUNS ON PORT ${PORT}`);
});