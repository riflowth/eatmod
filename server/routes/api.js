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

//post method ==> {"id":0, "name":"ข้าวขาหมู", "type":"rice", "price":99999, "shop_id":3} //id=0 คือรันต่อไป
router.post(
    '/addmenu',
    authMiddleware.isMember,
    apiController.addFoodData
);

//post method ==> {"id":0}  //id = 0 คือลบrecordสุดท้าย
//delete by id
router.post(
    '/deletemenu',
    authMiddleware.isMember,
    apiController.removeFoodData
);

//post method ==> {"id":0, "name":"ข้าวขาหมู", "type":"rice", "price":99999, "image_url":"link99", "shop_id":3} //id = 0 คือเปลี่ยนrecordสุดท้าย
//change by id
router.post(
    '/changemenu',
    authMiddleware.isMember,
    apiController.changeFoodData
);

module.exports = router;

/*
/////////////////////////ข้างล่างคือแยกละ แต่ลองเล่นดูแล้ว คิดว่ารวมน่าจะง่ายกว่า

//จองrecord ใหม่
router.post(
    '/addrecord',
    authMiddleware.isMember,
    apiController.addNewRecord
);

//post method ==> {"name":"ข้าวหาหมู"}
router.post(
    '/addfoodname',
    authMiddleware.isMember,
    apiController.addFoodName
);

//post method ==> {"type":"rice"}
router.post(
    '/addfoodtype',
    authMiddleware.isMember,
    apiController.addFoodType
);

//post method ==> {"price":99999}
router.post(
    '/addfoodprice',
    authMiddleware.isMember,
    apiController.addFoodPrice
);

//post method ==> {"shop_id":3}
router.post(
    '/addfoodshopid',
    authMiddleware.isMember,
    apiController.addFoodShopId
);
*/