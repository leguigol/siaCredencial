<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="ingrese email" v-model="email">
            <input type="password" placeholder="ingrese contraseña" v-model="password">
            <button type="submit">Crear Usuario</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {useUserStore} from '../stores/user';
import {useRouter} from 'vue-router';

const userStore=useUserStore();
const router=useRouter();

const email=ref('leguigol@hotmail.com');
const password=ref('lancelot');

const handleSubmit= async() => {
    console.log(email.value);
    console.log(password.value);
    console.log('procesando formulario');
    if(!email.value || password.value.length<6){
        return alert('llena los campos')
    }
    await userStore.registerUser(email.value,password.value);
    router.push('/');
}
</script>

