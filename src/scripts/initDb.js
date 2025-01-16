const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCRltXWo-TuSS64yussK6wBQtpOJFpQybg",
  authDomain: "celik-lashing.firebaseapp.com",
  projectId: "celik-lashing",
  storageBucket: "celik-lashing.firebasestorage.app",
  messagingSenderId: "37037650809",
  appId: "1:37037650809:web:3fbbd7acf4494f465535a8",
  measurementId: "G-XCHS8Q5KJD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const defaultCategories = [
  { name: 'Lashing' },
  { name: 'Liman Hizmetleri' },
  { name: 'Ekipmanlar' }
];

async function initializeFirestore() {
  try {
    console.log('Firestore başlatılıyor...');
    
    const categoriesCollection = collection(db, 'categories');
    
    for (const category of defaultCategories) {
      await addDoc(categoriesCollection, category);
    }
    
    console.log('Kategori koleksiyonu başarıyla oluşturuldu');
  } catch (error) {
    console.error('Hata:', error);
  }
}

initializeFirestore(); 