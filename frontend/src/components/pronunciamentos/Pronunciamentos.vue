<template>
  <h1>Pronunciamentos</h1>
</template>

<script>
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
            let baseApiUrl = 'https://legis.senado.leg.br/dadosabertos/plenario/lista/discursos'
            
            const response = await fetch(baseApiUrl+'/2018'+'02'+'01'+'/2018'+'03'+'01') // AAAAMMDD
            let data = await response.text()

            let parser = new DOMParser(),
                xmlDoc = parser.parseFromString(data,'text/xml')

            let temp = [...xmlDoc.getElementsByTagName('Pronunciamento')]
            
            this.pronunciamentos = temp.map((valores) => {
                let codigoparlamentar = valores.getElementsByTagName('CodigoParlamentar')[0]
                
                return {"data" :valores.getElementsByTagName('Data')[0].innerHTML,
                        "resumo": valores.getElementsByTagName('Resumo')[0].innerHTML,
                        "indexacao": valores.getElementsByTagName('Indexacao')[0].innerHTML,
                        "codigoparlamentar":  codigoparlamentar ? codigoparlamentar.innerHTML: undefined,
                        "codigopronunciamento": valores.getElementsByTagName('CodigoPronunciamento')[0].innerHTML
                        }
                
            })
        }
    },
    mounted(){
        this.update()
    }

}
</script>

<style>

</style>