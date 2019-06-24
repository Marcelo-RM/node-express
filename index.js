const express = require("express");
const port = 5500;
const userRoute = require("./routes/userRoute");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

userRoute(app);

app.get("/", (req, res) => res.send("Olá mundo com express!!"));

app.listen(port, () => console.log(`Api rodando na porta ${port}`));
