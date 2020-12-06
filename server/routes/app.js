const express = require('express');
const router = express.Router();

const appController = require('../controllers/app');
const authMiddleware = require('../middlewares/auth');

router.get(
    '/', 
    authMiddleware.isMember,
    appController.getIndex
);

router.get(
    '/shop/:id',
    authMiddleware.isMember,
    appController.getShop
);

router.get(
    '/shop',
    authMiddleware.isMember,
    appController.getShops
);

router.get(
    '/login',
    appController.getLogin
);

module.exports = router;