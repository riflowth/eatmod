const knex = require('../database/knex.js');
const Menu = require('../models/menu.js');

exports.findLastId = async (req, res) => {
    let lastId = await knex('foods').max('id');
    lastId = JSON.parse(JSON.stringify(lastId[0]));
    return Object.values(lastId)[0];
}

exports.findShopIdByMenuId = async (id) => {
    let shopId = await knex('foods').select('shop_id').where({ id: id })
    return Object.values(JSON.parse(JSON.stringify(shopId[0])))[0];
}

exports.findImageUrlByMenuId = async (id) => {
    let shop_id = await this.findShopIdByMenuId(id);
    image_url = `./assets/images/menus/${shop_id}_${id}.jpg`;
    return image_url;
};

exports.findShopLinkByMenuId = async (id) => {
    let shop_id = await this.findShopIdByMenuId(id);
    let shop_link = `./shop/${shop_id}`;
    return shop_link;
}

exports.findMenuImagesById = async (id) => {
    let image = {
        shop_url: await this.findShopLinkByMenuId(id),
        image_url: await this.findImageUrlByMenuId(id) 
    };
    return image;
}

exports.getMenuImagesById = async (id) => {
    let image = [];
    image[0] = this.findImageUrlByMenuId(id);
    return image;
}

exports.getRandomMenuImages = async (req, res) => {
    let randomMenuId = [];
    let maxMenus = await Menu.findLastId();
    for (let i = 0; i < 6; i++) {
        do {
            randomMenuId[i] = Math.floor(Math.random() * maxMenus) + 1;
        } while (new Set(randomMenuId).size !== randomMenuId.length);
    }

    let randomMenus = [];
    for (let i = 0; i < 6; i++) {
        let menuId = randomMenuId[i];
        randomMenus[i] = await this.findMenuImagesById(menuId);
    }
    return randomMenus;
}

exports.insertFoodData = async (id, name, type, price, shop_id) => {
    if (typeof(id) == 'undefined') id = await this.findLastId() + 1; 
    await knex.insert({
        id: id,
        name: name,
        type: type,
        price: price,
        shop_id: shop_id
    }).into('foods');
}

exports.deleteFoodData = async (id) => {
    if (id == 0 || typeof(id) == 'undefined') id = await this.findLastId();
    knex('foods').where({ id: id }).del().then();
}

exports.updateFoodData = async (id, name, type, price , shop_id) => {
    if (id == 0 || typeof(id) == 'undefined') id = await this.findLastId();
    if (typeof(shop_id) == 'undefined') shop_id = await this.findShopIdByMenuId(id);
    knex('foods')
        .where({ id: id })
        .update({
            name: name,
            type: type,
            price: price,
            shop_id: shop_id
        }).then();
}