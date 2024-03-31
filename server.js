const express = require("express");
const { ConnexionDB } = require("./commun/connexionDb.js");
const userRouter = require("./users/route.js");

const port = 6001;
const database = new ConnexionDB();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ status: "UP" });
});

//userRoute
app.use("/users", userRouter);

database.generateConnexion().then(() => {
  app.listen(port, () => {
    console.log(`Starting server at : ${port}`);
  });
});
