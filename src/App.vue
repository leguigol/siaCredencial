<template>
  <body>
              <div class="div1"> 
                <a-menu 
                  mode="horizontal"
                  v-model:selectedKeys="selectedKeys"
                  :style="{ marginBottom: '40px'}"
                > 
                    <a-menu-item v-if="userStore.userData" key="home">
                      <router-link to="/">Home</router-link>        
                    </a-menu-item>
                    <a-menu-item v-if="!userStore.userData" key="login">
                      <router-link to="/login">Login</router-link>
                    </a-menu-item>
                    <a-menu-item v-if="!userStore.userData" key="register">
                      <router-link to="/Register">Registrarse</router-link>
                    </a-menu-item>
                    <a-menu-item @click="userStore.logoutUser" v-if="userStore.userData" key="logout">Cerrar Sesion</a-menu-item>                  
                </a-menu>   
              </div> 

                <div v-if="userStore.loadingSession">loading user....</div> 
                <div class="vista">
                  <router-view></router-view>
                </div>
          
  </body>

</template>
<style>
html, body {
  height: 100%;
  width: 100%;
  overflow-y: auto;
}
body {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  background-image: url('./assets/768x1024_SIA_CREDENCIAL.jpg');
  height: 100%;
  width: 100%;
}
.div1 {
    position: fixed;
    margin-top: 125px;
    margin-right: 20px;
    margin-left: 0px;
    z-index: 100;
  }
.vista {
  display: block;
  margin-top: 150px;
  width: 350px;
  height: 400px;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
</style>
<script setup>
import { ref, watch } from 'vue';
import {useUserStore} from './stores/user';
import { useRoute } from 'vue-router';

const userStore=useUserStore();
const route=useRoute();

const selectedKeys=ref([''] );

watch( 
  ()=> route.name, 
  () => {
    selectedKeys.value = [route.name]
  }
);

</script>

