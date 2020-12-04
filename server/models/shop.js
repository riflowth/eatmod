const { from } = require('../database/knex');
const knex = require('../database/knex')

exports.getShops = async () => {
    let shops = await knex.select().from('shops');
    return JSON.parse(JSON.stringify(shops));
}

exports.getShop = async (id) => {
    let shop = await knex.select().from('shops').where({id:id});
    return JSON.parse(JSON.stringify(shop[0]));
}