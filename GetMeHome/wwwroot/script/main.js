import Vue from 'vue'
import axios from 'axios'
import VueLocalStorage from 'vue-ls';
import VueRouter from 'vue-router'
import moment from 'moment'
import 'animate.css/animate.min.css'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.js'
//import 'font-awesome/css/font-awesome.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import VuePreferences from 'vue-preferences';
import 'lodash'
import App from './App.vue'
import StartPage from './pages/startpage.vue'

Vue.use(VuePreferences);
Vue.use(VueRouter);

Vue.use(VueLocalStorage, {
    namespace: 'vuejs__'
});
Vue.directive('focus', {
    inserted: function (el) {
        el.focus();
    },
    update: function (el) {
        Vue.nextTick(function () {
            el.focus();
        })
    }
})
var webcall = axios.create({
    baseURL: 'api',
    timeout: 6000,
    withCredentials:false, 
    headers: { 'Content-Type': 'application/json' }

});




Vue.filter('timeago', function (value) {
    if (value) {
        return moment(String(value)).fromNow(false);
    }
});




Vue.filter('formatElipsi', function (value) {
    if (value) {
        if (value.length > 25)
            return value.substring(0, 25) + '...';
        else
            return value;


    }
});

webcall.interceptors.request.use(function(config) {
 
    return config;
}, function(error) {

    return Promise.reject(error);
});
//webcall.interceptors.response.use(function(response) {

//    return response;
//}, function (error) {
//    alert("fail");

//    if (error.toString().indexOf("403") !== -1) {   
//               
//                console.log(response.data);        

//    }
//    return Promise.reject(error);
//    });



var routes = [   
    { path: '/', component: App },
    { path: '/start', component: StartPage, canReuse: true, props: false }
    //{ path: '/componenttest1', component: ConrollerApp, canReuse: false, props: false }
];
var router = new VueRouter({
    routes: routes
});

new Vue({
    el: '#app',
    router: router,
    data: { api: webcall }
    //render: h => h(App)
})

