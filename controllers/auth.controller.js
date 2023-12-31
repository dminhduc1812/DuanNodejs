const db = require("../models");
const config = require("../config/auth.config");
//const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const md5 = require("md5");
const {
  QueryTypes
} = require('sequelize');
const {
  user
} = require("../models");
exports.signin = (req, res) => {

    const msv = req.body.username;
    const pwd = req.body.password;
  
    // Thực hiện truy vấn để kiểm tra tài khoản và mật khẩu
    let strQuery = "select * from users where username='"+msv+"' and password='"+pwd+"'";
    db.sequelize.query(strQuery, {
      nest: true,
      type: QueryTypes.SELECT
    })
    .then((data) => {
      if (!data[0]) {
        return res.status(403).send({
          message: "Tài khoản hoặc mật khẩu không đúng."
        });
      } else {
        // Tạo token
  
        const token = jwt.sign({ User: data[0] }, config.secret, { expiresIn: 86400 });
        res.cookie('token', token, { maxAge: 900000, httpOnly: true })
        res.redirect('homeAdmin');
  
        
        // Trả về token
        //res.json({ token });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
  };