const indexService = require("../service/indexService");
const express = require("express");
const router = express.Router();

router.get('/', indexService.getIndex);

module.exports = router;