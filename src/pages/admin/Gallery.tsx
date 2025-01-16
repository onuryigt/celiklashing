import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, getDocs, addDoc, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import { storage, db } from '../../config/firebase';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface GalleryImage {
  url: string;
  name: string;
  ref: string;
  category: string;
  timestamp: number;
}

interface Category {
  id: string;
  name: string;
}

const AdminGallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [uploading, setUploading] = useState(false);
  const [uploadCategory, setUploadCategory] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
    loadImages();
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
      if (categoriesList.length > 0) {
        setUploadCategory(categoriesList[0].id);
      }
    } catch (error) {
      console.error('Kategoriler yüklenirken hata oluştu:', error);
    }
  };

  const loadImages = async () => {
    try {
      const storageRef = ref(storage, 'gallery');
      const result = await listAll(storageRef);
      
      if (result.items.length === 0) {
        setImages([]);
        return;
      }

      const imagesCollection = collection(db, 'images');
      const q = selectedCategory === 'all' 
        ? query(imagesCollection, orderBy('timestamp', 'desc'))
        : query(imagesCollection, where('category', '==', selectedCategory), orderBy('timestamp', 'desc'));
      
      const imagesSnapshot = await getDocs(q);
      const imagesData = imagesSnapshot.docs.map(doc => doc.data());

      const imagePromises = result.items.map(async (item) => {
        try {
          const url = await getDownloadURL(item);
          const imageData = imagesData.find(img => img.ref === item.fullPath);
          return imageData ? {
            url,
            name: item.name,
            ref: item.fullPath,
            category: imageData.category,
            timestamp: imageData.timestamp
          } : null;
        } catch (error) {
          console.error('Error getting download URL for item:', item.name, error);
          return null;
        }
      });

      const imageList = (await Promise.all(imagePromises)).filter((img): img is GalleryImage => img !== null);
      setImages(imageList);
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !uploadCategory) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const storageRef = ref(storage, `gallery/${file.name}`);
        await uploadBytes(storageRef, file);
        
        // Add image metadata to Firestore
        const imagesCollection = collection(db, 'images');
        await addDoc(imagesCollection, {
          name: file.name,
          ref: `gallery/${file.name}`,
          category: uploadCategory,
          timestamp: Date.now()
        });
      }
      await loadImages();
    } catch (error) {
      console.error('Dosya yüklenirken hata oluştu:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageRef: string) => {
    try {
      const storageRef = ref(storage, imageRef);
      await deleteObject(storageRef);
      
      // Delete image metadata from Firestore
      const imagesCollection = collection(db, 'images');
      const q = query(imagesCollection, where('ref', '==', imageRef));
      const querySnapshot = await getDocs(q);
      for (const doc of querySnapshot.docs) {
        await deleteDoc(doc.ref);
      }
      
      await loadImages();
    } catch (error) {
      console.error('Resim silinirken hata oluştu:', error);
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
                onClick={() => navigate('/admin/dashboard')}
                className="text-gray-500 hover:text-gray-700"
              >
                ← Geri
              </button>
              <h1 className="ml-4 text-xl font-bold text-gray-800">Galeri Yönetimi</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => navigate('/admin/categories')}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
              >
                Kategorileri Yönet
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Gallery Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Upload Section */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    {categories.find(c => c.id === uploadCategory)?.name || 'Kategori Seç'}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                  <Menu.Items className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {categories.map((category) => (
                        <Menu.Item key={category.id}>
                          {({ active }) => (
                            <button
                              onClick={() => setUploadCategory(category.id)}
                              className={`${
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                              } block px-4 py-2 text-sm w-full text-left`}
                            >
                              {category.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Menu>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading || !uploadCategory}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary file:text-white
                    hover:file:bg-primary-dark
                    disabled:opacity-50"
                />
              </div>
              {uploading && (
                <div className="text-sm text-gray-500">
                  Yükleniyor...
                </div>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6 flex space-x-2">
            <button
              onClick={() => {
                setSelectedCategory('all');
                loadImages();
              }}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Tümü
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  loadImages();
                }}
                className={`px-4 py-2 rounded-md ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image) => (
              <div
                key={image.ref}
                className="relative group bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-200">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => handleDelete(image.ref)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Sil
                    </button>
                  </div>
                </div>
                <div className="p-2 bg-gray-50">
                  <span className="text-xs text-gray-500">
                    {categories.find(c => c.id === image.category)?.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGallery; 