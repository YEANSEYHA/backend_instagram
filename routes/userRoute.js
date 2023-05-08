const { Router } = require('express');

const userController = require('../controller/userController')

const router = Router();

router.post("/createusertable",userController.createUserTable)
router.post("/createnewuser",userController.createNewUser)
router.put('/updateuser/:id',userController.updateUser)
router.get('/getalluser',userController.getAllUsers)
router.delete('/deleteuser/:id',userController.deleteUser)

module.exports = router;