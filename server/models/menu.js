const knex = require('../database/knex.js');
const Menu = require('../models/menu.js');

exports.convertRawDataToArray = async (rawdata) => {
    let array = [];
    for (let i = 0; i < rawdata.length; i++)
        array[i] = Object.values(JSON.parse(JSON.stringify(rawdata[i])))[0];
    return array;
}

exports.convertRawDataToValue = async (rawdata) => {
    let value = Object.values(JSON.parse(JSON.stringify(rawdata[0])))[0]
    return value;
}

exports.convertRawDataToObject = async (rawdata) => {
    let object = JSON.parse(JSON.stringify(rawdata))
    return object;
}

exports.findMenusById = async (id) => {
    let foods = await knex.select().from('foods').whereIn('id', id);
    return this.convertRawDataToObject(foods);
}

exports.findMenusByshopId = async (shop_id) => {
    let foods = await knex.select().from('foods').whereIn('shop_id', shop_id);
    return this.convertRawDataToObject(foods);
}

exports.findLastId = async (req, res) => {
    let lastId = await knex('foods').max('id');
    return this.convertRawDataToValue(lastId)
}

exports.findShopIdByMenuId = async (id) => {
    let shopId = await knex('foods').select('shop_id').where({ id: id });
    return this.convertRawDataToValue(shopId);
}

exports.findPriceRangeByShopId = async (shop_id) => {
    let result = []
    let price = await knex('foods').select('price').where({ shop_id: shop_id });
    price = await this.convertRawDataToArray(price);
    result[0] = Math.min(...price);
    result[1] = Math.max(...price);
    return result;
}

exports.findMenuIdByShopId = async (shop_id) => {
    let menuId = await knex('foods').select('id').where({ shop_id: shop_id });
    return this.convertRawDataToArray(menuId);
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

exports.findMenuImagesById = async (id) => {
    let image = {
        menu_id: id,
        shop_url: await this.findShopLinkByMenuId(id),
        image_url: await this.findImageUrlByMenuId(id)
    };
    return image;
}

exports.findMenuTagByMenuId = async (id) => {
    let tag = await knex('foods').select('tag').where({ id: id });
    tag = await this.convertRawDataToValue(tag);
    return tag.split(',');
}

exports.findMenuIdByTag = async (tag) => {
    let menuId = [];
    let lastId = await this.findLastId();

    for (let i = 1, k = 0; i < lastId; i++) {
        let comparer = await this.findMenuTagByMenuId(i);
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
    let menus;
    menuId = await this.findMenuIdByTag(tag);
    menus = await this.findMenusById(menuId);
    return menus;
}

exports.getAllMenus = async () => {
    return knex.select().from('foods');
}

exports.getAllMenusByShopId = async (shopId) => {
    let foods = await knex.select().from('foods').where({ shop_id: shopId });
    return JSON.parse(JSON.stringify(foods));
}

exports.getRecomMenuImagesByShopId = async (shop_id) => {
    let shopId = await this.findMenuIdByShopId(shop_id);
    let recomMenuImages = [];

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
    if (id === undefined) id = await this.findLastId() + 1;

    knex.insert({
        id: id,
        name: name,
        type: type,
        price: price,
        shop_id: shop_id
    })
    .into('foods')
    .then(row => {
        console.log(`Insert new food data, it currently has ${row} records`)
    })
    .catch(error => {
        console.error(`Can't insert new food data ${name} id:${id} : ${error}`)
    });
}

exports.deleteFoodData = async (id) => {
    if (id == 0 || id === undefined) id = await this.findLastId();

    knex('foods')
        .where({ id: id })
        .del()
        .then(() => {
            console.log(`Delete food data id ${id} successfully`);
        })
        .catch(error => {
            console.error(`Can't delete food data id ${id} : ${error}`);
        });
}

exports.updateFoodData = async (id, name, type, price, shop_id) => {
    if (id == 0 || id === undefined) id = await this.findLastId();
    if (shop_id === undefined) shop_id = await this.findShopIdByMenuId(id);

    knex('foods')
        .where({ id: id })
        .update({
            name: name,
            type: type,
            price: price,
            shop_id: shop_id
        })
        .then(() => {
            console.log(`Update food data id ${id} successfully`);
        })
        .catch(error => {
            console.error(`Can't update food data id ${id} : ${error}`);
        })
}