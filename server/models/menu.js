const { where } = require('../database/knex.js');
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
            console.log(urls[i]);
        } while (new Set(urls).size !== urls.length);
    }

    let menus = await knex.select('image_url').whereIn('id', urls).from('foods');
    return JSON.parse(JSON.stringify(menus));
}

exports.findLastId = async (req, res) => {
    let lastId = await knex('foods').max('id');
    lastId = JSON.parse(JSON.stringify(lastId[0]));
    return Object.values(lastId)[0];
}

exports.insertFoodData = async (id, name, type, price, shop_id) => {
    if (id == undefined) id = await this.findLastId() + 1; //TODO
    await knex.insert({
        id: id,
        name: name,
        type: type,
        price: price,
        image_url: `../../public/images/menus/shopid${shop_id}_menu${id}`,
        shop_id: shop_id
    }).into('foods');
}

exports.deleteFoodData = async (id) => {
    if (id == 0 || id == undefined) id = await this.findLastId();
    await knex('foods').where({ id: id }).del(); //มันต้องมีawaitอะ ไม่งั้นก็ไม่ลบ ไม่รู้ทำไม
}

exports.updateFoodData = async (id, name, type, price , shop_id) => {
    if (id == 0 || id == undefined) id = await this.findLastId();
    await knex('foods') //นี่ก็ด้วยยย
        .where({ id: id })
        .update({
            name: name,
            type: type,
            price: price,
            image_url: `../../public/images/menus/shopid${shop_id}_menu${id}`,
            shop_id: shop_id
        });
}
//TODO
exports.getShopLinkByImage = async (id) => {
    let shop_id = await knex('foods').select('shop_id').where({ id: id })
    shop_id = Object.values(JSON.parse(JSON.stringify(shop_id[0])))[0];
    let shop_link = `http://localhost:8080/shop/${shop_id}`
    console.log(shop_link);
    return shop_link;
}