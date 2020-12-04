const shop = require('../models/shop')



exports.getIndex = async (req, res) => {
    // TODO
    let shops = await shop.getShops();
    res.render(
        'index', {
           recommendMenus: [],
           recommendShops: shops
        }
    );
};
