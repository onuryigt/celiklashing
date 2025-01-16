import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Firebase yapılandırma bilgileri
const firebaseConfig = {
    apiKey: "AIzaSyCRltXWo-TuSS64yussK6wBQtpOJFpQybg",
    authDomain: "celik-lashing.firebaseapp.com",
    projectId: "celik-lashing",
    storageBucket: "celik-lashing.firebasestorage.app",
    messagingSenderId: "37037650809",
    appId: "1:37037650809:web:3fbbd7acf4494f465535a8",
    measurementId: "G-XCHS8Q5KJD"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth'u yapılandır
const auth = getAuth(app);

// Storage'ı yapılandır
const storage = getStorage(app);

// Firestore'u yapılandır
const db = getFirestore(app);

// Servisleri dışa aktar
export { auth, storage, db, app };