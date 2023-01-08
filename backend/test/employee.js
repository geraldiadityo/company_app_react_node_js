const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

let should = chai.should();

chai.use(chaiHttp);

describe('/GET Employee',() => {
    it('it should GET all employee',(done) => {
        chai.request(server)
        .get('/api/employee')
        .set('x-access-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjczMTA3MzM2LCJleHAiOjE2NzMxOTM3MzZ9.mYLPAqGZNsAcFysJMOMK-wkuCK2Ey8xviT4YqSuCtPI')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            done();
        });
    });
    it('it should GET employee with id', (done) => {
        let id = 1;
        chai.request(server)
        .get('/api/employee/'+id)
        .set('x-access-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjczMTA3MzM2LCJleHAiOjE2NzMxOTM3MzZ9.mYLPAqGZNsAcFysJMOMK-wkuCK2Ey8xviT4YqSuCtPI')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            done();
        });
    });
});
