let shops = {
    1: {
        name: 'a',
        type: 'fast food',
        open: '10am'
    },
    2: {
        name: 'b',
        type: 'noodle',
        open: '10am',
    }
}

exports.getShops = (req, res) => {
    return shops
};

exports.getShopById = (req, res) => {
    // TODO
};