const express = require('express');
const router = express.Router();

const apiController = require('../controllers/api');
const authMiddleware = require('../middlewares/auth');

router.get('/', (req, res) => {
    res.json({
        response: 'Hello! This is EatMod API',
        timestamp: new Date()
    });
});

router.post(
    '/review',
    authMiddleware.isMember,
    apiController.writeReview);
  
router.put(
    '/review',
    authMiddleware.isMember,
    apiController.updateReview);

router.delete(
    '/review',
    authMiddleware.isMember,
    apiController.deleteReview);

module.exports = router;