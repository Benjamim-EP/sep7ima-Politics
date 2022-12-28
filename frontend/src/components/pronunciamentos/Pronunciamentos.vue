<template>
  <div>
    <h1>Pronunciamentos</h1>
    <b-button variant="primary" @click="update">Atualizar</b-button>
    
</div>
</template>

<script>
import axios from 'axios'

let baseApiUrl = "http://localhost:3000"

export default {
    name: 'Pronunciamentos',
    data: function(){
        return {
            range:{inicio:'2018',fim:'2022'},
            pronunciamentos : {},
            textoscompletos : {}
        }
    },
    methods:{
        async update(){
            let Url = 'https://legis.senado.leg.br/dadosabertos/plenario/lista/discursos'
            const response = await fetch(Url+'/2018'+'02'+'01'+'/2018'+'03'+'01') // AAAAMMDD
            let data = await response.text()

            let parser = new DOMParser(),
                xmlDoc = parser.parseFromString(data,'text/xml')

            let temp = [...xmlDoc.getElementsByTagName('Pronunciamento')]


           

            this.pronunciamentos = temp.map((valores) => {

                let codigoparlamentar = valores.getElementsByTagName('CodigoParlamentar')[0]
                
                let pronunciamento = {"data" :valores.getElementsByTagName('Data')[0].innerHTML,
                        "resumo": valores.getElementsByTagName('Resumo')[0].innerHTML,
                        "indexacao": valores.getElementsByTagName('Indexacao')[0].innerHTML,
                        "codigoparlamentar":  codigoparlamentar ? codigoparlamentar.innerHTML: undefined,
                        "codigopronunciamento": valores.getElementsByTagName('CodigoPronunciamento')[0].innerHTML,
                        "textointegralurl": valores.getElementsByTagName('TextoIntegral')[0].innerHTML
                }
                
                const method = pronunciamento.codigopronunciamento? 'put':'post'
                const codigopronunciamento = pronunciamento.codigopronunciamento? `/${pronunciamento.codigopronunciamento}`:''
                
                axios[method](`${baseApiUrl}/pronunciamentos${codigopronunciamento}`,pronunciamento)
                return pronunciamento

            })
            
           
        },
        async loadPronunciamentos() {
            const url = `${baseApiUrl}/pronunciamentos`
            this.pronunciamentos = (await axios.get(url)).data
            let a = this.fetchTextoCompleto() // retorna um array de promises
            a.then((b) => this.textoToDb(b) )
            console.log(this.pronunciamentos.length)
            
        },

        async fetchTextoCompleto(){
            let paragrafos = this.pronunciamentos.map(async (valor)=>{

                const resposta= await fetch(valor.textointegralurl)
                let dados= await resposta.text()

                let parsar = new DOMParser(),
                    htmlDoc = parsar.parseFromString(dados,'text/html')
                    
                let div = htmlDoc.getElementsByClassName('texto-integral')
                let p = div[0].querySelectorAll('p')
                let p2 = Array.from(p)
                return [p2,valor.codigopronunciamento]
                
            })
            return paragrafos
        
        },
        textoToDb(a){
            a.map((b)=> {
                b.then(c=>{return c})
                .then(d=>{
                    //console.log(d[0].length)
                    d[0].map((valor)=>{

                        let completo = {"discursoId":d[1],"paragrafo":valor.textContent}
                        this.textoscompletos[completo.discursoId] = completo 
                        const method = valor.codigopronunciamento? 'put':'post'
                        const codigopronunciamento = valor.codigopronunciamento? `/${valor.codigopronunciamento}`:''
                        console.log(completo)
                        axios[method](`${baseApiUrl}/textocompleto${codigopronunciamento}`,completo)
                    })
                            
                })
            })
        }
    },
    mounted(){
        this.loadPronunciamentos()
        
    }

}
</script>

<style>

</style>