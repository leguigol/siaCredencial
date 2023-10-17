<template>
  <a-layout>

    <a-layout-header :style="{ height: '150px', margin: '0', padding: '0'}">
      <img src="./assets/header.jpg" class="responsive-img">
    </a-layout-header>
    <a-layout>
      <a-menu 
          mode="horizontal"
          v-model:selectedKeys="selectedKeys"
        > 
          <a-menu-item v-if="userStore.userData" key="home">
              <router-link to="/">Home</router-link>        
          </a-menu-item>
          <a-menu-item v-if="!userStore.userData" key="login">
              <router-link to="/login">Login</router-link>
          </a-menu-item>
          <a-menu-item v-if="userStore.userData" key="Baja">
              <router-link to="/baja">Dar de baja la cuenta</router-link>
          </a-menu-item>
          <a-menu-item v-if="!userStore.userData" key="register">
            <router-link to="/Register">Registrarse</router-link>
          </a-menu-item>
          <a-menu-item @click="userStore.logoutUser" v-if="userStore.userData" key="logout">Cerrar Sesion</a-menu-item>                  
      </a-menu> 
    </a-layout>  

    <div v-if="userStore.loadingSession">loading user....</div> 
    <div class="vista">
      <router-view></router-view>
    </div>
  </a-layout>    
          
  <!-- </body> -->

</template>
<style>
.header {
  display: flex;
  align-items: center;
  align-content: center;

}
.responsive-img {
  width: 100%; 
  height: 100%; 
  
}
.vista {
  display: block;
  padding: 20px;
  width: 100%;
  height: 600px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  background-color: white;
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

