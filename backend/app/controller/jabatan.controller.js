const db = require("../model");
const Jabatan = db.jabatan;

exports.addJabatan = (req, res) => {
    Jabatan.create({
        name:req.body.name,
        salary:req.body.salary
    }).then(() => {
        res.status(201).send({
            message:"data jabatan was added!"
        });
    }).catch((err) => {
        res.status(500).send({
            message:err.message
        });
    });
};

exports.editJabatan = (req, res) => {
    let id = req.params.id;
    Jabatan.update(req.body,{
        where:{id:id}
    }).then((employee) => {
        if (employee == 1){
            res.send({
                message:`data jabatan with id ${id} was updated`
            });
        }
        else{
            res.send({
                message:`cannot update data jabatan with id ${id}. maybe id jabatan not found`
            });
        }
    }).catch((err) => {
        res.status(500).send({
            message:err.message
        });
    });
};

exports.getAll = (req, res) => {
    Jabatan.findAll().then((jabatan) => {
        res.send({
            data:jabatan
        });
    }).catch((err) => {
        res.status(500).send({
            message:err.message
        });
    });
};

exports.deleteJabatan = (req, res) => {
    let id = req.params.id;
    Jabatan.destroy({
        where:{
            id:id
        }
    }).then(() => {
        res.send({
            message:`data jabatan with id ${id} was delete successfully`
        });
    }).catch((err) => {
        res.status(500).send({
            message:err.message
        });
    });
};
