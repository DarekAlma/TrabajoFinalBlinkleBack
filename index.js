const express = require('express');

const app= express();
const PORT=8080;


app.use(express.urlencoded({ extended: true })); // para acceder al body
app.use(express.json);

const signinRouter =require("./routes/signin");
const loginRouter=require("./routes/login");
const usersRouter=require("./routes/users");
const blinksRouter=require("./routes/blinks")

app.get("/", (req, res) => {
    res.send("Funcionando :)");
  });

app.use("/signin",signinRouter);
app.use("/login",loginRouter);
app.use("/users",usersRouter);
app.use("/blinks",blinksRouter);

app.listen(PORT, () => {
    console.log(`Servidor esta vivito y corriendo en ${PORT}`);
  });
