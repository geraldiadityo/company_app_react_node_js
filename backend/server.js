const express = require("express");
const cors = require("cors");
const db = require("./app/model");
const app = express();
const Role = db.role;

let corsOption = {
    origin: "http://localhost:3000"
};

global.__basedir = __dirname;

app.use(cors(corsOption));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

db.sequelize.sync({force:false}).then(() => {
    console.log("drop and sync database");
    //initial();
});

function initial() {
    Role.create({
        id:1,
        name:"user"
    });

    Role.create({
        id:2,
        name:"admin"
    });
}

app.get("/", (req, res) => {
    res.json({message:"test api machine"});
});

require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/employee.routes.js")(app);
require("./app/routes/jabatan.routes.js")(app);
require("./app/routes/pekerjaan.routes.js")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}.`);
});
