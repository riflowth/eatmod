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

router.post(
    '/add',
    authMiddleware.isMember,
    apiController.addFoodData
);
//post method ==> {"id":0, "name":"asd", "type":"asdf", "price":99999, "shop_id":3}
//TypeError: res.redirect is not a function <=== error นี้ มันเหมือนหา /add ไม่เจออะ เพราะไม่ว่าจะrequest post อะไรก็ตาม มันจะขึ้นอย่างนี้ตลอด

module.exports = router;