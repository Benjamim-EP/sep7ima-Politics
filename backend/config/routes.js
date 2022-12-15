
module.exports = app => {
    app.route('/senadores')
        .post(app.api.senador.save)
        .get(app.api.senador.get)

    app.route('/senadores/:codigoparlamentar')
        .put(app.api.senador.save)
        .get(app.api.senador.getById)

    app.route('/pronunciamentos')
        .post(app.api.pronunciamento.save)
        .get(app.api.pronunciamento.get)
    
    app.route('/pronunciamentos/:codigopronunciamento')
        .put(app.api.pronunciamento.save)
        .get(app.api.pronunciamento.getById)
    
    app.route('/textocompleto')
        .post(app.api.textocompleto.save)
        .get(app.api.textocompleto.get)
    
    app.route('/textocompleto/:discursoId')
        .put(app.api.textocompleto.save)
        .get(app.api.textocompleto.getById)
    
}