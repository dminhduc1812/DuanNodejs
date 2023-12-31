const video = require("../controllers/video.controller.js");
var router = require("express").Router();
// Create a new video
router.post("/", video.create);
// Retrieve all video
router.get("/getall", video.findAll);
// Retrieve video by Page
router.get("/getbypage", video.findAllByPage);
// Retrieve a single Tutorial with id
router.get("/:id", video.findOne);
// Update a Tutorial with id
router.put("/:id", video.update);
// Delete a Tutorial with id
router.delete("/:id", video.delete);
// Delete all video
router.delete("/", video.deleteAll);

module.exports = router;