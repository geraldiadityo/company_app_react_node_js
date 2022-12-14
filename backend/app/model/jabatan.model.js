module.exports = (sequelize, Sequelize) => {
    const Jabatan = sequelize.define("jabatans", {
        name:{
            type:Sequelize.STRING
        },
        salary:{
            type:Sequelize.INTEGER
        }
    });
    return Jabatan;
};
