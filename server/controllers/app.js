exports.getIndex = (req, res) => {
    // TODO for Backend
    res.render('index');
};

exports.getShop = (req, res) => {
    const { id } = req.params;
    res.render('shop', {
        name: id,
        type: 'ร้านก๋วยเตี๋ยว',
        rating: 4.5,
        allRatings: 120,
        reviews: 50,
        openTime: '08:00',
        closeTime: '14:00',
        location: 'ศูนย์อาหารพระจอมเกล้า (KFC)'
    });
};

exports.getShops = (req, res) => {
};