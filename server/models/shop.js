const knex = require('../database/knex');

exports.getShops = async () => {
    let shops = await knex.select().from('shops');
    return JSON.parse(JSON.stringify(shops));
}

exports.getShop = async (id) => {
    let shop = await knex.select().from('shops').where({ id: id });
    return JSON.parse(JSON.stringify(shop[0]));
}

exports.getReviews = async (shopId) => {
    let reviews = await knex.select('rating','review').from('reviews').where({ shop_id: shopId });
    return JSON.parse(JSON.stringify(reviews));
}

exports.writeReview = async (rating, userId, review, shopId) => {
    let id = await knex.insert({
        rating: rating,
        user_id: userId,
        review: review,
        shop_id: shopId
    }).into('reviews');
    return id;
}

exports.updateReview = async (rating, userId, review , shopId) => {
    let id = await knex('reviews').update({
        rating: rating,
        review: review
    }).where({ user_id: userId, shop_id: shopId });
    return id;
}

exports.deleteReview = async (userId, shopId) => {
    knex('reviews').del().where({ user_id: userId, shop_id: shopId });    
}