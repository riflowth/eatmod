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
    let reviews = await knex.select('id', 'rating', 'review','title','date','food_id','user_id').from('reviews').where({ shop_id: shopId });
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

exports.updateReview = async (title, review, rating, date, foodId, id) => {
    await knex('reviews').update({
        title: title,
        review: review,
        rating: rating,
        date: date,
        food_id: foodId
    }).where({ id : id });
}

exports.deleteReview = async (id) => {
    await knex('reviews').del().where({ id: id });
}

exports.getReview = async (id) => {
    let review = await knex('reviews').select('rating', 'review','title','date','food_id','user_id').where({ id: id});
    return JSON.parse(JSON.stringify(review[0]));
}