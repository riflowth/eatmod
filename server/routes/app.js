const express = require('express');
const router = express.Router();

const appController = require('../controllers/app');
const authMiddleware = require('../middlewares/auth');

router.get(
    '/', 
    appController.getIndex
);

router.get(
    '/shop/:id',
    appController.getShop
);

router.get(
    '/shop',
    appController.getShops
);

router.get(
    '/food',
    appController.getFood
);

router.get(
    '/login',
    appController.getLogin
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;