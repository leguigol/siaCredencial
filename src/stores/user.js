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
            this.loginUser=true;
            try {
                const {user}=await createUserWithEmailAndPassword(auth, email, password)
                console.log(user);
                // this.userData={email: user.email, uid: user.uid};
                this.userData={email: user.email, uid: user.uid };
                // this.logoutUser();
                // router.push('/');
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
            this.loadingUser=true;
            const databasestore=useDatabaseStore();
            databasestore.$reset();
            try{
                this.userData=null;
                await signOut(auth);
                databasestore.$reset();                                    
                router.push('/login');
            }catch(error){
                console.log(error);
            }finally{
                this.loadingUser=false;
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