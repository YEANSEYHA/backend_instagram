const { Router } = require('express');

const reelController = require('../controller/reelController')

const router = Router();

// This route use to create a table

router.post("/createreeltable", reelController.createReelTable)



module.exports = router;