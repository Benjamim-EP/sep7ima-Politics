<template>
  <div>
    <h1>Pronunciamentos</h1>
    <div v-for="pronunciamento in pronunciamentos" :key="pronunciamento.codigopronunciamento">
         <a href="">{{pronunciamento.codigopronunciamento}}</a>
    </div>
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
            
            this.pronunciamentos = temp.map((valores) => {
                let codigoparlamentar = valores.getElementsByTagName('CodigoParlamentar')[0]
                
                let pronunciamento = {"data" :valores.getElementsByTagName('Data')[0].innerHTML,
                        "resumo": valores.getElementsByTagName('Resumo')[0].innerHTML,
                        "indexacao": valores.getElementsByTagName('Indexacao')[0].innerHTML,
                        "codigoparlamentar":  codigoparlamentar ? codigoparlamentar.innerHTML: undefined,
                        "codigopronunciamento": valores.getElementsByTagName('CodigoPronunciamento')[0].innerHTML,
                        "textointegral": valores.getElementsByTagName('TextoIntegral')[0].innerHTML
                        }
                const method = pronunciamento.codigopronunciamento? 'put':'post'
                const codigopronunciamento = pronunciamento.codigopronunciamento? `/${pronunciamento.codigopronunciamento}`:''

                axios[method](`${baseApiUrl}/pronunciamentos${codigopronunciamento}`,pronunciamento)
                
            })
            
        },
        loadPronunciamentos() {
            const url = `${baseApiUrl}/pronunciamentos`
            axios.get(url).then(res => {
                this.pronunciamentos = res.data
            })

        },
    },
    mounted(){
        this.loadPronunciamentos()
    }

}
</script>

<style>

</style>