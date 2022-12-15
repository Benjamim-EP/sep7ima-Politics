
exports.up = function(knex, Promise) {
    return knex.schema.createTable('discursocompleto', table => {
        table.increments('id').primary()
        table.text('paragrafo')
        table.integer('discursoId')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('discursocompleto')
};
