exports.up = function(knex) {
    return knex.schema.createTable('shops', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.string('location');
        table.string('type');
        table.time('open');
        table.time('close');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('shops');
};
