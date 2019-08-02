const { Router } = require("express");
const Course = require("../models/course");
const router = Router();

router.get("/", async (req, res) => {
  const courses = await Course.find()
    .populate("userId", "email name")
    .select("title price img");

  res.render("courses", {
    title: "Courses",
    isCourses: true,
    courses
  });
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.render("course", {
    layout: "empty",
    title: `Course ${course.title}`,
    course
  });
});
router.get("/:id/edit", async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  const course = await Course.findById(req.params.id);
  res.render("course-edit", {
    title: `Edit ${course.title}`,
    course
  });
});

router.post("/edit", async (req, res) => {
  const { id } = req.body;
  // delete id in the object "req.body" to prevent creation of
  // id parameter on the mongodb because the id there is written
  // with underscore in the beginning like "_id"
  delete req.body.id;
  await Course.findByIdAndUpdate(id, req.body);
  res.redirect("/");
});

router.post("/remove", async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.body.id });
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
