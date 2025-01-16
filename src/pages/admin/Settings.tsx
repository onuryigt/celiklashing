import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';

interface SiteSettings {
  siteName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  footerText: string;
}

const defaultSettings: SiteSettings = {
  siteName: 'Çelik Lashing',
  logo: '/logo.png',
  primaryColor: '#1E40AF',
  secondaryColor: '#60A5FA',
  footerText: '© 2024 Çelik Lashing. Tüm hakları saklıdır.'
};

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // LocalStorage'dan ayarları yükle
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const storageRef = ref(storage, `settings/logo.${file.name.split('.').pop()}`);
      await uploadBytes(storageRef, file);
      const logoUrl = await getDownloadURL(storageRef);
      setSettings({ ...settings, logo: logoUrl });
    } catch (error) {
      console.error('Logo yüklenirken hata oluştu:', error);
    }
  };

  const handleSave = () => {
    setSaving(true);
    try {
      localStorage.setItem('siteSettings', JSON.stringify(settings));
      // Burada ayarları uygula
      document.documentElement.style.setProperty('--color-primary', settings.primaryColor);
      document.documentElement.style.setProperty('--color-secondary', settings.secondaryColor);
    } catch (error) {
      console.error('Ayarlar kaydedilirken hata oluştu:', error);
    } finally {
      setSaving(false);
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
              <h1 className="ml-4 text-xl font-bold text-gray-800">Site Ayarları</h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Settings Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Site Adı */}
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                  Site Adı
                </label>
                <input
                  type="text"
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              {/* Logo */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Logo</label>
                <div className="mt-1 flex items-center">
                  <img src={settings.logo} alt="Logo" className="h-12 w-auto" />
                  <label className="ml-5 cursor-pointer">
                    <span className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      Değiştir
                    </span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                  </label>
                </div>
              </div>

              {/* Renkler */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">
                    Ana Renk
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="color"
                      id="primaryColor"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      className="h-8 w-8 rounded-md border border-gray-300"
                    />
                    <input
                      type="text"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      className="ml-2 block rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700">
                    İkincil Renk
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="color"
                      id="secondaryColor"
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                      className="h-8 w-8 rounded-md border border-gray-300"
                    />
                    <input
                      type="text"
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                      className="ml-2 block rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Footer Metni */}
              <div>
                <label htmlFor="footerText" className="block text-sm font-medium text-gray-700">
                  Footer Metni
                </label>
                <input
                  type="text"
                  id="footerText"
                  value={settings.footerText}
                  onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
            >
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings; 