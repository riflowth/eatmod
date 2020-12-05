let knex = require('../database/knex.js');






exports.findLastId = async (req, res) => {

    lastId = await knex('foods').max('id')
    lastId = JSON.stringify(lastId)
    lastId = lastId.replace(/\D/g, "");
    lastId = parseInt(lastId);
    //nextId = lastId + 1;
    //console.log(nextId);
    return lastId;
    
}

exports.insertFoodId = async (req, res) => {
    x = await this.findLastId()
    await knex('foods').insert({ id: x+1 })
}

exports.insertFoodName = async (req, res) => {
    let insertName = "ข้าวคลุกน้ำปลา";
    x = await this.findLastId()
    await knex('foods').where({ id:x }).update({ name: insertName })
}

exports.insertFoodType = async (req, res) => {
    let insertType = "food";
    x = await this.findLastId()
    await knex('foods').where({ id: x }).update({ type: insertType })
}

exports.insertFoodPrice = async (req, res) => {
    let insertPrice = 2000000;
    x = await this.findLastId()
    await knex('foods').where({ id: x }).update({ price: insertPrice })
}

exports.insertFoodUrl = async (req, res) => {
    
    x = await this.findLastId()
    let insertUrl = `link${x}`;
    await knex('foods').where({ id: x }).update({ image_url: insertUrl })
}

exports.insertFoodShopId = async (req, res) => {
    let insertShopId = 7;
    x = await this.findLastId()
    await knex('foods').where({ id: x }).update({ shop_id: insertShopId })
}

//
// 
//
