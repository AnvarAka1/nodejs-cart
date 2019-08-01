const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
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

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app.use("/add", addRoutes);
app.use("/cart", cartRoutes);
const PORT = process.env.PORT || 3000;
const url = `mongodb+srv://anvar:g$Zv6RR@t$yHpRh@cluster0-0y6uv.mongodb.net/test?retryWrites=true&w=majority`;

console.log(PORT);
app.listen(PORT, () => {
  console.log(`SERVER is on port ${PORT}`);
});
