
module.exports = app =>{

    const save = async (req,res) => {
        let n = 0
        const pronunciamento = {...req.body}
        if(req.params.discursoId) pronunciamento.discursoId = req.params.D=discursoId
        
        const parFromDb = await app.db('discursocompleto')
            .where({'paragrafo':pronunciamento.paragrafo})
            .first()
            
        
    
        app.db('discursocompleto')
                .insert(pronunciamento)
                .then(_ => res.status(204).send())
    }

    const get = (req, res) => {
        app.db('discursocompleto')
            .select('paragrafo','discursoId')
            .then(texto => res.json(texto))
    }
    const getById = (req, res) => {
        app.db('discursocompleto')
            .where({ id : req.params.id})
            .first()
            .then(texto => res.json(texto))
    }

    return {save,get,getById}

}