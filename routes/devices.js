const express = require('express');
const router = express.Router();
const {getDevicesForUser} = require('../controllers/devices.controller');

/* GET devices for user. */
router.get('/:userIdentifier', async(req, res) => {
  const userIdentifier = req.params.userIdentifier;

  if (!userIdentifier) {
    res.status(400).message('User identifier expected');
    res.end();
  }
  const result = await getDevicesForUser(userIdentifier);
  res.send(result);
});

router.post('/:userIdentifier', (req, res) => {
  const userIdentifier = req.params.userIdentifier;
})

router.put('/:userIdentifier', (req, res) => {
  const userIdentifier = req.params.userIdentifier;
})

router.delete('/:userIdentifier', (req, res) => {
  const userIdentifier = req.params.userIdentifier;
})

module.exports = router;
