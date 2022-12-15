<template>
  <div>
    <h1>Pronunciamentos</h1>
    <b-button variant="primary" @click="update">Atualizar</b-button>
    <b-button variant="primary" @click="fetchTextoCompleto">Texto completo</b-button>
    
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
            const response = await fetch(Url+'/2018'+'02'+'01'+'/2018'+'02'+'05') // AAAAMMDD
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
            this.fetchTextoCompleto()


        },
        fetchTextoCompleto(){
            console.log(this.pronunciamentos.length)
            this.pronunciamentos.map(async (valor)=>{

                    const resposta= await fetch(valor.textointegralurl)
                    let dados= await resposta.text()

                    let parsar = new DOMParser(),
                        htmlDoc = parsar.parseFromString(dados,'text/html')
                    
                    let div = htmlDoc.getElementsByClassName('texto-integral')
                    let p = div[0].querySelectorAll('p')
                    let p2 = Array.from(p)
                    
                    setInterval(() => {
                        console.log('carregando mais',p2.length)
                        let textos = p2.map((valores) =>{
                    
                            let completo = {"discursoId":valor.codigopronunciamento,"paragrafo":valores.textContent}
                            this.textoscompletos[completo.discursoId] = completo 
                            
                            const method = valor.codigopronunciamento? 'put':'post'
                            const codigopronunciamento = valor.codigopronunciamento? `/${valor.codigopronunciamento}`:''
                            //console.log(completo)
                            axios[method](`${baseApiUrl}/textocompleto${codigopronunciamento}`,completo)
                        })

                    }, 3000);
                    
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