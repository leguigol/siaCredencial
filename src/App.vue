<template>
  <!-- <body> -->
    <!-- <div class="div1">  -->
  <a-layout>

    <a-layout-header :style="{ height: '150px', backGroundcolor: 'white'}">
      <img src="./assets/header.jpg" class="responsive-img">
    </a-layout-header>
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
    <!-- </div>  -->

    <div v-if="userStore.loadingSession">loading user....</div> 
    <div class="vista">
      <router-view></router-view>
    </div>

  </a-layout>    
          
  <!-- </body> -->

</template>
<style>
/* html, body {
  height: 100%;
  width: 100%;
  overflow-y: auto;
} */
/* body {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  background-image: url('./assets/768x1024_SIA_CREDENCIAL.jpg');
  height: 100%;
  width: 100%;
} */
.header {
  display: flex;
  align-items: center;
  align-content: center;

}
.responsive-img {
  display: flex;
  max-width: 100%; 
  height: 100%; /* La altura se ajustará automáticamente para mantener la proporción */
  
}
.div1 {
  background: red;
    position: fixed;
    margin-top: 0px;
    margin-right: 20px;
    margin-left: 0px;
    /* z-index: 100; */
  }
.cabecera {
  margin-top: 200px;
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

