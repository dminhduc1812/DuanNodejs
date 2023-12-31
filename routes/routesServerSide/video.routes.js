var express = require('express');
var router = express.Router();
const multer = require('multer');

const upload = multer();

const controlVideoAdmin = require("../../controllers/video.controller");

//get all
router.get('/videoAdmin', (req, res) => {
  
    controlVideoAdmin.findbyQueryVideos(req, res, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Columns."
        });
      } else {
        console.log(results);
        res.render("videoAdmin.ejs", { results: results });
      }
    });
  });


//thêm video
router.get("/addVideo", async function(req, res) {
  try {
    res.render("addVideo.ejs");
  } catch (err) {
    res.status(500).send({
      message: "An error occurred while retrieving topics."
    });
  }
});
router.post('/addVideo', upload.none(), (req, res) => {
    
  
  // Gọi hàm createTopic từ controlTopicAdmin controller và truyền giá trị của name
  controlVideoAdmin.createVideo(req, res)
    .then((data) => {
      // Xử lý logic khi tạo chủ đề thành công
      // Gửi phản hồi thành công
      res.redirect("videoAdmin")
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
router.get("/editVideo/:id", async function(req, res) {
  try {
    
    const results = await controlVideoAdmin.findVideoById(req.params.id);

    res.render("editVideo.ejs", { results: results});
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err.message || "Đã xảy ra lỗi trong quá trình lấy thông tin video."
    });
  }
});
router.post('/editVideo/:id', upload.none(),  (req, res) => {
    
  controlVideoAdmin.updateVideo(req, res)
  .then((data) => {
      res.redirect("../videoAdmin")
    })
    .catch((err) => {
      // Gửi phản hồi lỗi
      res.status(500).send({
        message: "An error occurred while creating the video."
      });
 });
});

//xóa
router.get('/delete/:id', (req, res) => {
  
  controlVideoAdmin.delete(req, res, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Columns."
      });
    } else {
      console.log(results);
      res.render("../../videoAdmin.ejs", { results: results });
    }
  });
});
module.exports = router;