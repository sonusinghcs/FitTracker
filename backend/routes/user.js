const express = require('express');

const router = express.Router();
const {signupUser,loginUser} = require('../controllers/userController')

//login

router.post('/login',loginUser);

//sigin

router.post('/signup',signupUser);

//logout

module.exports = router