
exports.up = function(knex, Promise) {
    return knex.schema.createTable('senadores', table => {
        table.increments('id').primary()
        table.integer('codigoparlamentar').notNull()
        table.string('nomeparlamentar').notNull()
        /*table.integer('CodigoPublicoNaLegAtual')
        table.string('NomeCompletoParlamentar')
        table.string('SexoParlamentar')
        table.string('FormaTratamento')
        table.string('UrlFotoParlamentar')
        table.string('UrlPaginaParlamentar')
        table.string('UrlPaginaParticular')
        table.string('EmailParlamentar')
        table.string('UF-mandato')*/
        
        

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('senadores')
};
