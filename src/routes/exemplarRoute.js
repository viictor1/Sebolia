const exemplarService = require("../service/exemplarService");
const express = require('express');
const router = express.Router();
const { authPage } = require('../security/middlewares');

router.get('/', authPage(["user", "admin"]), exemplarService.getAllExemplares);
router.get('/unico', authPage(["user", "admin"]), exemplarService.getExemplarUnico);
router.post('/', authPage(["admin"]), exemplarService.createExemplar);
router.delete('/', authPage(["admin"]), exemplarService.deletarExemplar);
router.put('/', authPage(["admin"]), exemplarService.updateExemplar);

module.exports = router;