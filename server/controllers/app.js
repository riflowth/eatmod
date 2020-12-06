const knex = require('../database/knex');
const Shop = require('../models/shop')
const menu = require('../models/menu');
const apiController = require('../controllers/api');

exports.getIndex = async (req, res) => {
    // TODO
//>>>    let shops = await Shop.getShops();
    let menus = await menu.getAllMenuImages();
    let randomMenus = await menu.findLastId();
    console.log(randomMenus)

    //let add = await apiController.addFoodData();
    //add
    //test database manipulation function
    /*
    let addFoodId = await database.insertFoodId();
    let addFoodName = await database.insertFoodName();
    let addFoodType = await database.insertFoodType();
    let addFoodPrice = await database.insertFoodPrice();
    let addFoodUrl = await database.insertFoodUrl();
    let addFoodShopId = await database.insertFoodShopId();
    addFoodId
    addFoodName
    addFoodType
    addFoodPrice
    addFoodUrl
    addFoodShopId
    */
    //end of test zone

    res.render(
        'index', {
//>>>           recommendMenus: [],
//>>>           recommendShops: shops
        }
    );
};

/*>>>
exports.getShop = async (req, res) => {
    const { id } = req.params;
    let shop = await Shop.getShop(id);
    let reviews = await Shop.getReviews(id);
    let averageSum = 0;
    let ratingSum = 0;
    for(review of reviews){
        ratingSum = ratingSum + review.rating;
    }
    averageSum = ratingSum/reviews.length;
    res.render('shop', {
        name: shop.name,
        type: shop.type,
        location: shop.location,
        rating: averageSum,
        allRatings: ratingSum,
        reviews: reviews.length,
        openTime: shop.open,
        closeTime: shop.close
    });
};

exports.getShops = (req, res) => {
    res.render('shops', {});
};

exports.getLogin = (req, res) => {
    res.render('login', {});
};

>>>*/
