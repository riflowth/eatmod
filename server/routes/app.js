const express = require('express');
const router = express.Router();

const appController = require('../controllers/app');
const authMiddleware = require('../middlewares/auth');

router.get(
    '/', 
    authMiddleware.isMember,
    appController.getIndex
);

module.exports = router;