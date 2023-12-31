module.exports = (sequelize, Sequelize) => {
    const Catalog = sequelize.define("catalog", {
        name: {
            type: Sequelize.STRING
        }
    });
    return Catalog;
};