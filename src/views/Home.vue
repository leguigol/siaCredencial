<template>
  <body>
    <div class="centered-item">
      <a-row>
          <a-col :xs="{span: 24}" :sm="{span:24}">
                <div v-for="item of databaseStore.registerData" :key="item.id">
                    <h2>{{ item.apellido }} {{ item.nombre }}</h2>
                    <h3>DNI: {{ item.dni }}</h3>
                    <h3>Forma de Suscripción: {{ item.forma_suscripcion }}</h3>
                    <p>Fecha de Registro: {{ formatearFecha(item.fecha_registro.toDate()) }}</p>                    
                </div>  
          </a-col>    
      </a-row>    
    </div>  
    <a-row>
      <a-col :xs="{span: 24}" :sm="{span:24}">
        <QRCodeVue3
          :width="150"
          :height="150"
          :value="generateLinkWithUserData()"
          :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
          :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
          :dotsOptions="{
            type: 'dots',
            color: '#26249a',
            gradient: {
              type: 'linear',
              rotation: 0,
              colorStops: [
                { offset: 0, color: '#26249a' },
                { offset: 1, color: '#26249a' },
              ],
            },
          }"
          :backgroundOptions="{ color: '#ffffff' }"
          :cornersSquareOptions="{ type: 'dot', color: '#000000' }"
          :cornersDotOptions="{ type: undefined, color: '#000000' }"
          fileExt="png"
          myclass="my-qur"
          imgclass="img-qr"
        />
      </a-col>    

    </a-row>  

  </body>
</template>
<script setup>
import {useDatabaseStore} from '../stores/database';
import { ref, onMounted } from 'vue';
import { auth } from '../firebaseConfig';
import QRCodeVue3 from "qrcode-vue3";

const databaseStore=useDatabaseStore();

const datosRegistro=ref([]);

//databaseStore.obtenerRegistrado();
//databaseStore.datodelRegistrado();

onMounted( async() => {
    
  datosRegistro.value=databaseStore.datodelRegistrado();
  console.log(datosRegistro.value);

});

const generateLinkWithUserData = () => {

//   const userData=JSON.stringify(auth.currentUser.uid)   ;
  const userData=auth.currentUser.uid;
  const link = 'https://credencialsialector.netlify.app/?id=';

  return `${link}${userData}`;
};

function formatearFecha(fecha) {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const año = fecha.getFullYear();

    return `${dia}/${mes}/${año}`;
}



</script>
<style scoped>
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}  
.centered-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
