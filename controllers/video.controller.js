const db = require("../models");
const Blogs = db.blogs;
const Video = db.video;
const Op = db.Sequelize.Op;
const { getPagination, getPagingData } = require("./utils");
/// gọi thư viện
const { QueryTypes } = require('sequelize')

// Create and Save a new video
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
// Create a video
    const video = {
        name: req.body.name,
        videos: req.body.videos       
    };
    // Save video in the database
    Video.create(video)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the video."
        });
    });
};

exports.createVideo = async (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a video
    const video = {
        name: req.body.name,
        videos: req.body.videos       
    };
    // Save video in the database

    const name = await Video.create(video)
    return name;
};

//hiển thị dữ liệu từ csdl lên giao diện
exports.findbyQueryVideos = (req, res) => {
    db.sequelize.query('SELECT * FROM videos', {
      nest: true,
      type: QueryTypes.SELECT,
    })
      .then(data => {
        console.log(data);
        res.render('videoAdmin.ejs', { results: data });
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving Videos.',
        });
      });
  };

// Retrieve all videos from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    Video.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving Users."
        });
    });
};

// Retrieve by Paging
exports.findAllByPage = (req, res) => {
    const { page, size, name } = req.query;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    const { limit, offset } = getPagination(page, size);
    Video.findAndCountAll({ 
        // include: [{// Notice `include` takes an ARRAY
        //     model: Tutorial
        //   }],
        where: condition, limit, offset })
    .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving videos."
        });
    });
}
// Find a single video with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Video.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message: "Error retrieving video with id=" + id
        });
    });
};
// Update a video by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Video.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
            message: "video was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update video with id=${id}. Maybe video was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating video with id=" + id
        });
    });
};

exports.updateVideo = async (req, res) => {
    const id = req.params.id;
    const namebody = await Video.update(req.body, {
      where: { id: id }
  })
    return namebody;
};


 //get theo id
 exports.findVideoById = async (Id) => {
    try {
      const data = await db.sequelize.query('SELECT * FROM videos WHERE id = :id', {
        replacements: { id: Id },
        nest: true,
        type: QueryTypes.SELECT,
      });
  
      if (data.length === 0) {
        throw new Error("Không tìm thấy video.");
      }
  
      return data;
    } catch (err) {
      console.error(err);
      throw new Error("Đã xảy ra lỗi trong quá trình lấy thông tin video.");
    }
  }; 


// Delete a video with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Video.destroy({
      where: { id: id }
    })
    .then(num => {
        if (num == 1) {
           res.redirect("http://localhost:3000/videoAdmin")
        } else {
            res.send({
            message: `Cannot delete video with id=${id}. Maybe video was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete video with id=" + id
        });
    });
};
// Delete all videos from the database.
exports.deleteAll = (req, res) => {
    Video.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} videos were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while removing all videos."
        });
    });
};