<template>
    <div class="senador-item">
        <router-link :to="{name: 'senadoresByCod',params:{codigoparlamentar:parlamentar.codigoparlamentar}}">
           {{parlamentar.codigoparlamentar}}
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'SenadoresItem',
    props: ['parlamentar']
}

</script>

<style>

</style>