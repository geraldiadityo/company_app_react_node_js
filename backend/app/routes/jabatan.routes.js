const {authJwt} = require("../middleware");
const controller = require("../controller/jabatan.controller.js");

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/jabatan/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addJabatan);

    app.put("/api/jabatan/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.editJabatan);

    app.get("/api/jabatan/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAll);

    app.get("/api/jabatan/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getOne);

    app.delete("/api/jabatan/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteJabatan);
}