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
    apiController.writeReview
);
  
router.put(
    '/review',
    authMiddleware.isMember,
    apiController.updateReview
);

router.delete(
    '/review',
    authMiddleware.isMember,
    apiController.deleteReview
);

router.post(
    '/menu',
    authMiddleware.isMember,
    apiController.addFoodData
);

router.delete(
    '/menu',
    authMiddleware.isMember,
    apiController.removeFoodData
);

router.patch(
    '/menu',
    authMiddleware.isMember,
    apiController.changeFoodData
);

module.exports = router;