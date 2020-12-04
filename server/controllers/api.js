const Shop = require('../models/shop');

exports.writeReview = (req, res) => {
    let review = req.body.review;
    let userId = 1;
    let rating = req.body.rating;
    let shopId = req.body.shopId;
    Shop.writeReview(rating,userId,review,shopId);
    
    res.status(201).json({ success: true });
};