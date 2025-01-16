import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface Category {
  id: string;
  name: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const categoriesCollection = collection(db, 'categories');
      const categoriesSnapshot = await getDocs(categoriesCollection);
      const categoriesList = categoriesSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name
      }));
      setCategories(categoriesList);
    } catch (error) {
      console.error('Kategoriler yüklenirken hata oluştu:', error);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setIsLoading(true);
    try {
      const categoriesCollection = collection(db, 'categories');
      await addDoc(categoriesCollection, {
        name: newCategoryName.trim()
      });
      setNewCategoryName('');
      await loadCategories();
    } catch (error) {
      console.error('Kategori eklenirken hata oluştu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) return;

    try {
      const categoryRef = doc(db, 'categories', categoryId);
      await deleteDoc(categoryRef);
      await loadCategories();
    } catch (error) {
      console.error('Kategori silinirken hata oluştu:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/admin/gallery')}
                className="text-gray-500 hover:text-gray-700"
              >
                ← Geri
              </button>
              <h1 className="ml-4 text-xl font-bold text-gray-800">Kategori Yönetimi</h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Categories Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Add Category Form */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
            <form onSubmit={handleAddCategory} className="flex items-center space-x-4">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Yeni kategori adı"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !newCategoryName.trim()}
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? 'Ekleniyor...' : 'Ekle'}
              </button>
            </form>
          </div>

          {/* Categories List */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
                >
                  <span className="text-gray-900">{category.name}</span>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-600 hover:text-red-800 focus:outline-none"
                  >
                    Sil
                  </button>
                </li>
              ))}
              {categories.length === 0 && (
                <li className="px-6 py-4 text-gray-500 text-center">
                  Henüz kategori eklenmemiş
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories; 