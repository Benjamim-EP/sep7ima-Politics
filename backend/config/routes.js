
module.exports = app => {
    app.route('/senadores')
        .post(app.api.senador.save)
        .get(app.api.senador.get)

    app.route('/senadores/:codigoparlamentar')
        .put(app.api.senador.save)
        .get(app.api.senador.getById)

}