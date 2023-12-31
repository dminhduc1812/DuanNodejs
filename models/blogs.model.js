module.exports = (sequelize, Sequelize) => {
    const Blogs = sequelize.define("blogs", {
        tieude: {
            type: Sequelize.STRING
        },
        anh: {
            type: Sequelize.STRING
        },
        noidung: {
            type: Sequelize.STRING
        },
        theloai: {
            type: Sequelize.STRING
        },
        luotxem: {
            type: Sequelize.STRING
        },
        trangthaibaiviet: {
            type: Sequelize.STRING
        }
    });
    return Blogs;
};