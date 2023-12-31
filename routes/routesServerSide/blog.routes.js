var express = require('express');
var router = express.Router();
const multer = require('multer');

const upload = multer();

const controlBlogAdmin = require("../../controllers/blogs.controller");

//get all
router.get('/blogAdmin', (req, res) => {
  
    controlBlogAdmin.findbyQueryBlogs(req, res, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Columns."
        });
      } else {
        console.log(results);
        res.render("blogAdmin.ejs", { results: results });
      }
    });
  });


//thêm blog
router.get("/addBlog", async function(req, res) {
  try {
    res.render("addBlog.ejs");
  } catch (err) {
    res.status(500).send({
      message: "An error occurred while retrieving blogs."
    });
  }
});
router.post('/addBlog', async (req, res) => {
    
// Gọi hàm createblog từ controlblogAdmin controller và truyền giá trị của name
  controlBlogAdmin.createBlog(req, res)
    .then((data) => {
      // Xử lý logic khi tạo chủ đề thành công
      // Gửi phản hồi thành công
      res.redirect("blogAdmin")
    })
    .catch((err) => {
      // Xử lý logic khi có lỗi xảy ra trong quá trình tạo chủ đề

      // Gửi phản hồi lỗi
      res.status(500).send({
        message: "An error occurred while creating the blog."
      });
 });
})

//chuyển trang edit
router.get("/editBlog/:id", async function(req, res) {
  try {
    
    const results = await controlBlogAdmin.findBlogById(req.params.id);

    res.render("editBlog.ejs", { results: results});
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err.message || "Đã xảy ra lỗi trong quá trình lấy thông tin catalog."
    });
  }
});
router.post('/editBlog/:id',  (req, res) => {
    
  controlBlogAdmin.updateBlog(req, res)
  .then((data) => {
      res.redirect("../blogAdmin")
    })
    .catch((err) => {
      // Gửi phản hồi lỗi
      res.status(500).send({
        message: "An error occurred while creating the blog."
      });
 });
});
//xóa
router.get('/deleteblogid/:id', (req, res) => {
  
  controlBlogAdmin.delete(req, res, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Columns."
      });
    } else {
      console.log(results);
      res.render("../../blogAdmin.ejs", { results: results });
    }
  });
});
module.exports = router;