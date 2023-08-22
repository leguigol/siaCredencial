<template>
    <a-row>
        <a-col :xs="{span: 24}" :sm="{span:12, offset:6}" :style="{textAlign: 'center'}">
            <h1>SIA CLUB</h1>
        </a-col>    
    </a-row>    
    <a-form
        name="registro"
        :model="formState"
        @finish="onFinish"
    >
        <a-form-item
            label="Ingrese su correo electronico"
            name="email"
            :rules="[{ type: 'email' }]"
        >
            <a-input
                type="email"
                v-model:value="formState.email"
            >
            </a-input>
        </a-form-item>
        <a-form-item
            label="Ingrese su contraseña:"
            name="password"
            :rules="[
                {
                    required: true,
                }
            ]"
        >
            <a-input-password v-model:value="formState.password">

            </a-input-password>
        </a-form-item>
        <a-form-item
            name="repassword"
            label="Repita contraseña "
            :rules="[
                {
                    required: true,
                    min: 6,
                    whitespace: true,
                    validator: validatePass,
                },
            ]"
        >
            <a-input-password
                v-model:value="formState.repassword"
            >
            </a-input-password>                
        </a-form-item>
        <a-form-item
            label="Nombre"
            name="nombre"
            :rules="[
                {
                    required: true,
                    whitespace: true,
                }
            ]"
        >
            <a-input
                type="texto"
                v-model:value="formState.nombre"
            >
            </a-input>
        </a-form-item>
        <a-form-item
            label="Apellido"
            name="apellido"
            :rules="[
                {
                    required: true,
                    whitespace: true,
                }
            ]"
        >
            <a-input
                type="texto"
                v-model:value="formState.apellido"
            >
            </a-input>
        </a-form-item>
        <a-form-item
            label="DNI"
            name="dni"
            :rules="[
                {
                    required: true,
                    whitespace: true,
                }
            ]"
        >
            <a-input
                type="texto"
                v-model:value="formState.dni"
            >
            </a-input>
        </a-form-item>
        <a-form-item
            label="Forma de suscripcion"
            name="suscripcion"
            :rules="[
                {
                    required: true,
                }
            ]"
        >
            <a-select
                v-model:value="formState.suscripcion"
            >
                <a-select-option value="Mensual">Mensual</a-select-option>
                <a-select-option value="Bimestral">Bimestral</a-select-option>
                <a-select-option value="Trimestral">Trimestral</a-select-option>
                <a-select-option value="Semestral">Semestral</a-select-option>
                <a-select-option value="Anual">Anual</a-select-option>
            </a-select>                
        </a-form-item>
        <a-form-item>
            <a-button type="primary" html-type="submit" :disabled="userStore.loadingUser">REGISTRARSE</a-button>
        </a-form-item>


    </a-form>
<div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import {useUserStore} from '../stores/user';
import { useDatabaseStore } from '../stores/database';
// import {useRouter} from 'vue-router';
import { message } from 'ant-design-vue';

const userStore=useUserStore();
const databaseStore=useDatabaseStore();
 
const formState= reactive({
    email: "",
    password: "",
    repassword: "",
    nombre: "",
    apellido: "",
    dni: "",
    suscripcion: "Mensual"
});


const validatePass=async(_rule, value) => {
    if(value==''){
        return Promise.reject('Repita contraseña');
    }
    if(value!==formState.password){
        return Promise.reject('no coinciden las contraseñas');
    }

    return Promise.resolve();
} 

const onFinish=async(values)=>{
    
    const error1=await userStore.registerUser(formState.email,formState.password);

    const error2=await databaseStore.registerUser(formState.suscripcion,new Date(),formState.nombre,formState.apellido,formState.dni);
    // alert('verifica tu cuenta de correo');

    if(!error1){
        return;
    }
    if(!error2){
        return;
    }

    switch(error2){
        default:
            message.error('Error en el servidor');
            break;    
    }

}
</script>

