var express = require('express');
var router = express.Router();
const multer = require('multer');

const upload = multer();

const controlUserAdmin = require("../../controllers/user.controller");

//get all
router.get('/userAdmin', (req, res) => {
  
    controlUserAdmin.findbyQueryUser(req, res, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Columns."
        });
      } else {
        console.log(results);
        res.render("userAdmin.ejs", { results: results });
      }
    });
  });
//thêm user
router.get("/addUser", async function(req, res) {
  try {
    res.render("addUser.ejs");
  } catch (err) {
    res.status(500).send({
      message: "An error occurred while retrieving topics."
    });
  }
});
router.post('/addUser', upload.none(), (req, res) => {
    
  
  // Gọi hàm createTopic từ controlTopicAdmin controller và truyền giá trị của name
  controlUserAdmin.createUser(req, res)
    .then((data) => {
      // Xử lý logic khi tạo chủ đề thành công
      // Gửi phản hồi thành công
      res.redirect("userAdmin")
    })
    .catch((err) => {
      // Xử lý logic khi có lỗi xảy ra trong quá trình tạo chủ đề

      // Gửi phản hồi lỗi
      res.status(500).send({
        message: "An error occurred while creating the topic."
      });
 });
});
router.get("/DangKyUser", function(req, res){
  res.render("DangKyUser.ejs")
})

router.post('/DangKyUser', upload.none(), (req, res) => {
    
  
  // Gọi hàm createTopic từ controlTopicAdmin controller và truyền giá trị của name
  controlUserAdmin.createUser(req, res)
    .then((data) => {
      // Xử lý logic khi tạo chủ đề thành công
      // Gửi phản hồi thành công
      res.redirect("DangNhapUser")
    })
    .catch((err) => {
      // Xử lý logic khi có lỗi xảy ra trong quá trình tạo chủ đề

      // Gửi phản hồi lỗi
      res.status(500).send({
        message: "An error occurred while creating the topic."
      });
 });
});

//chuyển trang edit
router.get("/editUser/:id", async function(req, res) {
  try {
    
    const results = await controlUserAdmin.findUserById(req.params.id);

    res.render("editUser.ejs", { results: results});
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err.message || "Đã xảy ra lỗi trong quá trình lấy thông tin catalog."
    });
  }
});

router.post('/editUser/:id',upload.none(),  (req, res) => {
    
  controlUserAdmin.updateUser(req, res)
  .then((data) => {
      res.redirect("../userAdmin")
    })
    .catch((err) => {
      // Gửi phản hồi lỗi
      res.status(500).send({
        message: "An error occurred while creating the User."
      });
 });
});

//xóa
router.get('/deleteuser/:id', (req, res) => {
  
  controlUserAdmin.delete(req, res, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Columns."
      });
    } else {
      console.log(results);
      res.render("../../userAdmin.ejs", { results: results });
    }
  });
});
router.get('/Dangxuat', (req, res) => {
  // Xóa token hoặc phiên đăng nhập
  res.clearCookie('token'); // Xóa cookie token (nếu sử dụng cookie)
  res.render('DangNhapUser.ejs');
});
module.exports = router;