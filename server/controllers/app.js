const knex = require('../database/knex');
const Shop = require('../models/shop')
const Menu = require('../models/menu');
const User = require('../models/user');

const Instagram = require('../models/instagram');
const moment = require('moment');
moment.locale('th');

exports.getIndex = async (req, res) => {
    let shops = await Shop.getShops();
    let randomShops = [];
    let instagramFeeds = Instagram.getFeed();
    for (let i = 0; i < 4; i++){
        do {
            randomShops[i] = shops[Math.floor(Math.random() * shops.length)];
        } while (new Set(randomShops).size != randomShops.length);
    }
    await fillShopsInformation(randomShops);
    let randomMenus = await Menu.getRandomMenuImages();

    res.render(
        'index', {
            user: req.isAuthenticated() ? await User.getById(req.user) : '',
            recommendMenus: randomMenus,
            recommendShops: randomShops,
            instagramFeeds: instagramFeeds
        }
    );
};

exports.getShop = async (req, res) => {
    const { id } = req.params;
    let myId = req.user;

    try {
        let shop = await Shop.getShop(id);
        let reviews = await Shop.getReviews(id);
        let ratingSum = 0;
        let rating = 0;
      
        if (reviews.length != 0) {
            ratingSum = findSumRating(reviews);
            rating = Math.floor(ratingSum / reviews.length);
        }
        reviews.sort((a, b) => {
            return (new Date(b.date).getTime()) - (new Date(a.date).getTime());
        })
        for(review of reviews){
            let recommend = await Menu.findMenusById([review.food_id]);
            review.recommend = recommend.length > 0 ? recommend[0].name: 'ไม่มี';
            user = await User.getById(review.user_id);
            review.name = user.display_name;
            review.date = moment(review.date).format('ll');
            if (review.user_id == myId) {
                review.mine = 1;
            } else {
                review.mine = 0;
            }
        }
        reviews.sort((a, b) => {
            return b.mine - a.mine; 
        })

        let price = await Menu.findPriceRangeByShopId(shop.id);

        res.render('shop', {
            user: req.isAuthenticated() ? await User.getById(req.user) : '',
            id: id,
            name: shop.name,
            type: shop.type,
            location: shop.location,
            rating: rating,
            allRatings: ratingSum,
            reviewsCount: reviews.length,
            openTime: shop.open.slice(0, 5),
            closeTime: shop.close.slice(0, 5),
            minPrice: price[0],
            maxPrice: price[1],
            menuImages: await Menu.getRecomMenuImagesByShopId(shop.id),
            menus: await Menu.getAllMenusByShopId(shop.id),
            reviews: reviews
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
        let reviews = await Shop.getReviews(shops[i].id);
        let rating = 0;
        let ratingSum = 0;

        if (reviews.length != 0) {
            ratingSum = findSumRating(reviews);
            rating = Math.floor(ratingSum / reviews.length);
        }

        shops[i].ratingSum = ratingSum;
        shops[i].rating = rating;
        shops[i].review = reviews.length;
        shops[i].reviewUrl = `/shop/${shops[i].id}`;
        shops[i].imgUrl = `../assets/images/shops/${shops[i].id}.jpg`;
    }
}