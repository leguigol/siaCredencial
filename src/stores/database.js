
import { defineStore } from "pinia";
import { collection, getDocs, query, where,addDoc, doc, getDoc,deleteDoc, updateDoc } from 'firebase/firestore/lite';
import { db, auth } from '../firebaseConfig';
import {nanoid} from 'nanoid'; 
import router from '../router';
import { useUserStore } from './user';

export const useDatabaseStore=defineStore('database',{
    state: () => ({
        documents: [],
        registerData: [],
        loadingDoc: false,
    }),
    actions: {
        async getUrls(){

            // if (this.documents.length!==0){
            //     return;
            // }
            this.loadingDoc=true;
            try {
                const q = query(
                    collection(db, 'urls'), 
                    where("user","==", auth.currentUser.uid)
                );
                const querySnapshot=await getDocs(q);
                querySnapshot.forEach((doc) => {
                    console.log(doc.id,doc.data());
                    this.documents.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
            }catch(error){
                console.log(error);
            }finally{
                this.loadingDoc=false;
            }
        }, 
 
        async addUrl(name){
            try{
                const objetoDoc={
                    name: name,
                    short: nanoid(6),
                    user: auth.currentUser.uid
                }
                const docRef=await addDoc(collection(db, "urls"), objetoDoc);
                this.documents.push({
                    ...objetoDoc,
                    id: docRef.id,
                });
            }catch(error){
                console.log(error);
            }finally{

            }
        },
        async datodelRegistrado(){
            try{
                this.registerData=[];
                const q = query(
                    collection(db, 'registro'), 
                    where("user","==", auth.currentUser.uid)
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    this.registerData.push({ id: doc.id,
                        ...doc.data(),
                    });
                  });
            }catch(error){

            }finally{

            }
        },
        async obtenerRegistrado() {
            try {
              this.registerData=[];
              const q = query(
                    collection(db, 'registro'), 
                    where("user","==", auth.currentUser.uid)
              );
              const querySnapshot=await getDocs(q);
              console.log('uid: '+auth.currentUser.uid)  
              if(!querySnapshot.empty){
                const docS=querySnapshot.docs[0];
                const data=docS.data();
                // Devolver los datos de registro
                return {
                    forma_suscripcion: data.forma_suscripcion,
                    fecha_registro: data.fecha_registro,
                    nombre: data.nombre,
                    apellido: data.apellido,
                    dni: data.dni
                  };
    
              }else{
                console.log('no hay datos de registro');
                return null;
              }  
        
            } catch (error) {
              console.log(error.message);
            }
        },        
        async registerUser(suscrip,fecha,nom,ape,docu){
            const userStore=useUserStore();
            const xid=userStore.userData.uid;
            try{
                const objetoDoc={
                    user: xid,
                    forma_suscripcion: suscrip,
                    fecha_registro: fecha,
                    nombre: nom,
                    apellido: ape,
                    dni: docu                    
                }
                await addDoc(collection(db, "registro"), objetoDoc);
                
                router.push('/');
            }catch(error){
                console.log(error.code);
                return(error.code);
            }finally{

            }
        },
        async leerUrl(id){
            try{
                const docRef=doc(db, "urls", id);
                const docSpan=await getDoc(docRef);

                if (!docSpan.exists()){
                    throw new Error("no existe el doc");
                }

                if (docSpan.data().user !== auth.currentUser.uid){
                    throw new Error("no le pertenece el documento");
                }
                return docSpan.data().name;
            }catch(error){
                console.log(error);
            }finally{

            }
        },
        async updateUrl(id, name){
            try{
                const docRef=doc(db, 'urls', id);
                const docSnap=await getDoc(docRef);

                if (!docSnap.exists()){
                    throw new Error("no existe el doc");
                }

                if (docSnap.data().user !== auth.currentUser.uid){
                    throw new Error("no le pertenece el documento");
                }

                await updateDoc(docRef, {
                    name: name,
                })              
                this.documents=this.documents.map(item => item.id === id ? ({...item, name: name}) : item);
                router.push('/');
            }catch(error){

            }finally{

            }
        },
        async deleteUrl(id){
            try{
                const docRef=doc(db, 'urls', id);
                
                const docSnap=await getDoc(docRef);
                
                await deleteDoc(docRef);
                if(!docSnap.exists()){
                    throw new Error("no existe el doc");
                }
                if(docSnap.data().user !== auth.currentUser.uid){
                    throw new Error("no le pertenece ese documento");
                }

                this.documents=this.documents.filter(
                    (item) => item.id !== id);
            }catch(error){
                console.log(error.message);
            }finally{
            } 
        }
    },

});