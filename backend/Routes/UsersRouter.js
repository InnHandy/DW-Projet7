const express = require('express');
const router = express.Router();

const userCtrl = require('../Controllers/UsersController');

router.get('/all', userCtrl.all);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
/*
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
*/
module.exports = router;