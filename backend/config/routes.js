
module.exports = app => {
    app.route('/senadores')
        .get(app.api.senador.get)

}