const knex = require('../database/knex');

exports.getShops = async () => {
    return knex.select().from('shops');
}

exports.getShop = async (id) => {
    return knex
        .select()
        .from('shops')
        .where({ id: id }).first();
}

exports.getReviews = async (shopId) => {
    return knex
        .select('id', 'rating', 'review', 'title', 'date', 'food_id', 'user_id')
        .from('reviews')
        .where({ shop_id: shopId });
}

exports.writeReview = async (title, review, rating, date, foodId, userId, shopId) => {
    return knex
        .insert({
            title: title,
            review: review,
            rating: rating,
            date: date,
            food_id: foodId,
            user_id: userId,
            shop_id: shopId
        }).into('reviews');
}

// TODO: error handling
exports.updateReview = async (title, review, rating, date, foodId, id) => {
    await knex('reviews')
        .update({
            title: title,
            review: review,
            rating: rating,
            date: date,
            food_id: foodId
        })
        .where({ id : id });
}

// TODO: error handling
exports.deleteReview = async (id) => {
    await knex('reviews')
        .del()
        .where({ id: id });
}

exports.getReview = async (id) => {
    return knex('reviews')
        .select('rating', 'review', 'title', 'date', 'food_id',' user_id')
        .where({ id: id })
        .first();
}

exports.calculateRating = async (reviews) => {
    if (reviews.length == 0) return [0, 0];

    const ratingSum = reviews.reduce((acc, value) => acc + value.rating, 0);
    const rating = Math.floor(ratingSum / reviews.length);
    
    return [ rating, ratingSum ];
};

exports.fillInformation = async (shop) => {
    const reviews = await this.getReviews(shop.id);
    let [rating, ratingSum] = await this.calculateRating(reviews);
    
    shop.ratingSum = ratingSum;
    shop.rating    = rating;
    shop.review    = reviews.length;
    shop.reviewUrl = `/shop/${shop.id}`;
    shop.imgUrl    = `/assets/images/shops/${shop.id}.jpg`;
}