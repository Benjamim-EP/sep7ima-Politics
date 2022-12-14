
module.exports = app =>{

    const save = async (req,res) => {
        const pronunciamento = {...req.body}
        if(req.params.codigopronunciamento) pronunciamento.codigopronunciamento = req.params.codigopronunciamento
        
        const pronFromDB = await app.db('pronunciamentos')
                            .where({codigopronunciamento: pronunciamento.codigopronunciamento}).first()
        
        if(!pronFromDB){
            app.db('pronunciamentos')
                .insert(pronunciamento)
                .then(_ => res.status(204).send())
        }
    }

    const get = (req, res) => {
        app.db('pronunciamentos')
            .select('codigopronunciamento','indexacao','data','resumo','codigoparlamentar','textointegralurl','textointegral')
            .then(pronunciamentos => res.json(pronunciamentos))
    }
    const getById = (req, res) => {
        app.db('pronunciamentos')
            .where({ codigopronunciamento: req.params.codigopronunciamento})
            .first()
            .then(pronunciamento => res.json(pronunciamento))
    }

    return {save,get,getById}

}