
exports.up = function(knex) {
    return knex.schema.createTable('reviews', function(table) {
        table.increments('id').primary();
        table.string('rating');
        table.string('user_id');
        table.time('review');
        table.time('shop_id');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('reviews');
};
