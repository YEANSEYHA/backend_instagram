const { Router } = require('express');

const postController = require('../controller/postController')

const router = Router();



router.post("/",postController.addPost)

// This route use to create a table

router.post("/createtable",postController.createPostTable)



module.exports = router;