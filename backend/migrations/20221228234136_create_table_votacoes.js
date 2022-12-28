/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('votacoes', table => {
        table.increments('id').primary()
        table.integer('codigosessaovotacao')
        table.text('descricaovotacao')
        table.string('descricaoresultado')
        table.string('siglaDescricaovoto')
        table.string('datasessao')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('votacoes')
};
