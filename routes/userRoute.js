const { Router } = require('express');

const userController = require('../controller/userController')

const router = Router();

router.post("/createusertable",userController.createUserTable)



module.exports = router;