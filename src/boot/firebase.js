import { boot } from 'quasar/wrappers'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , onAuthStateChanged } from 'firebase/auth';

import { useAuthStore } from 'src/stores/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAc1k8TnBDcR09LYIupmvAvzjitgrluC1c",
  authDomain: "ohmymoon-vue3-firebase-app.firebaseapp.com",
  projectId: "ohmymoon-vue3-firebase-app",
  storageBucket: "ohmymoon-vue3-firebase-app.appspot.com",
  messagingSenderId: "5714778871",
  appId: "1:5714778871:web:110a636aa383bcf1eed1f2",
  measurementId: "G-S9K8GQTPQE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };

export default boot(async (/* { app, router, ... } */) => {
  onAuthStateChanged(auth, (user) => {
    const authStore = useAuthStore();
    console.log('user: ', user);
    authStore.setUser(user);
  });
})
