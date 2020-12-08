exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.string('id').primary().unique();
        table.string('display_name');
        table.string('provider');
        table.string('email');
        table.string('password');
        table.datetime('registered_date');
    });
};


exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
