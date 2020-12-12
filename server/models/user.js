const knex = require('../database/knex');

exports.getOrCreate = async (profile, cb) => {
    const { id, provider, displayName } = profile;

    try {
        let isUserAvailable = await this.findId(id);
        if (!isUserAvailable) {
            try {
                await knex.insert({
                    id: id,
                    display_name: displayName,
                    provider: provider,
                    email: '',
                    password: '',
                    registered_date: new Date()
                }).into('users');

                cb(null, profile);
            } catch (err) {
                cb(err, profile);
            }
        } else {
            cb(null, profile);
        }
    } catch (err) {
        cb(err, profile);
    }
};

exports.getById = async (id, data) => {
    let user = await knex.select(data).from('users').where({ id: id });
    return JSON.parse(JSON.stringify(user[0]));
};

exports.findId = async (id) => {
    return JSON.parse(JSON.stringify(await knex.select('id').from('users').where({ id: id })))[0];
};