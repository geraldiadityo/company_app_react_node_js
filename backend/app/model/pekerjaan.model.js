module.exports = (sequelize, Sequelize) => {
    const Pekerjaan = sequelize.define("pekerjaans",{
        nama:{
            type:Sequelize.STRING
        },
        filekerja:{
            type:Sequelize.TEXT
        }
    });
    return Pekerjaan;
};