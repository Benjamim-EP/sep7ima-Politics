<template>
    <div>{{parlamentar}}</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'senadoresByCod',
    data: function(){
        return { parlamentar: {} }
    },
    mounted(){
        const url = `http://localhost:3000/senadores/${this.$route.params.codigoparlamentar}`
        axios.get(url).then(res=> this.parlamentar = res.data)
    
    }
}
</script>

<style>

</style>