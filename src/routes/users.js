const express =require('express')
const usersControllers = require('../controllers/users')
const router = express.Router()

router
    .post('/register', usersControllers.register)
    .post('/login', usersControllers.login)



module.exports = router