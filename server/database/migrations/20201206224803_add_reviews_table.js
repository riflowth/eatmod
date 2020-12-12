
exports.up = function(knex) {
    return knex.schema.createTable('reviews', function(table) {
        table.increments('id').primary();
        table.string('title');
        table.string('review');
        table.float('rating');        
        table.date('date');
        table.integer('food_id');
        table.string('user_id');        
        table.integer('shop_id');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('reviews');
};
