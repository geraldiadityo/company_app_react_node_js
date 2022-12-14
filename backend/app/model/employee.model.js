module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employees",{
        eid:{
            type:Sequelize.STRING
        },
        ename:{
            type:Sequelize.STRING
        },
        gender:{
            type:Sequelize.STRING
        }
    });
    return Employee;
};
