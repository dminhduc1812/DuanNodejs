const catalog = require("../controllers/catalog.controller.js");
var router = require("express").Router();
// Create a new video
router.post("/", catalog.create);
// Retrieve all catalog
router.get("/getall", catalog.findAll);
// Retrieve catalog by Page
router.get("/getbypage", catalog.findAllByPage);
// Retrieve a single catalog with id
router.get("/:id", catalog.findOne);
// Update a catalog with id
router.put("/:id", catalog.update);
// Delete a catalog with id
router.delete("/:id", catalog.delete);
// Delete all catalog
router.delete("/", catalog.deleteAll);

module.exports = router;