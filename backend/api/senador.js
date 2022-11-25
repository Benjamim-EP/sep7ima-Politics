

module.exports = app => {
    
   
    
    const get = (req,res) => {
        app.db('senadores')
            .select('CodigoParlamentar')
            .then(senadores => res.json(senadores))
    }


    return {get}

    
}