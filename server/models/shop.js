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
    let reviews = await knex.select('rating', 'review','title','date','food_id','user_id').from('reviews').where({ shop_id: shopId });
    return JSON.parse(JSON.stringify(reviews));
}

exports.writeReview = async (title, review, rating, date, foodId, userId, shopId) => {
    let id = await knex.insert({
        title: title,
        review: review,
        rating: rating,
        date: date,
        food_id: foodId,
        user_id: userId,
        shop_id: shopId
    }).into('reviews');
    return id;
}

exports.updateReview = async (title, review, rating, date, foodId, userId, shopId) => {
    let id = await knex('reviews').update({
        title: title,
        review: review,
        rating: rating,
        date: date,
        food_id: foodId,
        user_id: userId,
        shop_id: shopId
    }).where({ user_id: userId, shop_id: shopId });
    return id;
}

exports.deleteReview = async (userId, shopId) => {
    await knex('reviews').del().where({ user_id: userId, shop_id: shopId });
}

exports.getReview = async (userId, shopId) => {
    let review = await knex('reviews').select('rating', 'review').where({ user_id: userId, shop_id: shopId});
    return JSON.parse(JSON.stringify(review[0]));
}