const express = require('express');
const router = express.Router();
const {getDevicesForUser} = require('../controllers/devices.controller');

/* GET devices for user. */
router.get('/:identifier', (req, res, next) => {
  const identifier = req.params.identifier
  const response = {
    id: getDevicesForUser(identifier)
  }
  res.send(response);
});

module.exports = router;
