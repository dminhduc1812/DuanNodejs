var express = require('express');
var router = express.Router();

//hiển thị giao diện home
router.get("/homeAdmin", function(req, res){
    res.render("homeAdmin.ejs")
})

router.get("/DangNhapUser", function(req, res){
    res.render("DangNhapUser.ejs")
})

module.exports = router;