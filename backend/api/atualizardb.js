
const url = "https://legis.senado.leg.br/dadosabertos/senador/"

async function getAllSenators(componente){
    
    const response = await fetch(url + componente);
    let data = await response.text()
    
    let parser = new DOMParser(),
        xmlDoc = parser.parseFromString(data,'text/xml')
    
    let parlamentares = xmlDoc.getElementsByTagName('Parlamentar')
    
    console.log(parlamentares[0])
        
}




//getAllSenators("lista/atual")