
exports.up = function(knex, Promise) {
    return knex.schema.createTable('senadores', table => {
        table.increments('id').primary()
        table.integer('CodigoParlamentar').notNull()
        table.integer('CodigoPublicoNaLegAtual').notNull()
        table.string('NomeParlamentar')
        table.string('NomeCompletoParlamentar')
        table.string('SexoParlamentar')
        table.string('FormaTratamento')
        table.string('UrlFotoParlamentar')
        table.string('UrlPaginaParlamentar')
        table.string('UrlPaginaParticular')
        table.string('EmailParlamentar')
        

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('senadores')
};
