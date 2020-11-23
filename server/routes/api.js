const express = require('express');
const router = express.Router();

const apiController = require('../controllers/api');
const authMiddleware = require('../middlewares/auth');

router.get(
    '/shop',
    authMiddleware.isMember,
    apiController.getShops
);

router.get(
    '/shop/:id',
    authMiddleware.isMember,
    apiController.getShopById
);

module.exports = router;