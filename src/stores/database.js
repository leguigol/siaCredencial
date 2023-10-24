
import { defineStore } from "pinia";
// import { collection, getDocs, getDoc, query, where,addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore/lite';
//import { db, auth } from '../firebaseConfig';
import { db, auth } from '../firebase'
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import router from '../router';
import { useUserStore } from './user';

export const useDatabaseStore=defineStore('database',{
    state: () => ({
        documents: [],
        registerData: [],
        loadingDoc: false,
    }),
    actions: {
        async datodelRegistrado(){
            try{

                // console.log('entre')
                this.registerData=[];

                const q = query(
                    collection(db, 'registro'), 
                    where("user","==", auth.currentUser.uid)
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    console.log("__" ,doc.id, " => ", doc.data());
                    this.registerData.push({ id: doc.id,
                        ...doc.data(),
                    });
                });
            }catch(error){
                console.log(error);
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
              console.log('query: '+querySnapshot.docs);

              querySnapshot.forEach((doc) => {
                const docData = doc.data();
                console.log('Data del documento:', docData); 
                data.push({
                  forma_suscripcion: docData.forma_suscripcion,
                  fecha_registro: docData.fecha_registro,
                  nombre: docData.nombre,
                  apellido: docData.apellido,
                  dni: docData.dni
                });
              });

                // if(!querySnapshot.empty){
                //     const data = [];
                //     querySnapshot.forEach((doc) => {
                //         const docData = doc.data();
                //         data.push({
                //             forma_suscripcion: docData.forma_suscripcion,
                //             fecha_registro: docData.fecha_registro,
                //             nombre: docData.nombre,
                //             apellido: docData.apellido,
                //             dni: docData.dni
                //         });
                //     });
                //     this.registerData=data;
                //     return data;
                // }else{
                //     console.log('no hay datos de registro');
                //     return null;
                // }  
        
            } catch (error) {
              console.log(error.message);
            }
        },        
        async registerUser(xid,suscrip,fecha,nom,ape,docu){
            const userStore=useUserStore();

            console.log('el id es: ',xid);    
            try{
                const objetoDoc={
                    user: xid,
                    forma_suscripcion: suscrip,
                    fecha_registro: fecha,
                    nombre: nom,
                    apellido: ape,
                    dni: docu                    
                }

                console.log("objeto:",objetoDoc)
                await addDoc(collection(db, "registro"), objetoDoc);
                router.push('/');
            }catch(error){
                console.log(error);
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