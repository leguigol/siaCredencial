import {defineStore} from 'pinia';
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {auth, db} from '../firebaseConfig';
import router from '../router';
import {useDatabaseStore} from './database';
import { query, getDocs,collection,where} from 'firebase/firestore/lite';

export const useUserStore=defineStore('userStore',{
    state: () =>  ({
        userData: null,
        loadingUser: false,
        loadingSession: false,
    }),
    actions: {
        async registerUser(email,password){
            this.loginUser=true;
            try {
                const {user}=await createUserWithEmailAndPassword(auth, email, password)
                console.log(user);
                this.userData={email: user.email, uid: user.uid};
                router.push('/');
            }catch (error){
                console.log(error);
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
            }finally{
                this.loadingUser=false;
            }
        },
        async logoutUser(){
            this.loadingUser=true;
            const databasestore=useDatabaseStore();
            databasestore.$reset();
            try{
                await signOut(auth);
                this.userData=null;
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