const { Router } = require('express');

const postController = require('../controller/postController')

const router = Router();



router.post("/",postController.addPost)



module.exports = router;