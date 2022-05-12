const fetch = require('node-fetch');
const User = require('../models/user.model');
const Device = require('../models/device.model');
const { randomUUID } = require('crypto');

const users = [
  new User('c0b8584c-97e3-4561-b8fc-58797b1f4c6d', [
    new Device(randomUUID(), 'PC'),
    new Device(randomUUID(), 'Tablet')
  ]),
  new User('33fb75d0-7710-4f1f-a5d7-50b73b6b33d2', [
    new Device(randomUUID(), 'Laptop'),
    new Device(randomUUID(), 'Mobile')
  ])
];

async function getUserEntitlement (userIdentifier) {
  const userDeviceStore = await fetch('https://growth-engineering-nodejs-home-assessement-dev.s3.eu-central-1.amazonaws.com/entitlements.json');

  const userDeviceStoreJson = await userDeviceStore.json();

  return userDeviceStoreJson.find((udj) => udj.userId === userIdentifier);
}

function getDevicesForUser(userIdentifier) {
  const userIndex = users.findIndex(u => u.userId === userIdentifier);

  if (userIndex === -1) {
    throw Error('user not found');
  }

  return users[userIndex].devices;
}

function addNewDeviceForUser(userIdentifier, deviceName) {
  const userIndex = users.findIndex(u => u.userId === userIdentifier);

  if (userIndex === -1) {
    throw Error('user not found');
  }

  users[userIndex].devices.push(new Device(randomUUID(), deviceName));
  return users[userIndex].devices;
}

function updateDeviceForUser(userIdentifier, deviceId, newDeviceName) {
  const userIndex = users.findIndex(u => u.userId === userIdentifier);
  if (userIndex === -1) {
    throw Error('user not found');
  }

  const deviceIndex = users[userIndex].devices.findIndex(d => d.deviceId === deviceId);
  if (deviceIndex === -1) {
    throw Error('device not found');
  }
  users[userIndex].devices[deviceIndex].deviceName = newDeviceName
  return users[userIndex].devices[deviceIndex];
}

function deleteDeviceForUser(userIdentifier, deviceId) {
  const userIndex = users.findIndex(u => u.userId === userIdentifier);
  if (userIndex === -1) {
    throw Error('user not found');
  }

  const deviceIndex = users[userIndex].devices.findIndex(d => d.deviceId === deviceId);
  if (deviceIndex === -1) {
    throw Error('device not found');
  }

  users[userIndex].devices = users[userIndex].devices.splice(d => d.deviceId !== deviceId)
  return users[userIndex].devices;
}

module.exports = {
  getDevicesForUser,
  addNewDeviceForUser,
  updateDeviceForUser,
  deleteDeviceForUser
}
