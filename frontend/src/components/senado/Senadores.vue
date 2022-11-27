<template>
    <div class="senadores">
        <h1>Senadores</h1>
            <div class="box">
                <div v-for="parlamentar in parlamentares" :key="parlamentar">
                    <SenadoresItem :parlamentar="parlamentar" />
                </div>
            </div>
        <b-button variant="primary" @click="update">Atualizar</b-button>
        <b-button variant="primary" @click="save">Salvar no banco de dados</b-button>
    </div>
</template>

<script>
import SenadoresItem from '../parlamentares/SenadoresItem.vue'

import axios from 'axios'

let baseApiUrl = "http://localhost:3000"

export default {
    name: 'Senadores',
    components: {SenadoresItem},
    data: function(){
        return{
            parlamentares:[],
            parlamentar: {}
            /*parlamentar:{
                'CodigoParlamentar': NaN,
                'CodigoPublicoNaLegAtual':NaN,
                'NomeParlamentar':NaN,
                'NomeCompletoParlamentar':NaN,
                'SexoParlamentar': NaN,
                'FormaTratamento':NaN,
                'UrlFotoParlamentar':NaN,
                'UrlPaginaParlamentar':NaN,
                'UrlPaginaParticular':NaN,
                'EmailParlamentar':NaN,
                'UF-mandato':NaN,
            }*/
        }
    },
    methods:{
        async update(){
            const url = "https://legis.senado.leg.br/dadosabertos/senador/lista/atual"

            const response = await fetch(url);
            let data = await response.text()
            
            let parser = new DOMParser(),
                xmlDoc = parser.parseFromString(data,'text/xml')
            
            this.parlamentares = [...xmlDoc.getElementsByTagName('IdentificacaoParlamentar')]
            
            this.parlamentares.map((valores) => {

                    let parlamentar = {"nomeparlamentar" :valores.getElementsByTagName('NomeParlamentar')[0].innerHTML,
                                        "codigoparlamentar": valores.getElementsByTagName('CodigoParlamentar')[0].innerHTML
                                      }
                       
                    const method = parlamentar.codigoparlamentar? 'put':'post'
                    const codigoparlamentar = parlamentar.codigoparlamentar ? `/${parlamentar.codigoparlamentar}`:''
                        
                    axios[method](`${baseApiUrl}/senadores${codigoparlamentar}`,parlamentar)

            })
          
        },
        loadSenadores() {
            const url = `${baseApiUrl}/senadores`
            axios.get(url).then(res => {
                this.parlamentares = res.data
            })
        },
        
    },
    mounted(){
        this.loadSenadores()
    }
}
</script>

<style>
.box{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>