const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host:config.HOST,
        dialect:config.dialect,
        operatorsAliases:false,

        pool:{
            max:config.pool.max,
            min:config.pool.min,
            acquire:config.pool.acquire,
            idle:config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize,Sequelize);
db.role = require("./role.model.js")(sequelize,Sequelize);
db.employee = require("./employee.model.js")(sequelize, Sequelize);
db.jabatan = require("./jabatan.model.js")(sequelize, Sequelize);

db.user.belongsToMany(db.role, {
    through:"user_roles",
    foreignKey:"userId",
    otherKey:"roleId"
});

db.role.belongsToMany(db.user, {
    through:"user_roles",
    foreignKey:"roleId",
    otherKey:"userId"
});

db.jabatan.hasMany(db.employee,{as:"employees"});
db.employee.belongsTo(db.jabatan, {
    foreignKey:"jabatanId",
    as:"jabatan",
    onDelete:"cascade"
});

db.ROLES = ["user","admin","moderator"];

module.exports = db;
