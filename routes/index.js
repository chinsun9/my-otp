const express = require('express');
const { genSharedKey } = require('./utils/genSharedKey');
const { getToken } = require('./utils/getToken');

const router = express.Router();

const key = genSharedKey();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'My-otp', key });
});

router.get('/key', (req, res) => {
  res.json(key);
});

router.post('/otp', (req, res) => {
  const { inputKey } = req.body;

  res.json(getToken(inputKey));
});

router.get('/genkey', (req, res) => {
  res.json(genSharedKey());
});

router.post('/login', (req, res) => {
  console.info(new Date());
  const { inputKey, inputOtp } = req.body;
  const loginResult = inputOtp === getToken(inputKey)
  || inputOtp === getToken(inputKey, true);

  res.json(loginResult);
});

module.exports = router;
