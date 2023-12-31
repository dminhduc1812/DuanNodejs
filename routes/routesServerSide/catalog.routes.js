var express = require('express');
var router = express.Router();
const multer = require('multer');

const upload = multer();

const controlCatalogAdmin = require("../../controllers/catalog.controller");

//get all
router.get('/catalogAdmin', (req, res) => {
  
    controlCatalogAdmin.findbyQueryCatalogs(req, res, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Columns."
        });
      } else {
        console.log(results);
        res.render("catalogAdmin.ejs", { results: results });
      }
    });
  });


//thêm catalog
router.get("/addCatalog", async function(req, res) {
  try {
    res.render("addCatalog.ejs");
  } catch (err) {
    res.status(500).send({
      message: "An error occurred while retrieving topics."
    });
  }
});
router.post('/addCatalog', upload.none(), (req, res) => {
    
  
// Gọi hàm createTopic từ controlTopicAdmin controller và truyền giá trị của name
  controlCatalogAdmin.createCatalog(req, res)
    .then((data) => {
      // Xử lý logic khi tạo chủ đề thành công
      // Gửi phản hồi thành công
      res.redirect("catalogAdmin")
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
router.get("/editCatalog/:id", async function(req, res) {
  try {
    
    const results = await controlCatalogAdmin.findCatalogById(req.params.id);

    res.render("editCatalog.ejs", { results: results});
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err.message || "Đã xảy ra lỗi trong quá trình lấy thông tin catalog."
    });
  }
});
router.post('/editCatalog/:id',upload.none(),  (req, res) => {
    
  controlCatalogAdmin.updateCatalog(req, res)
  .then((data) => {
      res.redirect("../catalogAdmin")
    })
    .catch((err) => {
      // Gửi phản hồi lỗi
      res.status(500).send({
        message: "An error occurred while creating the Catalog."
      });
 });
});

//xóa
router.get('/deleteid/:id', (req, res) => {
  controlCatalogAdmin.delete(req, res, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Columns."
      });
    } else {
      console.log(results);
      res.render("../../catalogAdmin.ejs", { results: results });
    }
  });
});
module.exports = router;