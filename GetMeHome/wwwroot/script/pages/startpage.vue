<template>
    <div>
        Start Page
       
    </div>
</template>
<script>
    import Vue from 'vue'
    import axios from 'axios'
    import moment from 'moment';
    import { preference } from 'vue-preferences'
    import component1sample from '../components/component1sample.vue'

    var webcall = axios.create({
        baseURL: 'api',
        timeout: 20000,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
    });

    export default {
        props: [],
        components: {
            component1sample
        },
        data() {
            return {
                sampledata: "hello"
            }
        },
        methods: {
            getsampledata() {
                var vm = this;
                webcall.get("helloworldgetdata")
                    .then(function (response) {
                        vm.sampledata = response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }

        },
        computed: {
            isdarkmode: preference('isdarkmodeenabled', { defaultValue: false })

        },
        watch: {
        },
        created() {
        },
        mounted() {

            console.log("Main View Mounted!");
            this.getsampledata();
        }
    }
    function generateGuid() {
        var result, i, j;
        result = '';
        for (j = 0; j < 32; j++) {
            if (j == 8 || j == 12 || j == 16 || j == 20)
                result = result + '-';
            i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
            result = result + i;
        }
        return result;
    }

</script>
<style>
    .menucustom2 {
        padding: 0px;
    }
</style>
<style scoped>
</style>
