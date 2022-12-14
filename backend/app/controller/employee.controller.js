const db = require("../model");
const Employee = db.employee;
const Jabatan = db.jabatan;

exports.addEmployee = (req, res) => {
    Jabatan.findOne({
        where:{
            name:req.body.jabatan
        }
    }).then((jabatan) => {
        Employee.create({
            eid:req.body.eid,
            ename:req.body.ename,
            gender:req.body.gender,
            jabatanId:jabatan.id
        }).then(() => {
            res.status(201).send({
                message:"employee was registered successfully"
            });
        }).catch((err) => {
            res.status(500).send({
                message:err.message
            });
        });
    }).catch((err) => {
        res.status(500).send({
            message:err.message
        });
    });
};

exports.updateEmployee = (req, res) => {
    let id = req.params.id;
    Jabatan.findOne({
        where:{
            name:req.body.jabatan
        }
    }).then((jabatan) => {
        let data = {
            eid:req.body.eid,
            ename:req.body.ename,
            gender:req.body.gender,
            jabatanId:jabatan.id
        };
        Employee.update(data,{
            where:{
                id:id
            }
        }).then(() => {
            res.status(200).send({
                message:`employee with id ${id} was update successfully`
            });
        }).catch((err) => {
            res.status(500).send({
                message:err.message
            });
        });
    }).catch((err) => {
        res.status(500).send({
            message:err.message
        });
    });
};

exports.getAll = (req, res) => {
    Employee.findAll({
        include:["jabatan"]
    }).then((employees) => {
        res.send({
            data:employees
        });
    }).catch((err) => {
        res.status(500).send({
            message:err.message
        });
    });
};

exports.getOne = (req, res) => {
    let id = req.params.id;
    Employee.findByPk(id, {
        include:["jabatan"]
    }).then((employee) => {
        res.send({
            data:employee
        });
    }).catch((err) => {
        res.status(500).send({
            message:err.message
        });
    });
};

exports.deleteEmployee = (req, res) => {
    let id = req.params.id;
    Employee.destroy({
        where:{
            id:id
        }
    }).then((employee) => {
        if (employee == 1){
            res.send({
                message:"Employee was deleted successfully"
            });
        }
        else{
            res.send({
                message:`cannot delete employee with id ${id}. Maybe employee not found!`
            });
        }
    }).catch((err) => {
        res.status(500).send({
            message:err.message
        });
    });
};
