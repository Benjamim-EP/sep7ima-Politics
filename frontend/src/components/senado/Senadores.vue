<template>
    <div class="senadores">
        <h1>Senadores</h1>
            <div class="box">
                <div v-for="parlamentar in parlamentares" :key="parlamentar">
                    <SenadoresItem :parlamentar="parlamentar" />
                </div>
            </div>
        <b-button variant="primary" @click="update">Atualizar</b-button>
    </div>
</template>

<script>
import SenadoresItem from '../parlamentares/SenadoresItem.vue'

export default {
    name: 'Senadores',
    components: {SenadoresItem},
    data: function(){
        return{
            parlamentares:[]
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
            
            this.parlamentares = [...xmlDoc.getElementsByTagName('Parlamentar')]
            
        }
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