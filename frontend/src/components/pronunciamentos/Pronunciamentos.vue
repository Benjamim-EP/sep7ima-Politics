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
            pronunciamentos : {}
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


           

            this.pronunciamentos = temp.map( async (valores) => {

                const resposta= await fetch(valores.getElementsByTagName('TextoIntegral')[0].innerHTML)
                let dados= await resposta.text()

                let parsar = new DOMParser(),
                    htmlDoc = parsar.parseFromString(dados,'text/html')
                
                let div = htmlDoc.getElementsByClassName('texto-integral')
                let p = div[0].querySelectorAll('p')
                let p2 = Array.from(p)
                let textointegral = p2[2].textContent

                let codigoparlamentar = valores.getElementsByTagName('CodigoParlamentar')[0]
                
                let pronunciamento = {"data" :valores.getElementsByTagName('Data')[0].innerHTML,
                        "resumo": valores.getElementsByTagName('Resumo')[0].innerHTML,
                        "indexacao": valores.getElementsByTagName('Indexacao')[0].innerHTML,
                        "codigoparlamentar":  codigoparlamentar ? codigoparlamentar.innerHTML: undefined,
                        "codigopronunciamento": valores.getElementsByTagName('CodigoPronunciamento')[0].innerHTML,
                        "textointegralurl": valores.getElementsByTagName('TextoIntegral')[0].innerHTML,
                        "textointegral": textointegral
                }
                
                const method = pronunciamento.codigopronunciamento? 'put':'post'
                const codigopronunciamento = pronunciamento.codigopronunciamento? `/${pronunciamento.codigopronunciamento}`:''
                
                axios[method](`${baseApiUrl}/pronunciamentos${codigopronunciamento}`,pronunciamento)
                return pronunciamento

            })
            
           
        },
        loadPronunciamentos() {
            const url = `${baseApiUrl}/pronunciamentos`
            axios.get(url).then(res => {
                this.pronunciamentos = res.data
            })
            //this.fetchTextoCompleto()
            

        },
        async fetchTextoCompleto(url){
            
            const response = await fetch(url)
            let data = await response.text()

            let parser = new DOMParser(),
                htmlDoc = parser.parseFromString(data,'text/html')
            
            let div = htmlDoc.getElementsByClassName('texto-integral')
            let p = div[0].querySelectorAll('p')
            let p2 = Array.from(p)
                /*let textos = p2.map((valores) =>{
                    return valores.textContent
                })*/
            let textointegral = p2[2].textContent
            
            return textointegral
        }
    },
    mounted(){
        this.loadPronunciamentos()
        
    }

}
</script>

<style>

</style>