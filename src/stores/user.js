import {defineStore} from 'pinia';
import {auth, db} from '../firebaseConfig';
import {useDatabaseStore} from './database';
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { query, getDocs,collection,where} from 'firebase/firestore/lite';
import router from '../router';
import { message } from 'ant-design-vue';

export const useUserStore=defineStore('userStore',{
    state: () =>  ({
        userData: null,
        registerData: null,
        loadingUser: false,
        loadingSession: false,
    }),
    actions: {
        async registerUser(email,password){
            this.loadingUser=true;
            try {
                const {user}=await createUserWithEmailAndPassword(auth, email, password)
                console.log(user);
                this.userData={email: user.email, uid: user.uid };
            }catch (error){
                console.log(error);
                return(error.code);
            }finally{
                this.loadingUser=false;
            }
        },
        async loginUser(email, password){
            this.loadingUser=true;
            try{
                const {user}=await signInWithEmailAndPassword(auth,email,password);
                this.userData={ email: user.email, uid: user.uid}; 
                router.push('/');
            }catch(error){
                console.log(error);            
                return(error.code);
            }finally{
                this.loadingUser=false;
            }
        },
        async logoutUser(){
            this.loadingSession=true;
            try{
                await signOut(auth);
            }catch(error){
                console.log(error);
            }finally{
                this.userData=null;
                this.loadingSession=false;
                router.push('/login');
            }
        }, 
        currentUser(){
            return new Promise((resolve, reject)=>{
                const unsuscribe=onAuthStateChanged(auth, user =>{
                    if(user){
                        this.userData={ email: user.email, uid: user.uid};
                    }else{
                        this.userData=null;
                        const databasestore=useDatabaseStore();
                        databasestore.$reset();                                    
                    }
                    resolve(user);
                }, e => reject(e))
                unsuscribe();
            });
        }
    },
});