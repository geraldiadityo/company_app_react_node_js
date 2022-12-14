const db = require("../model");
const config = require("../config/auth.config.js");

const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signUp = (req, res) => {
    User.create({
        username:req.body.username,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8)
    }).then((user) => {
        if (req.body.roles){
            Role.findAll({
                where:{
                    name:{
                        [Op.or]:req.body.roles
                    }
                }
            }).then((roles) => {
                user.setRoles(roles).then(() => {
                    res.status(201).send({
                        message:"user was registered successfully"
                    });
                });
            });
        }
        else{
            user.setRoles([1]).then(() => {
                res.status(201).send({
                    message:"user was registered successfully"
                });
            });
        }
    }).catch((err) => {
        res.status(500).send({
            message:err.message
        });
    });
};

exports.signIn = (req, res) => {
    User.findOne({
        where:{
            username:req.body.username
        }
    }).then((user) => {
        if (!user){
            return res.status(404).send({
                message:"user not found"
            });
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid){
            return res.status(401).send({
                message:"invalid password"
            });
        }
        
        let token = jwt.sign({id:user.id}, config.secret, {
            expiresIn:86400
        });

        let authorities = [];

        user.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++){
                authorities.push("ROLE_"+roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id:user.id,
                username:user.username,
                roles:authorities,
                accessToken:token
            });
        });
    }).catch((err) => {
        res.status(500).send({
            message:err.message
        });
    });
};
