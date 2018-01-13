<template>
<div>
        <div class="flex-center position-ref full-height">
        
                <div class="top-right links">
                 
                        
                </div>

            <div class="content">
                <div class="title m-b-md">
                    DAD Memory Game
                </div>

                <div >
                    <p>Miguel Pires 2120664 / Ruben Miguel 21230664 / Paulo Penicheiro 2130628</p>
                  
                </div>
                    <p>  <button type="submit" class="btn btn-primary" v-on:click.prevent="loginUser">
                                    Enter
                                </button>
                    </p>
            </div>
        </div>

</div>
</template>


<script type="text/javascript">

import VueRouter from "vue-router";

var router = new VueRouter();

export default {

 methods: {
    loginUser: function() {

        this.$router.push("/login");
    }
 }
}
</script>

  <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Raleway', sans-serif;
                font-weight: 100;
                height: 100vh;
                margin: 0;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
            }

            .title {
                font-size: 84px;
            }

            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
            }
            
</style>        