const fetch = require('node-fetch');

async function getDevicesForUser(userIdentifier) {
  const userDeviceStore = await fetch('https://growth-engineering-nodejs-home-assessement-dev.s3.eu-central-1.amazonaws.com/entitlements.json');

  const userDeviceStoreJson = await userDeviceStore.json();

  const userDevices = userDeviceStoreJson.find((udj) => udj.userId === userIdentifier);

  return userDevices;
}

module.exports = {
  getDevicesForUser
}
