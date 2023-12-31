const db = require("../models");
const Catalog = db.catalog;
const Op = db.Sequelize.Op;
const { getPagination, getPagingData } = require("./utils");
/// gọi thư viện
const { QueryTypes } = require('sequelize')

// Create and Save a new catalog
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a catalog
    const catalog = {
        name: req.body.name,
       
    };
    // Save catalog in the database
    Catalog.create(catalog)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the catalog."
        });
    });
};

exports.createCatalog = async (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a catalog
    const catalog = {
        name: req.body.name,
       
    };
    // Save catalog in the database
    const name = await Catalog.create(catalog)
    return name;
};

// sửa
  exports.updateCatalog = async (req, res) => {
    const id = req.params.id;
    const namebody = await Catalog.update(req.body, {
      where: { id: id }
  })
    return namebody;
};

 //get theo id
 exports.findCatalogById = async (Id) => {
    try {
      const data = await db.sequelize.query('SELECT * FROM catalogs WHERE id = :id', {
        replacements: { id: Id },
        nest: true,
        type: QueryTypes.SELECT,
      });
  
      if (data.length === 0) {
        throw new Error("Không tìm thấy catalog.");
      }
  
      return data;
    } catch (err) {
      console.error(err);
      throw new Error("Đã xảy ra lỗi trong quá trình lấy thông tin catalog.");
    }
  }; 

//hiển thị dữ liệu từ csdl lên giao diện
exports.findbyQueryCatalogs = (req, res) => {
    db.sequelize.query('SELECT * FROM catalogs', {
      nest: true,
      type: QueryTypes.SELECT,
    })
      .then(data => {
        console.log(data);
        res.render('catalogAdmin.ejs', { results: data });
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving Catalogs.',
        });
      });
  };

// Retrieve all catalogs from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    Catalog.findAll({ where: condition })
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
    Catalog.findAndCountAll({ 
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
            err.message || "Some error occurred while retrieving catalogs."
        });
    });
}
// Find a single catalog with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Catalog.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message: "Error retrieving catalog with id=" + id
        });
    });
};
// Update a catalog by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Catalog.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
            message: "catalog was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update catalog with id=${id}. Maybe catalog was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating catalog with id=" + id
        });
    });
};
// Delete a catalog with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Catalog.destroy({
      where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.redirect("http://localhost:3000/catalogAdmin")
        } else {
            res.send({
            message: `Cannot delete catalog with id=${id}. Maybe catalog was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete catalog with id=" + id
        });
    });
};
// Delete all catalogs from the database.
exports.deleteAll = (req, res) => {
    Catalog.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} catalogs were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while removing all catalogs."
        });
    });
};