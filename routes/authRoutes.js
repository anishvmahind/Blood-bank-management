const express = require('express');
const { registerController, loginController, currentUsercontroller} = require('../controllers/authController');
const authmiddleware = require('../middlewares/authmiddleware');

const router = express.Router()

//routes 
router.post('/register', registerController)
router.post('/login', loginController)

//get current user
router.get("/current-user", authmiddleware, currentUsercontroller);

module.exports = router;
