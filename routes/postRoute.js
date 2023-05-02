const { Router } = require('express');

const postController = require('../controller/postController')

const router = Router();



router.post("/",postController.addPost)
router.get("/posts",postController.getPosts)

// This route use to create a table

router.post("/createposttable",postController.createPostTable)



module.exports = router;