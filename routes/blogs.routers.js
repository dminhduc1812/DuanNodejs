const blogs = require("../controllers/blogs.controller.js");
var router = require("express").Router();
// Create a new Tutorial
router.post("/", blogs.create);
// Retrieve all blogs
router.get("/getall", blogs.findAll);
// Retrieve all published blogs
router.get("/published", blogs.findAllPublished);
// Retrieve blogs by Page
router.get("/getbypage", blogs.findAllByPage);
// Retrieve a single Tutorial with id
router.get("/:id", blogs.findOne);
// Update a Tutorial with id
router.put("/:id", blogs.update);
// Delete a Tutorial with id
router.delete("/:id", blogs.delete);
// Delete all blogs
router.delete("/", blogs.deleteAll);

module.exports = router;