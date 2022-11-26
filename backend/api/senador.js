

module.exports = app => {
    
    const save = async (req,res) => {
        const parlamentar = {...req.body}
        if(req.params.codigoParlamentar) parlamentar.codigoParlamentar = req.params.codigoParlamentar
        
        app.db('senadores')
            .insert(parlamentar)
            .then(_ => res.status(204).send())
    }
    
    const get = (req,res) => {
        app.db('senadores')
            .select('codigoparlamentar')
            .then(senadores => res.json(senadores))
    }

    const getById = (req, res) => {
        console.log(req.params)
        app.db('senadores')
            .select('codigoparlamentar')
            .where({codigoParlamentar: req.params.codigoParlamentar})
            .first()
    }

    return {save,get,getById}

    
}