const knex = require('../database/knex.js');
const Menu = require('../models/menu.js');

exports.findMenusById = async (id) => {
    let foods = await knex.select().from('foods').whereIn('id', id);
    return JSON.parse(JSON.stringify(foods));
}

exports.findLastId = async (req, res) => {
    let lastId = await knex('foods').max('id');
    lastId = JSON.parse(JSON.stringify(lastId[0]));
    return Object.values(lastId)[0];
}

exports.findShopIdByMenuId = async (id) => {
    let shopId = await knex('foods').select('shop_id').where({ id: id });
    return Object.values(JSON.parse(JSON.stringify(shopId[0])))[0];
}

exports.findImageUrlByMenuId = async (id) => {
    let shop_id = await this.findShopIdByMenuId(id);
    image_url = `/assets/images/menus/${shop_id}_${id}.jpg`;
    return image_url;
};

exports.findShopLinkByMenuId = async (id) => {
    let shop_id = await this.findShopIdByMenuId(id);
    let shop_link = `/shop/${shop_id}`;
    return shop_link;
}

exports.findMenuIdByShopId = async (shop_id) => {
    let menuId = [];
    menuId = await knex('foods').select('id').where({ shop_id: shop_id });
    for (i = 0, length = menuId.length; i < length; i++) {
        menuId[i] = Object.values(JSON.parse(JSON.stringify(menuId[i])))[0];
    }
    return menuId;
}

exports.findMenuImagesById = async (id) => {
    let image = {
        shop_url: await this.findShopLinkByMenuId(id),
        image_url: await this.findImageUrlByMenuId(id)
    };
    return image;
}

exports.findMenuTagByMenuId = async (id) => {
    let tag = await knex('foods').select('tag').where({ id: id });
    tag = (Object.values(JSON.parse(JSON.stringify(tag[0])))[0]).split(',')
    return tag
}

exports.findMenuIdByTag = async (tag) => {
    let menuId = [];
    let lastId = await this.findLastId()

    for (let i = 1, k = 0; i < lastId; i++) {
        let comparer = await this.findMenuTagByMenuId(i)
        let difference = tag.filter(x => !comparer.includes(x));

        for (let j = 0; j < comparer.length; j++) {
            if (difference.length == 0) {
                menuId[k] = i;
                k++;
                break;
            }
        }
    }
    return menuId;
}

exports.getMenusByTag = async (tag) => {
    let menus
    menuId = await this.findMenuIdByTag(tag)
    menus = await this.findMenusById(menuId)
    return menus;
}

exports.getAllMenus = async () => {
    let foods = await knex.select().from('foods');
    return JSON.parse(JSON.stringify(foods));
}

exports.getMenuImagesById = async (id) => {
    let image = [];
    image[0] = await this.findImageUrlByMenuId(id);
    return image;
}

exports.getRecomMenuImagesByShopId = async (shop_id) => {
    let shopId = [];
    let recomMenuImages = [];
    shopId = await this.findMenuIdByShopId(shop_id);

    for (let i = 0; i < shopId.length; i++) {
        recomMenuImages[i] = await this.findImageUrlByMenuId(shopId[i]);
    }

    return recomMenuImages;
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
    if (typeof (id) == 'undefined') id = await this.findLastId() + 1;
    await knex.insert({
        id: id,
        name: name,
        type: type,
        price: price,
        shop_id: shop_id
    }).into('foods');
}

exports.deleteFoodData = async (id) => {
    if (id == 0 || typeof (id) == 'undefined') id = await this.findLastId();
    knex('foods').where({ id: id }).del().then();
}

exports.updateFoodData = async (id, name, type, price, shop_id) => {
    if (id == 0 || typeof (id) == 'undefined') id = await this.findLastId();
    if (typeof (shop_id) == 'undefined') shop_id = await this.findShopIdByMenuId(id);
    knex('foods')
        .where({ id: id })
        .update({
            name: name,
            type: type,
            price: price,
            shop_id: shop_id
        }).then();
}