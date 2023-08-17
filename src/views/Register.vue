<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="ingrese email" v-model="email">
            <input type="password" placeholder="ingrese contraseña" v-model="password">
            <input type="text" placeholder="Nombre" v-model="nombre">
            <input type="text" placeholder="Apellido" v-model="apellido">
            <input type="text" placeholder="Dni" v-model="dni">
            <label for="subscription">Elige una forma de suscripción:</label>
            <select id="subscription" v-model="subscription">
                <option value="Mensual">Mensual</option>
                <option value="Bimestral">Bimestral</option>
                <option value="Semestral">Semestral</option>
                <option value="Anual">Anual</option>
            </select>

            <button type="submit" :disabled="userStore.loadingUser">Crear Usuario</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {useUserStore} from '../stores/user';
import { useDatabaseStore } from '../stores/database';
// import {useRouter} from 'vue-router';

useDatabaseStore
const userStore=useUserStore();
const databaseStore=useDatabaseStore();

// const router=useRouter();

const email=ref('leguigol@hotmail.com');
const password=ref('lancelot');
const nombre=ref('');
const apellido=ref('');
const dni=ref('');
const subscription=ref('Mensual');

const handleSubmit= async() => {
    console.log(email.value);
    console.log(password.value);
    console.log('procesando formulario');

    if(!email.value || password.value.length<6){
        return alert('llena los campos')
    }

    await userStore.registerUser(email.value,password.value);
    
    await databaseStore.registerUser(subscription.value,new Date(),nombre.value,apellido.value,dni.value);

    // router.push('/');
}
</script>

