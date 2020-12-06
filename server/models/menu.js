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

exports.insertFoodData = async (id,name,type,price,shop_id) => {
    await knex.insert({
        id:id,
        name:name,
        type:type,
        price:price,
        image_url:`link${id}`, // TODO
        shop_id:shop_id
    }).into('foods');
}

exports.deleteFoodData = async (id) => {
    if (id == 0) id = await this.findLastId();
    knex('foods').where({ id: id }).del();
}

exports.updateFoodData = async (id,name,type,price,image_url,shop_id) => {
    if (id == 0) id = await this.findLastId();
    knex('foods')
        .where({ id: id })
        .update({ 
            name: name,
            type: type,
            price: price,
            image_url: image_url,
            shop_id: shop_id 
        });
}