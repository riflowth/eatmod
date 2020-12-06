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

exports.insertFoodData = async (id,name,type,price,shop_id) => {
    if(id == 0){
        x = await this.findLastId();
        id = x + 1;
    }
    await knex.insert({
        id:id,
        name:name,
        type:type,
        price:price,
        image_url:`link${id}`,
        shop_id:shop_id
    }).into('foods');

}

exports.deleteFoodData = async (id) => {
    if(id == 0){ id = await this.findLastId() }
    await knex('foods')
    .where({ id: id })
    .del()
}

exports.updateFoodData = async (id,name,type,price,image_url,shop_id) => {
    if(id == 0){ id = await this.findLastId() }
    await knex('foods')
    .where({ id: id })
    .update({ 
        name:name,
        type:type,
        price:price,
        image_url:image_url,
        shop_id:shop_id })
}

/*
//แยกส่วน (ใช้แบบรวมดีกว่า)
exports.insertFoodId = async () => {
    x = await this.findLastId()
    await knex('foods').insert({ id: x+1 })
}

exports.insertFoodName = async (name) => {
    x = await this.findLastId()
    await knex('foods').where({ id:x }).update({ name: name })
}

exports.insertFoodType = async (type) => {
    x = await this.findLastId()
    await knex('foods').where({ id: x }).update({ type: type })
}

exports.insertFoodPrice = async (price) => {
    x = await this.findLastId()
    await knex('foods').where({ id: x }).update({ price: price })
}

exports.insertFoodUrl = async () => {
    x = await this.findLastId()
    let insertUrl = `link${x}`;
    await knex('foods').where({ id: x }).update({ image_url: insertUrl })
}

exports.insertFoodShopId = async (shop_id) => {
    x = await this.findLastId()
    await knex('foods').where({ id: x }).update({ shop_id: shop_id })
}
*/