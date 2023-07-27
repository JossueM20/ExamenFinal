const { Router } = require('express');
const router = Router();

const { renderSignUpForm,
        renderSignInForm,
        registrarse,
        loguearse,
        logout } = require('../controllers/users.controller');

router.get('/users/signup', renderSignUpForm);
router.post('/users/signup', registrarse);
router.get('/users/signin', renderSignInForm);
router.post('/users/signin', loguearse);
router.get('/users/logout', logout);
module.exports = router;