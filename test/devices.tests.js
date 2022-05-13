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
        .post(`/devices/${validUserId}/`)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('Test PUT User Devices', () => {
    it('should update a device name for a user', (done) => {
      const deviceName = 'new-device';
      const updatedDeviceName = 'updated-device';
      let userDevices = [];
      chai.request(server)
        .post(`/devices/${validUserId}/${deviceName}`)
        .end((err, response) => {
          response.should.have.status(200);
          userDevices = response.body;

          const newDevice = userDevices.find(d => d.deviceName === deviceName);

          chai.request(server)
            .put(`/devices/${validUserId}/${newDevice.deviceId}/${updatedDeviceName}`)
            .end((err, response) => {
              response.should.have.status(200);
              response.body.should.be.a('array');
              response.body.length.should.be.eq(3);
              const updatedDevice = response.body.find(d => d.deviceId === newDevice.deviceId);
              updatedDevice.should.not.eq(null);
              updatedDevice.deviceName.should.eq(updatedDeviceName)
              done();
            });
        });
    });
  });

  describe('Test DELETE User Devices', () => {
    it('should delete a device for a user', (done) => {
      const deviceName = 'new-device';
      chai.request(server)
        .post(`/devices/${validUserId}/${deviceName}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          response.body.length.should.be.eq(3);

          const newDevice = response.body.find(d => d.deviceName === deviceName);

          chai.request(server)
            .delete(`/devices/${validUserId}/${newDevice.deviceId}`)
            .end((err, response) => {
              response.should.have.status(200);
              response.body.should.be.a('array');
              response.body.length.should.be.eq(2);
              response.body.findIndex(d => d.deviceId === newDevice.deviceId).should.eq(-1);
              done();
            });
        });
    });

    it('should return an not found when no userId is provided ', (done) => {
      const deviceName = 'new-device';
      chai.request(server)
        .post(`/devices/${validUserId}/${deviceName}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          response.body.length.should.be.eq(3);

          chai.request(server)
            .delete(`/devices/${validUserId}/`)
            .end((err, response) => {
              response.should.have.status(404);
              done();
            });
        });
    });
  });
});
