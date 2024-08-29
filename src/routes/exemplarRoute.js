const exemplarService = require("../service/exemplarService");
const express = require('express');
const router = express.Router();

router.get('/', exemplarService.getAllExemplares);
router.get('/unico', exemplarService.getExemplarUnico);
router.post('/', exemplarService.createExemplar);
router.delete('/', exemplarService.deletarExemplar);
router.put('/', exemplarService.updateExemplar);

module.exports = router;