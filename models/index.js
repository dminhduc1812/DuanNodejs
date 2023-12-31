const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
// Override timezone formatting by requiring the Sequelize and doing it here instead
// Format datetime input
Sequelize.Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    date = this._applyTimezone(date, options);
  
    // Z here means current timezone, _not_ UTC
    // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
    return date.format('YYYY-MM-DD HH:mm:ss');
};
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
    options: dbConfig.options
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//force: true will drop the table if it already exists
db.sequelize.sync({
  force: false
}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  //initial();
});
db.user = require("../models/user.model.js")(sequelize, Sequelize);
//db.tutorial = require("../models/tutorial.model.js")(sequelize, Sequelize);
//db.category = require("../models/category.model.js")(sequelize, Sequelize);

db.blogs = require("../models/blogs.model.js")(sequelize, Sequelize);
db.video = require("../models/video.model.js")(sequelize, Sequelize);
db.catalog = require("../models/catalog.model.js")(sequelize, Sequelize);

// Associations  1- n
// db.category.hasMany(db.tutorial, {
//   foreignKey: 'categoryId'
// });
// db.tutorial.belongsTo(db.category);

module.exports = db;
