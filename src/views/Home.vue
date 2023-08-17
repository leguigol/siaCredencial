<template>
    <div>
        <div v-if="datosRegistro">
        <h2>Apellido y Nombre: {{ datosRegistro.apellido }} {{ datosRegistro.nombre }}</h2>
        <h2>DNI: {{ datosRegistro.dni }}</h2>
        <h3>Forma de Suscripción: {{ datosRegistro.forma_suscripcion }}</h3>
        <p>Fecha de Registro: {{ datosRegistro.fecha_registro.toDate() }}</p>
        </div>

        <p>{{ userStore.userData?.email }}</p>

        <div ref="qrCode"></div>
    </div>
</template>

<script setup>
import {useUserStore} from '../stores/user';
import {useDatabaseStore} from '../stores/database';
import { ref, onMounted } from 'vue';
// import { useRouter} from 'vue-router';
import QRCode from 'qrcode';
import { auth } from '../firebaseConfig';

const userStore=useUserStore();
const databaseStore=useDatabaseStore();
const qrCode=ref(null);
const datosRegistro=ref(null);

// const router=useRouter();


// if(userStore.userData){
//     alert(userStore.userData.uid);
//     datosRegistro.value=await databaseStore.obtenerRegistrado(userStore.userData.uid);
// }

onMounted( () => {
    generateQRCode();
    obtenerDatosRegistro();
    const fechaRegistro = datosRegistro.fecha_registro.toDate();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'UTC' };
    const fechaFormateada = fechaRegistro.toLocaleDateString('es-ES', options);
    console.log('Fecha de registro:', fechaFormateada);

});

async function generateQRCode(){
    const userData=JSON.stringify(userStore.userData);
    const registerData=JSON.stringify(databaseStore.registerData);
    const combineData={userData, registerData};
    const combineDataString=JSON.stringify(combineData);

    const canvas=await QRCode.toCanvas(combineDataString);

    if(qrCode.value){
        qrCode.value.innerHTML='';
        qrCode.value.appendChild(canvas);
    }
}

async function obtenerDatosRegistro(){
    const idUser=auth.currentUser.uid;
    datosRegistro.value=await databaseStore.obtenerRegistrado(idUser);
}

// databaseStore.getUrls();

// const url=ref('');

// const handleSubmit= () => {
//     // console.log('submit')
//     // validaciones de esa url

//     databaseStore.addUrl(url.value);

// }
</script>

