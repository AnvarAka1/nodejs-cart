const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

const User = require("./models/user");
// Routes
const homeRoutes = require("./routes/home");
const coursesRoutes = require("./routes/courses");
const addRoutes = require("./routes/add");
const cartRoutes = require("./routes/cart");
// creating server
const app = express();

// START setting handlebars
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs"
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
// path to views. second parameter is the folder name
app.set("views", "views");
// END of setting handlebars

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("5d435c0fc62aa418a00188d2");
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
  }
});
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app.use("/add", addRoutes);
app.use("/cart", cartRoutes);

const PORT = process.env.PORT || 3000;

// firstly connect to MongoDB and then run server
async function start() {
  try {
    const url = `mongodb+srv://anvar:g$Zv6RR@t$yHpRh@cluster0-0y6uv.mongodb.net/shop`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useFindAndModify: false
    });
    const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({
        email: "anvar-abd_97@mail.ru",
        name: "Anvar",
        cart: { items: [] }
      });
      await user.save();
    }
    app.listen(PORT, () => {
      console.log(`SERVER is on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
