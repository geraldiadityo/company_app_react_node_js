const {authJwt} = require("../middleware");
const controller = require("../controller/pekerjaan.controller.js");

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-token-access, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/pekerjaan/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAll);

    app.post("/api/pekerjaan/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addPekerjaan);
}