

module.exports = app => {
    
    const save = async (req,res) => {
        const parlamentar = { ...req.body }
        
        if(req.params.codigoparlamentar) parlamentar.codigoparlamentar = req.params.codigoparlamentar
        
        const parFromDB = await app.db('senadores')
                        .where({codigoparlamentar: parlamentar.codigoparlamentar}).first()

        if(!parFromDB){
            app.db('senadores')
                .insert(parlamentar)
                .then(_ => res.status(204).send())
            }
    }
    
    const get = (req,res) => {
        app.db('senadores')
            .select('nomeparlamentar','codigoparlamentar')
            .then(senadores => res.json(senadores))
    }

    const getById = (req, res) => {
        app.db('senadores')
            .select('codigoparlamentar')
            .where({codigoParlamentar: req.params.codigoparlamentar})
            .first()
    }

    return {save,get,getById}

    
}