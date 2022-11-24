import Vue from 'vue'
import VueRouter from 'vue-router'

import Senadores from '../components/senado/Senadores'
import Home from '../components/home/Home'

Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
    name: 'senado',
    path: '/senado',
    component: Senadores
}]

const router = new VueRouter({
    mode: 'history',
    routes
})


export default router