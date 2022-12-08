
exports.up = function(knex, Promise) {
    return knex.schema.createTable('pronunciamentos', table => {
        table.increments('id').primary()
        table.string('data')
        table.string('resumo',2048)
        table.string('indexacao',2048)
        table.integer('codigoparlamentar')
        table.integer('codigopronunciamento').notNull()
        table.string('textointegral')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pronunciamentos')
};
