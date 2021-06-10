const knex = require('../database/knex');
const Shop = require('../models/shop')
const Menu = require('../models/menu');
const User = require('../models/user');

const Instagram = require('../models/instagram');
const moment = require('moment');
moment.locale('th');

const MAXIMUM_RANDOM_SHOP = 4;

exports.getIndex = async (req, res) => {
    const shops = await Shop.getShops();
    const randomShops = [];
    const instagramFeeds = Instagram.getFeed();
    
    // Random without repeating
    for (let i = 0; i < MAXIMUM_RANDOM_SHOP; i++){
        do {
            randomShops[i] = shops[Math.floor(Math.random() * shops.length)];
        } while (new Set(randomShops).size != randomShops.length);
        
        await Shop.fillInformation(randomShops[i]);
    }

    const randomMenus = await Menu.getRandomMenuImages();
    for (const menu of randomMenus) {
        menu.data = (await Menu.findMenusById([menu.menu_id]))[0];
    }

    res.render(
        'index', {
            user: req.isAuthenticated() ? await User.getById(req.user) : '',
            recommendMenus: randomMenus,
            recommendShops: randomShops,
            instagramFeeds: instagramFeeds
        }
    );
};

exports.getShopById = async (req, res) => {
    const { id } = req.params;

    try {
        const shop = await Shop.getShop(id);
        const reviews = await Shop.getReviews(id);
        const priceRange = await Menu.findPriceRangeByShopId(shop.id);
        const [rating, ratingSum] = await Shop.calculateRating(reviews);

        reviews.sort((a, b) => {
            return (new Date(b.date).getTime()) - (new Date(a.date).getTime());
        });

        for (const review of reviews){
            const recommendMenus = await Menu.findMenusById([review.food_id]);
            review.recommend = recommendMenus.length > 0 ? recommendMenus[0].name: 'ไม่มี';

            const userId = req.user;
            const reviewer = await User.getById(review.user_id);

            review.name = reviewer.display_name;
            review.date = moment(review.date).format('ll');
            review.mine = (review.user_id == userId);
        }

        reviews.sort((a, b) => { return b.mine - a.mine; });

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
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            menuImages: await Menu.getRecomMenuImagesByShopId(shop.id),
            menus: await Menu.getAllMenusByShopId(shop.id),
            reviews: reviews
        });
    } catch {
        res.redirect('/shop');
    }
};

exports.getFoods = async (req, res) => {
    const queryTag = req.query.tag;
    let foods;
    
    if (queryTag) {
        const tag = queryTag.split(',').filter(v => v != '');
        foods = await Menu.getMenusByTag(tag);
    } else {
        foods = await Menu.getAllMenus();
    }

    for (const food of foods) {
        const menuId    = food.id;
        const shopId    = await Menu.findShopIdByMenuId(menuId);
        const shopData  = await Shop.getShop(shopId);

        food.imgUrl     = await Menu.findImageUrlByMenuId(menuId);
        food.shopId     = shopData.id;
        food.shopName   = shopData.name;
        food.location   = shopData.location;
    }

    res.render('food', {
        user: req.isAuthenticated() ? await User.getById(req.user) : '',
        foods: foods
    });
};

exports.getShops = async (req, res) => {
    const shops = await Shop.getShops();

    for (const shop of shops) await Shop.fillInformation(shop);

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