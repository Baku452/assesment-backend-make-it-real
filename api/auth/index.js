const { Router } = require('express');
const { loginUserHandler } = require('./auth.controller')

const router = Router()


router.post('/local/login', loginUserHandler)

module.exports = router
