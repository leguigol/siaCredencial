<template>
    <div>
        <h1>Email: {{ email }}</h1>
        <div class="d-grid gap-1">
            <button @click="dardeBaja(id)" class="btn btn-danger" type="button">DESEA DAR DE BAJA ?</button>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth } from '../firebaseConfig';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import Swal from 'sweetalert2';

const id=ref('');
const email=ref('')

const collectionRef=collection(db,'users');

const router=useRouter();
const userStore=useUserStore();

onMounted(()=>{
    console.log(auth.currentUser)
    console.log(userStore.userData)
    id.value=auth.currentUser.uid;
    email.value=userStore.userData.email
})

const dardeBaja= id => {

    const user = auth.currentUser; 
    user.delete().then(() => {
        console.log('user Deleted: '+id)
        userStore.logoutUser();
        Swal.fire('¡Cuenta borrada!','success');      
        router.push('/')
            
}).catch((error) => {
    console.log(error)
});
}
</script>

