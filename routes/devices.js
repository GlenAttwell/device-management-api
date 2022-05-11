const express = require('express');
const router = express.Router();
const {getDevicesForUser} = require('../controllers/devices.controller');

/* GET devices for user. */
router.get('/:userIdentifier', async(req, res, next) => {
  const userIdentifier = req.params.userIdentifier;

  if (!userIdentifier) {
    res.status(400).message('User identifier expected');
    res.end();
  }
  const result = await getDevicesForUser(userIdentifier);
  res.send(result);
});

module.exports = router;
