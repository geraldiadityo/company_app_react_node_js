const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

let should = chai.should();

chai.use(chaiHttp);

describe('/POST login user',() => {
    it('should login success with username and password', (done) => {
        let data = {
            username:"adityo",
            password:"Ge@140019"
        }
        chai.request(server)
        .post('/api/auth/signin/')
        .send(data)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('username');
            res.body.should.have.property('accessToken');
            done();
        });
    });
    it('should login with username and password invalid', (done) => {
        let data = {
            username:"geraldi",
            password:"test"
        }
        chai.request(server)
        .post('/api/auth/signin/')
        .send(data)
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('message');
            done();
        });
    });
});


