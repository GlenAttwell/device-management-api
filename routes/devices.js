const express = require('express');
const router = express.Router();
const {getDevicesForUser, addNewDeviceForUser, updateDeviceForUser, deleteDeviceForUser} = require('../controllers/devices.controller');

/* GET devices for user. */
router.get('/:userIdentifier', (req, res) => {
  const userIdentifier = req.params.userIdentifier;

  if (!userIdentifier) {
    res.status(400).message('UserModel identifier expected');
    res.end();
  }
  const result = getDevicesForUser(userIdentifier);
  res.send(result);
});

router.post('/:userIdentifier/:deviceName', (req, res) => {
  const userIdentifier = req.params.userIdentifier;
  if (!userIdentifier) {
    res.status(400).message('user identifier expected');
    res.end();
  }

  const deviceName = req.params.deviceName;
  if (!deviceName) {
    res.status(400).message('device name expected');
    res.end();
  }

  const result = addNewDeviceForUser(userIdentifier, deviceName);
  res.send(result);
})

router.put('/:userIdentifier/:deviceId/:newDeviceName', (req, res) => {
  const userIdentifier = req.params.userIdentifier;
  if (!userIdentifier) {
    res.status(400).message('user identifier expected');
    res.end();
  }

  const deviceId = req.params.deviceId;
  if (!deviceId) {
    res.status(400).message('device id expected');
    res.end();
  }

  const deviceNewName = req.params.newDeviceName;
  if (!deviceNewName){
    res.status(400).message('new device name cannot be empty');
    res.end();
  }

  const result = updateDeviceForUser(userIdentifier, deviceId, deviceNewName);
  res.send(result);
})

router.delete('/:userIdentifier/:deviceId', (req, res) => {
  const userIdentifier = req.params.userIdentifier;
  if (!userIdentifier) {
    res.status(400).message('user identifier expected');
    res.end();
  }

  const deviceId = req.params.deviceId;
  if (!deviceId) {
    res.status(400).message('device id expected');
    res.end();
  }

  const result = deleteDeviceForUser(userIdentifier, deviceId);
  res.send(result);
})

module.exports = router;
