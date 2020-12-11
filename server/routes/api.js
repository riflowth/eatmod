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
    authMiddleware.isAuthenticated,
    apiController.writeReview
);
  
router.put(
    '/review',
    authMiddleware.isAuthenticated,
    apiController.updateReview
);

router.delete(
    '/review',
    authMiddleware.isAuthenticated,
    apiController.deleteReview
);

router.post(
    '/menu',
    authMiddleware.isAuthenticated,
    apiController.addFoodData
);

router.delete(
    '/menu',
    authMiddleware.isAuthenticated,
    apiController.removeFoodData
);

router.patch(
    '/menu',
    authMiddleware.isAuthenticated,
    apiController.changeFoodData
);

module.exports = router;