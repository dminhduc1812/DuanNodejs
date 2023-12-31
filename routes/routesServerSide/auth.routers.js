var express = require('express');
var router = express.Router();
const multer = require('multer');

const upload = multer();

const controlAuthAdmin = require("../../controllers/auth.controller");

router.post('/DangNhapUser', controlAuthAdmin.signin);
router.get('/DangNhapUser', (req, res) => {
   
    res.render('homeAdmin')
    
});

router.get("/DangKyUser", async function(req, res) {
    try {
      res.render("DangKyUser.ejs");
    } catch (err) {
      res.status(500).send({
        message: "An error occurred while retrieving topics."
      });
    }
  });


module.exports = router;