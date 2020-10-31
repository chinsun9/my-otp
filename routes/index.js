const express = require('express');
const router = express.Router();

const { genSharedKey } = require('./utils/genSharedKey');
const { getToken } = require('./utils/getToken');

let key = genSharedKey();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'My-otp', key: key });
});

router.get('/key', function (req, res, next) {
  res.json(key);
});

router.post('/otp', function (req, res, next) {
  const { input_key } = req.body;

  res.json(getToken(input_key));
});

router.get('/genkey', function (req, res, next) {
  res.json(genSharedKey());
});

router.post('/login', function (req, res, next) {
  console.info(new Date());
  const { input_key, input_otp } = req.body;
  let login_result = false;

  if (
    input_otp == getToken(input_key) ||
    input_otp == getToken(input_key, true)
  ) {
    login_result = true;
  }

  res.json(login_result);
});

module.exports = router;
