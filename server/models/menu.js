const knex = require('../database/knex.js');
const Menu = require('../models/menu.js');

exports.convertRawDataToArray = (rawdata) => {
    let array = [];
    for (let i = 0; i < rawdata.length; i++)
        array[i] = Object.values(JSON.parse(JSON.stringify(rawdata[i])))[0];
    return array;
}

exports.convertRawDataToValue = (rawdata) => {
    return Object.values(JSON.parse(JSON.stringify(rawdata[0])))[0];
}

exports.findMenusById = async (id) => {
    return knex
        .select()
        .from('foods')
        .whereIn('id', id)
}

exports.findLastId = async () => {
    return (await knex('foods')
        .max('id as id')
        .first())
        .id
}

exports.findShopIdByMenuId = async (id) => {
    return (await knex('foods')
        .select('shop_id')
        .where({ id: id })
        .first())
        .shop_id
}

exports.findPriceRangeByShopId = async (shop_id) => {
    let allPrices = await knex('foods').select('price').where({ shop_id: shop_id });
    allPrices = this.convertRawDataToArray(allPrices);
    return [Math.min(...allPrices), Math.max(...allPrices)];
}

exports.findMenuIdsByShopId = async (shop_id) => {
    const menuIds = await knex('foods').select('id').where({ shop_id: shop_id });
    return this.convertRawDataToArray(menuIds);
}

exports.findImageUrlByMenuId = async (id) => {
    const shopId = await this.findShopIdByMenuId(id);
    return `/assets/images/menus/${shopId}_${id}.jpg`;;
};

exports.findShopLinkByMenuId = async (id) => {
    const shopId = await this.findShopIdByMenuId(id);
    return `/shop/${shopId}`;
}

exports.findMenuImagesById = async (id) => {
    return {
        menu_id: id,
        shop_url: await this.findShopLinkByMenuId(id),
        image_url: await this.findImageUrlByMenuId(id)
    };
}

exports.findMenuTagByMenuId = async (id) => {
    const tag = await knex('foods').select('tag').where({ id: id });
    return (await this.convertRawDataToValue(tag)).split(',');
}

exports.findMenuIdByTag = async (tag) => {
    const menuId = [];
    const lastId = await this.findLastId();

    for (let i = 1, k = 0; i < lastId; i++) {
        let comparers = await this.findMenuTagByMenuId(i);
        let difference = tag.filter(x => !comparers.includes(x));

        for (const comparer of comparers) {
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
    const menuId = await this.findMenuIdByTag(tag);
    const menus = await this.findMenusById(menuId);
    return menus;
}

exports.getAllMenus = async () => {
    return knex.select().from('foods');
}

exports.getAllMenusByShopId = async (shopId) => {
    const foods = await knex.select().from('foods').where({ shop_id: shopId });
    return JSON.parse(JSON.stringify(foods));
}

exports.getRecomMenuImagesByShopId = async (shop_id) => {
    const shopId = await this.findMenuIdsByShopId(shop_id);
    const recomMenuImages = [];

    for (let i = 0; i < shopId.length; i++) {
        recomMenuImages[i] = await this.findImageUrlByMenuId(shopId[i]);
    }

    return recomMenuImages;
}

exports.getRandomMenuImages = async (req, res) => {
    const randomMenuId = [];
    const maxMenus = await Menu.findLastId();
    const MAXIMUM_RANDOM_MENU = 6;
    
    for (let i = 0; i < MAXIMUM_RANDOM_MENU; i++) {
        do {
            randomMenuId[i] = Math.floor(Math.random() * maxMenus) + 1;
        } while (new Set(randomMenuId).size !== randomMenuId.length);
    }

    const randomMenus = [];
    for (let i = 0; i < MAXIMUM_RANDOM_MENU; i++) {
        let menuId = randomMenuId[i];
        randomMenus[i] = await this.findMenuImagesById(menuId);
    }

    return randomMenus;
}

exports.insertFoodData = async (id, name, type, price, shop_id) => {
    if (id === undefined) id = await this.findLastId() + 1;

    knex
        .insert({
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