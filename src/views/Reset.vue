<template>
    <div>
        <h1>Recuperar Contraseña</h1>
        <form @submit.prevent="handlePasswordReset">
        <div>
            <label for="email">Correo Electrónico:</label>
            <input type="email" id="email" class="form-control" v-model="email" required>
        </div>
        <button type="submit" class="btn btn-primary mt-2" >Enviar Correo de Recuperación</button>
        </form>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Swal from 'sweetalert2';

const email=ref('');
const auth = getAuth();

const handlePasswordReset = async () => {
  try {
    auth.languageCode = 'es';
    sendPasswordResetEmail(auth, email.value)
    .then(() => {
      Swal.fire('¡Contraseña restablecida!', 'Verifique su correo electronico!.', 'success');      
    })
    .catch((error) => {
    });
  } catch (error) {
    console.error('Error al enviar el correo de recuperación:', error);
  }
};
</script>

<style>

</style>