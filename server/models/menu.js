const knex = require('../database/knex.js');
const Menu = require('../models/menu.js');

exports.getAllMenuImages = async (req, res) => {
    let menus = await knex.select('image_url').from('foods');
    return JSON.parse(JSON.stringify(menus));
};

exports.getRandomMenuImages = async (req, res) => {
    let urls = [];
    let lastestId = await Menu.findLastId();

    for (let i = 0; i < 6; i++) {
        do {
            urls[i] = Math.floor(Math.random() * lastestId) + 1;
        } while (new Set(urls).size !== urls.length);
    }
    
    let menus = JSON.parse(JSON.stringify(await knex.select('image_url').whereIn('id', urls).from('foods')));

    menus.forEach((menu, index) => {
        menu.image_url = `http://localhost:8080/assets/images/menus/${menu.image_url}.jpg`;
        menus[index] = menu;
    });

    return menus;
}

exports.findLastId = async (req, res) => {
    let lastId = await knex('foods').max('id');
    lastId = JSON.parse(JSON.stringify(lastId[0]));
    return Object.values(lastId)[0];
}

exports.findShopIdByMenuId = async (id) => {
    let shop_id = await knex('foods').select('shop_id').where({ id: id })
    shop_id = Object.values(JSON.parse(JSON.stringify(shop_id[0])))[0];
    return shop_id;
}

exports.insertFoodData = async (id, name, type, price, shop_id) => {
    if (typeof(id) == 'undefined') id = await this.findLastId() + 1; //TODO
    await knex.insert({
        id: id,
        name: name,
        type: type,
        price: price,
        image_url: `${shop_id}_${id}`,
        shop_id: shop_id
    }).into('foods');
}

exports.deleteFoodData = async (id) => {
    if (id == 0 || typeof(id) == 'undefined') id = await this.findLastId();
    knex('foods').where({ id: id }).del().then();
}

exports.updateFoodData = async (id, name, type, price , shop_id) => {
    if (id == 0 || typeof(id) == 'undefined') id = await this.findLastId();
    if (typeof(shop_id) == 'undefined') shop_id = await this.findShopIdById(id);
    knex('foods')
        .where({ id: id })
        .update({
            name: name,
            type: type,
            price: price,
            image_url: `${shop_id}_${id}`,
            shop_id: shop_id
        }).then()
}

exports.getShopLinkByMenuId = async (id) => {
    let shop_id = await this.findShopIdByMenuId(id);
    let shop_link = `https://localhost:8080/shop/${shop_id}`
    return shop_link;
}