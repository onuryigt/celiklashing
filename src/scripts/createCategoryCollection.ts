import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const createCategoryCollection = async () => {
  try {
    const categories = [
      { name: 'Konteyner Lashing', slug: 'konteyner-lashing' },
      { name: 'Gemi Proje Lashing', slug: 'gemi-proje-lashing' },
      { name: 'Araç Üstü Lashing', slug: 'arac-ustu-lashing' },
      { name: 'Sandıklama', slug: 'sandiklama' },
      { name: 'VCI Koruma', slug: 'vci-koruma' },
      { name: 'Brandalama', slug: 'brandalama' }
    ];

    const categoriesCollection = collection(db, 'categories');

    for (const category of categories) {
      await addDoc(categoriesCollection, category);
    }

    console.log('Kategoriler başarıyla oluşturuldu');
  } catch (error) {
    console.error('Kategori oluşturulurken hata:', error);
  }
}; 