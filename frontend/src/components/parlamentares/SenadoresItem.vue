<template>
    <div class="box-principal">
        {{parlamentar.getElementsByTagName("CodigoParlamentar")[0].textContent}}
    </div>
</template>

<script>
export default {
    name: 'SenadoresItem',
    props: ['parlamentar']
}

</script>

<style>
.box-principal{
    border: solid dodgerblue;
    height: 80px;
    width: 80px;  
    padding: 25%;
}
</style>