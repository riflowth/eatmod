const knex = require('../database/knex');

exports.getShops = async () => {
    return knex.select().from('shops');
}

exports.getShop = async (id) => {
    return knex
        .select()
        .from('shops')
        .where({ id: id })
        .first();
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
        })
        .into('reviews');
}

exports.updateReview = async (title, review, rating, date, foodId, id) => {
    knex('reviews')
        .update({
            title: title,
            review: review,
            rating: rating,
            date: date,
            food_id: foodId
        })
        .where({ id : id })
        .then(() => {
            console.log(`Update review id ${id}`);
        })
        .catch(error => {
            console.error(`Can't update review id ${id} : ${error}`);
        });
}

exports.deleteReview = async (id) => {
    knex('reviews')
        .del()
        .where({ id: id })
        .then(() => {
            console.log(`Delete review id ${id}`);
        })
        .catch(error => {
            console.error(`Can't delete review id ${id} : ${error}`);
        });
}

exports.getReview = async (id) => {
    return knex('reviews')
        .select('rating', 'review', 'title', 'date', 'food_id', 'user_id')
        .where({ id: id })
        .first();
}

exports.calculateRating = (reviews) => {
    if (reviews.length == 0) return [0, 0];

    const ratingSum = reviews.reduce((acc, value) => acc + value.rating, 0);
    const rating = Math.floor(ratingSum / reviews.length);
    
    return [ rating, ratingSum ];
};

exports.fillInformation = async (shop) => {
    const reviews = await this.getReviews(shop.id);
    let [rating, ratingSum] = this.calculateRating(reviews);
    
    shop.ratingSum = ratingSum;
    shop.rating    = rating;
    shop.review    = reviews.length;
    shop.reviewUrl = `/shop/${shop.id}`;
    shop.imgUrl    = `/assets/images/shops/${shop.id}.jpg`;
}