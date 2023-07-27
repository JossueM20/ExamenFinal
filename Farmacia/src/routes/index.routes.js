const { Router } = require('express');
const router = Router();
const { renderIndex, renderAbout, renderEncuesta, renderMaterial } = require('../controllers/index.controller');
const { isAuthenticated } = require('../helpers/auth');

router.get('/', renderIndex);
router.get('/about', renderAbout);
router.get('/encuesta', isAuthenticated, renderEncuesta);
router.get('/material', isAuthenticated, renderMaterial);

module.exports = router;