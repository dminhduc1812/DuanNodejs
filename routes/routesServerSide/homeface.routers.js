var express = require('express');
var router = express.Router();
const multer = require('multer');

const upload = multer();

const controleHomeAdmin = require("../../controllers/blogs.controller");


//get all
router.get('/TrangChu', async (req, res) => {
  try{

      const results = await controleHomeAdmin.findbyQueryall(req, res);
      // const resultsData = await controleHomeAdmin.findAllByPageBlog(req, res);

      res.render("TrangChu.ejs", { results: results });
    
} catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Internal server error.',
    });
  }
  });


module.exports = router;