<template>
    <div>
        <h1>Baja id: {{ id }}</h1>
        <div class="d-grid gap-1">
            <button @click="dardeBaja(id)" class="btn btn-danger" type="button">BAJA</button>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth } from '../firebaseConfig';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase'
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

const id=ref('');

const collectionRef=collection(db,'users');

const router=useRouter();
const userStore=useUserStore();

onMounted(()=>{
    console.log(auth.currentUser)
    id.value=auth.currentUser.uid;
})

const dardeBaja= id => {

    const user = auth.currentUser; 
    user.delete().then(() => {
        console.log('user Deleted: '+id)
        userStore.logoutUser();
        router.push('/')
            
}).catch((error) => {
    console.log('error')
});
}
</script>

