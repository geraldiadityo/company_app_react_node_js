const db = require("../model");
const Employee = db.employee;
const Pekerjaan = db.pekerjaan;
const uploadFile = require("../middleware/uploadFile.js");
const fs = require("fs");

exports.addPekerjaan = async(req, res) => {
    try{
        await uploadFile(req, res);
        if (req.file === undefined){
            return res.status(400).send({
                message:"please attach file upload"
            });
        }
    }
    catch(err){
        res.status(500).send({
            message:err.message
        });
    }

    Employee.findOne({
        where:{
            ename:req.body.employee
        }
    }).then((employee) => {
        Pekerjaan.create({
            nama:req.body.nama,
            filekerja:req.file.originalname,
            employeeId:employee.id
        }).then(() => {
            res.status(201).send({
                message:"uploaded work success"
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
    Pekerjaan.findAll({
        include:["employee"]
    }).then((pekerjaan) => {
        res.send({
            data:pekerjaan
        });
    }).catch((err) => {
        res.status(500).send({
            message:err.message
        });
    });
};

exports.deleteFile = (req,res) => {
    let id = req.params.id;
    Pekerjaan.findByPk(id).then((pekerjaan) => {
        const fileName = pekerjaan.filekerja;
        const directoryPath = __basedir + "/resource/uploadfile/filekerja/";
        fs.unlink(directoryPath+fileName,(err) => {
            if (err){
                res.status(500).send({
                    message:`could not delete this file`
                });
            }
            Pekerjaan.destroy({
                where:{
                    id:pekerjaan.id
                }
            }).then(() => {
                res.send({
                    message:"delete file is successfully"
                });
            });
            
        });
    }).catch((err) => {
        res.status(500).send({
            message:err.message
        })
    });
};
