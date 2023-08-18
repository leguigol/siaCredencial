<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
        <a-form-item
            label="email"
            name="email"
            :rules="[{ required: true, type: 'email', message: 'Por favor ingresa tu correo electronico' }]"
            >
            <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item
            label="Password"
            name="password"
            :rules="[{ required: true, message: 'Por favor ingresa tu contraseña!' }]"
        >
            <a-input-password v-model:value="formState.password" />
        </a-form-item>
  </a-form>
    <!-- <div>
        <h1>Login</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="ingrese email" v-model="email">
            <input type="password" placeholder="ingrese contraseña" v-model="password">
            <button type="submit" :disabled="userStore.loadingUser">Acceso</button>
        </form>
    </div> -->
</template>

<script setup>
import { ref } from 'vue';
import {useUserStore} from '../stores/user';

const userStore=useUserStore();

const email=ref('');
const password=ref('');

const handleSubmit= async() => {
    console.log(email.value);
    console.log(password.value);
    console.log('procesando formulario');
    if(!email.value || password.value.length<6){
        return alert('llena los campos')
    }
    await userStore.loginUser(email.value,password.value);
}
</script>

