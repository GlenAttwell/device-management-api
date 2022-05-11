class Entitlements {
  constructor(devices) {
    this.devices = devices;
  }
}

class Devices {
  constructor(access_device, max_devices) {
    this.access_device = access_device;
    this.max_devices = max_devices;
  }
}

class UserEntitlement {
  constructor(userId, entitlements) {
    this.userId = userId;
    this.entitlements = entitlements;
  }
}

module.exports = {
  UserEntitlement,
  Devices,
  Entitlements
}
//{"userId":"c0b8584c-97e3-4561-b8fc-58797b1f4c6d","entitlements":{"devices":{"access_device":"any","max_devices":2}}}
