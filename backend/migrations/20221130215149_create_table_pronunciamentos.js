
exports.up = function(knex, Promise) {
    return knex.schema.createTable('pronunciamentos', table => {
        table.increments('id').primary()
        table.string('data')
        table.string('resumo')
        table.string('indexacao')
        table.integer('codigoparlamentar')
        table.integer('codigopronunciamento').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pronunciamentos')
};
