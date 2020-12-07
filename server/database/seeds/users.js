const users = [
    {   
        id: 1,
        username: 'userrrrr',
        password: '1234',
        email: 'lnwza007@gmail.com',
    },

];

exports.seed = function(knex) {
    return knex('users').del().then(function() {
        return knex('users').insert(users);
    });
};