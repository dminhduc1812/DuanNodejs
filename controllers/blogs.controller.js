const db = require("../models");
const Blogs = db.blogs;
const Op = db.Sequelize.Op;
const { getPagination, getPagingData } = require("./utils");
/// gọi thư viện
const multer = require('multer');

const { QueryTypes } = require('sequelize')
var bodyParser = require('body-parser')

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/upload');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    },
  });
var upload = multer({ storage: storage }).single('uploadfile')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// Create and Save a new blog
exports.create = (req, res) => {
    // Validate request
    if (!req.body.tieude) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a blog
    const blogs = {
        tieude: req.body.tieude,
        anh: req.body.anh,
        noidung: req.body.noidung,
        theloai: req.body.theloai,
        luotxem: req.body.luotxem,
        trangthaibaiviet: req.body.trangthaibaiviet,

    };
    // Save blog in the database
    Blogs.create(blogs)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Blogs."
        });
    });
};
//sửa
exports.updateBlog = async (req, res) => {
    const id = req.params.id;
    try {
      upload(req, res, async function (err) {
        if (err) {
          return res.status(500).send('Error uploading file');
        }
  
        if (typeof req.file === 'undefined') {
          await Blogs.update(
            {
                tieude: req.body.tieude,
                noidung: req.body.noidung,
                theloai: req.body.theloai,
                luotxem: req.body.luotxem,
                trangthaibaiviet: req.body.trangthaibaiviet,
        
            },
            {
              where: { id: id }
            }
          );
          res.render('blogAdmin.ejs'); // Render giao diện newadmin
        } else {
          await Blogs.update(
            {
                tieude: req.body.tieude,
                anh: req.file.originalname,
                noidung: req.body.noidung,
                theloai: req.body.theloai,
                luotxem: req.body.luotxem,
                trangthaibaiviet: req.body.trangthaibaiviet,
        
            },
            {
              where: { id: id }
            }
          );
  
          res.render('blogAdmin.ejs'); // Render giao diện newadmin
        }
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
  };


 //get theo id
 exports.findBlogById = async (Id) => {
    try {
      const data = await db.sequelize.query('SELECT * FROM blogs WHERE id = :id', {
        replacements: { id: Id },
        nest: true,
        type: QueryTypes.SELECT,
      });
  
      if (data.length === 0) {
        throw new Error("Không tìm thấy blog.");
      }
  
      return data;
    } catch (err) {
      console.error(err);
      throw new Error("Đã xảy ra lỗi trong quá trình lấy thông tin blog.");
    }
  }; 

  //Thêm blog
exports.createBlog = async (req, res) => {
    upload(req, res, async function(err) {
        if (err instanceof multer.MulterError) {
          // Một lỗi của Multer xảy ra khi upload.
          res.send("lỗi");
        } else {
          // Một lỗi không xác định xảy ra khi upload.
          if (req.file == undefined) {
            res.send("Bạn chưa chọn file");
          } else {
            //  const userDoc = await authJwt.userToken(req);
            //  const userId = userDoc.User.id;
            // Create and Save a new blog
            const blogs = {
                tieude: req.body.tieude,
                anh:  req.file.originalname,
                noidung: req.body.noidung,
                theloai: req.body.theloai,
                luotxem: req.body.luotxem,
                trangthaibaiviet: req.body.trangthaibaiviet,

            };
            Blogs.create(blogs)
              .then((createBlog) => {
                res.render("blogAdmin", { blogs: createBlog }); // Render giao diện newAdmin với dữ liệu tin tức đã tạo
              })
              .catch((error) => {
                res.status(500).send("Đã xảy ra lỗi trong quá trình tạo tin tức mới"); // Gửi phản hồi lỗi
              });
          }
        }
      });
};

//hiển thị dữ liệu từ csdl lên giao diện
exports.findbyQueryBlogs = (req, res) => {
    db.sequelize.query('SELECT * FROM blogs', {
      nest: true,
      type: QueryTypes.SELECT,
    })
      .then(data => {
        console.log(data);
        res.render('blogAdmin.ejs', { results: data });
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving Blogs.',
        });
      });
  };

// Retrieve all blogs from the database.
exports.findAll = (req, res) => {
    const tieude = req.query.tieude;
    var condition = tieude ? { tieude: { [Op.like]: `%${tieude}%` } } : null;
    Blogs.findAll({ where: condition })
    .then(data => {
        return data;
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving Users."
        });
    });
};

exports.findbyQueryall = async (req, res) => {
  try {
    const data = await db.sequelize.query('SELECT * FROM blogs LIMIT 4', {
      nest: true,
      type: QueryTypes.SELECT,
    });

    return data;
  } catch (err) {
    throw new Error(err.message || 'Some error occurred while retrieving News.');
  }
};
// Retrieve by Paging
exports.findAllByPage = (req, res) => {
    const { page, size, title } = req.query;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    const { limit, offset } = getPagination(page, size);
    Blogs.findAndCountAll({ 
        include: [{// Notice `include` takes an ARRAY
            model: Category
          }],
        where: condition, limit, offset })
    .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving blogs."
        });
    });
}
// Find a single blog with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Blogs.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message: "Error retrieving blog with id=" + id
        });
    });
};
// Update a blog by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Blogs.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
            message: "blog was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update blog with id=${id}. Maybe blog was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating blog with id=" + id
        });
    });
};
// Delete a blog with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Blogs.destroy({
      where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.redirect("http://localhost:3000/blogAdmin")
        } else {
            res.send({
            message: `Cannot delete blog with id=${id}. Maybe blog was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete blog with id=" + id
        });
    });
};
// Delete all blogs from the database.
exports.deleteAll = (req, res) => {
    Blogs.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} blogs were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while removing all blogs."
        });
    });
};
// Find all published blogs
exports.findAllPublished = (req, res) => {
    Blogs.findAll({ where: { published: true } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving blogs."
        });
    });
};