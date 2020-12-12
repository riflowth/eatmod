const knex = require('../database/knex');
const Shop = require('../models/shop')
const Menu = require('../models/menu');
const User = require('../models/user');

exports.getIndex = async (req, res) => {
    let shops = await Shop.getShops();
    let randomShops = [];
    for (let i = 0; i < 4; i++) {
        do {
            randomShops[i] = shops[Math.floor(Math.random() * shops.length)];
        } while (new Set(randomShops).size != randomShops.length);
    }

    await fillShopsInformation(randomShops);
    let randomMenus = await Menu.getRandomMenuImages();

    res.render('index', {
        user: req.isAuthenticated() ? await User.getById(req.user) : '',
        recommendMenus: randomMenus,
        recommendShops: randomShops
    });
};

exports.getShop = async (req, res) => {
    const { id } = req.params;

    try {
        let shop = await Shop.getShop(id);
        let reviews = await Shop.getReviews(id);
        let ratingSum = 0;
        let averageSum = 0;
        if (reviews.length != 0) {
            ratingSum = findSumRating(reviews);
            averageSum = ratingSum / reviews.length;
        }

        res.render('shop', {
            user: req.isAuthenticated() ? await User.getById(req.user) : '',
            name: shop.name,
            type: shop.type,
            location: shop.location,
            rating: averageSum,
            allRatings: ratingSum,
            reviews: reviews.length,
            openTime: shop.open.slice(0, 5),
            closeTime: shop.close.slice(0, 5),
            minPrice: shop.minPrice,
            maxPrice: shop.maxPrice,
            menuImages: await Menu.getRecomMenuImagesByShopId(shop.id)
        });
    } catch {
        res.redirect('/shop');
    }
};

exports.getFood = async (req, res) => {
    let queryTag = req.query.tag;
    let foods = await Menu.getAllMenus();
    
    if (queryTag) {
        let tag = queryTag.split(',').filter(v => v != '');
        foods = await Menu.getMenusByTag(tag);
    }

    for (let i = 0; i < foods.length; i++) {
        let menuId = foods[i].id;
        let shopId = await Menu.findShopIdByMenuId(menuId);
        let shopData = await Shop.getShop(shopId);

        foods[i].imgUrl = await Menu.findImageUrlByMenuId(menuId);
        foods[i].shopId = shopData.id;
        foods[i].shopName = shopData.name;
        foods[i].location = shopData.location;
    }

    res.render('food', {
        user: req.isAuthenticated() ? await User.getById(req.user) : '',
        foods: foods
    });
}

exports.getShops = async (req, res) => {
    let shops = await Shop.getShops();

    await fillShopsInformation(shops);

    res.render('shops', {
        user: req.isAuthenticated() ? await User.getById(req.user) : '',
        shops: shops
    });
};

exports.getLogin = async (req, res) => {
    res.render('login', {
        user: req.isAuthenticated() ? await User.getById(req.user) : ''
    });
};

function findSumRating(reviews) {
    let ratingSum = 0;
    for (review of reviews) {
        ratingSum = ratingSum + review.rating;
    }
    return ratingSum;
}

async function fillShopsInformation(shops) {
    for (let i = 0; i < shops.length; i++) {
        let price = await Menu.findPriceRangeByShopId(shops[i].id)
        let reviews = await Shop.getReviews(shops[i].id);
        let rating = 0;
        let price_min = price[0]
        let price_max = price[1]
        if (reviews.length != 0) {
            for (review of reviews) {
                rating = rating + review.rating;
            }
            rating = rating / reviews.length;
        }

        shops[i].rating = rating;
        shops[i].review = reviews.length;
        shops[i].reviewUrl = `/shop/${shops[i].id}`;
        shops[i].imgUrl = `../assets/images/shops/${shops[i].id}.jpg`
        shops[i].minPrice = price_min,
        shops[i].maxPrice = price_max
    }
}


