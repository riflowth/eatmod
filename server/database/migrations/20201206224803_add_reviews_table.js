
exports.up = function(knex) {
    return knex.schema.createTable('reviews', function(table) {
        table.increments('id').primary();
        table.float('rating');
        table.integer('user_id');
        table.string('review');
        table.integer('shop_id');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('reviews');
};
