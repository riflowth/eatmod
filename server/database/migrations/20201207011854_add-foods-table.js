exports.up = function(knex) {
    return knex.schema.createTable('foods', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.string('type');
        table.integer('price');
        table.integer('shop_id');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('foods');
};