const server = require("../app");
const chai = require('chai');
const chaiHttp = require('chai-http');

// Assertion
chai.should();
chai.use(chaiHttp);

describe('devicesAPI', () => {
  const validUserId = 'c0b8584c-97e3-4561-b8fc-58797b1f4c6d';

  describe('Test GET User Devices', () => {
    it('should get all user devices given a valid user guid', (done) => {
      chai.request(server)
        .get(`/devices/${validUserId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          response.body.length.should.not.be.eq(0);
          done();
        });
    });
    it('should return an not found when no userId is provided ', (done) => {
      chai.request(server)
        .get(`/devices/`)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('Test POST User Devices', () => {
    it('should add a device to the list of user devices', (done) => {
      chai.request(server)
        .get(`/devices/${validUserId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          response.body.length.should.not.eq(2);
        });

      chai.request(server)
        .post(`/devices/${validUserId}/new-device`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          response.body.length.should.be.eq(3);
          done();
        });
    });

    it('should return a not found if the request is incomplete',  (done) => {
      chai.request(server)
        .get(`/devices/${validUserId}/`)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  // describe('Test PUT User Devices', () => {
  //   it('should add a device to the list of user devices', (done) => {
  //     chai.request(server)
  //       .get(`/devices/${validUserId}`)
  //       .end((err, response) => {
  //         response.should.have.status(200);
  //         response.body.should.be.a('array');
  //         response.body.length.should.not.eq(2);
  //       });
  //
  //     chai.request(server)
  //       .post(`/devices/${validUserId}/new-device`)
  //       .end((err, response) => {
  //         response.should.have.status(200);
  //         response.body.should.be.a('array');
  //         response.body.length.should.be.eq(3);
  //         done();
  //       });
  //   });
  //
  //   it('should return a not found if the request is incomplete',  (done) => {
  //     chai.request(server)
  //       .get(`/devices/${validUserId}/`)
  //       .end((err, response) => {
  //         response.should.have.status(404);
  //         done();
  //       });
  //   });
  // });
});
