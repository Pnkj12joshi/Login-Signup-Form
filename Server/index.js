const express = require("express");
const app = express();
const path = require("path");

//mongoose code......................................................................

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/signup").then(() => {
  console.log("Mongo is Connected");
});

const Port = "8001";

//most important setup.....

app.set("view engine", "ejs");
app.use(express.json());
app.set("views", path.resolve("./view"));
app.use(express.urlencoded({ extended: false }));

const Login_reg = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const collections = mongoose.model("varing", Login_reg);

//routes

//route1
app.get("/", (req, res) => {
  return res.render("login"); //here we render "login.ejs" file in "/" path.
});
//route2
app.get("/signup", (req, res) => {
  return res.render("signup"); // here we render 'signup.ejs" file in "/signup" path
});
//route3
app.post("/signup", async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };

  console.log(data);
  await collections.insertMany([data]);
  return res.render("home"); //here we render "home.ejs" file in "/signup" path
});

//route4
app.post("/login", async (req, res) => {
  try {
    const check = await collections.findOne({ email: req.body.email }); // here we compare (req.body.email) to email variable which is present in the database assign to the variable check
    if (check.password === req.body.password) {
      return res.render("home");
    } else {
      return res.send("wrong password.....");
    }
  } catch {
    return res.send("wrong details..............");
  }
});

//here we listen the port
app.listen(Port, () => {
  console.log("Server is Started in", Port);
});

//export
