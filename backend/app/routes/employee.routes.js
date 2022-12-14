const {authJwt} = require("../middleware");
const controller = require("../controller/employee.controller.js");

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/employee/",
    [authJwt.verifyToken,authJwt.isAdmin],
    controller.getAll);
    app.get("/api/employee/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getOne);

    app.post("/api/employee/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addEmployee
    );

    app.put("/api/employee/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateEmployee);

    app.delete("/api/employee/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteEmployee);
}
