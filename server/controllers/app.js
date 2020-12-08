const knex = require('../database/knex');
const Shop = require('../models/shop')
const Menu = require('../models/menu');

exports.getIndex = async (req, res) => {
    let shops = await Shop.getShops();
    let randomShops = [];

    for (let i = 0; i < 4; i++) {
        do {
            randomShops[i] = shops[Math.floor(Math.random() * shops.length)];
        } while (new Set(randomShops).size != randomShops.length);

        let reviews = await Shop.getReviews(randomShops[i].id);
        let rating = 0;

        if (reviews.length != 0) {
            for (review of reviews) {
                rating = rating + review.rating;
            }
            rating = rating / reviews.length;
        }
        
        randomShops[i].rating = rating;
        randomShops[i].review = reviews.length;
        randomShops[i].reviewUrl = `/shop/${randomShops[i].id}`;
        randomShops[i].imgUrl = `../assets/images/shops/${i}.jpg` 
    }

    let randomMenus = await Menu.getRandomMenuImages();

    res.render(
        'index', {
            recommendMenus: randomMenus,
            recommendShops: randomShops
        }
    );
};

exports.getShop = async (req, res) => {
    const { id } = req.params;

    try {
        let shop = await Shop.getShop(id);
        let reviews = await Shop.getReviews(id);
        let averageSum = 0;
        let ratingSum = 0;

        if (reviews.length != 0) {
            for (review of reviews) {
                ratingSum = ratingSum + review.rating;
            }
            averageSum = ratingSum / reviews.length;
        }

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
    } catch {
        res.redirect('/shop');
    }
};

exports.getShops = (req, res) => {
    res.render('shops', {});
};

exports.getLogin = (req, res) => {
    res.render('login', {});
};