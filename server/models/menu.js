let knex = require('../database/knex.js');
let database = require('../models/database.js');

exports.getAllMenuImages = async (req, res) => {
    let menus = await knex.select('image_url').from('foods');
    return JSON.parse(JSON.stringify(menus));
};

exports.getRandomMenuImages = async (req, res) => {
    let arrayUrl = [];
    let x = await database.findLastId();
    for(i = 0; i < 6; i++)
        do{
           arrayUrl[i] = Math.floor(Math.random() * x)+1;
           console.log(arrayUrl[i]);
        } while(new Set(arrayUrl).size !== arrayUrl.length);

    let menus = await knex.select('image_url').whereIn('id', arrayUrl).from('foods');
    return JSON.parse(JSON.stringify(menus));
}

/*old data
exports.getMenuSpecific = (x, req, res) => {
   
knex.select('image_url').from('foods').whereIn('id', x).then((rows) => {
    for (row of rows) {
        result = console.log(row.image_url);//ชั่วคราวๆ
    }

    return result;

})};

exports.getMenuRandom = async (req, res) => {
    let i = Math.floor(Math.random() * 6);
    result = getMenuSpecific([i]);
    return result;
};
*/