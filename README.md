# Çelik Lashing & Port Services

Kurumsal web sitesi. React + TypeScript + Vite, Tailwind CSS, Firebase (galeri ve
admin paneli), EmailJS (iletişim formu).

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + vite build -> dist/
npm run preview
npm run lint
```

### Ortam değişkenleri

Proje kökünde `.env` dosyası oluşturun (depoya işlenmez):

```
VITE_EMAILJS_PUBLIC_KEY=...
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
```

`VITE_` önekli değerler derleme sırasında istemci paketine gömülür, yani gizli
değildir. Gizli tutulması gereken hiçbir anahtarı buraya koymayın.

Firebase yapılandırması `src/config/firebase.ts` içindedir.

## Sık yapılan değişiklikler

| Ne değişecek | Nerede |
| --- | --- |
| Telefon, adres, e-posta, sosyal medya | `src/config/site.ts` |
| Ana sayfadaki sayaçlar (1000+, 600+ …) | `src/config/site.ts` → `STATS` |
| Referans firmalar ve örnek projeler | `src/config/proof.ts` |
| Renk paleti ve fontlar | `tailwind.config.js` |
| Sayfa başlıkları / SEO açıklamaları | `src/config/seo.ts` |

**Deneyim yılı elle yazılmaz.** `src/config/site.ts` içindeki `FOUNDED_YEAR`
değerinden hesaplanır (`yearsInBusiness()`), böylece her yıl kendiliğinden
güncellenir.

**Referanslar boşken görünmez.** `src/config/proof.ts` içindeki `CLIENTS` ve
`CASES` dizileri boş olduğu sürece ilgili bölümler hiç render edilmez; boş
çerçeve veya uydurma isim çıkmaz. Gerçek referanslarınızı ekleyince bölümler
kendiliğinden görünür.

## Görseller

`public/` altındaki fotoğraflar WebP formatındadır. Yeni fotoğraf eklerken de
WebP'ye çevirin — JPG'den yaklaşık %85 daha küçük oluyor.

Sosyal medya paylaşım görseli `public/og-image.jpg` (1200×630). WhatsApp ve
bazı tarayıcılar önizlemede WebP'yi desteklemediği için bu dosya bilerek JPG.

## Yapı

```
src/
  components/     Navbar, Footer, kart ve animasyon bileşenleri
  config/         site.ts (firma bilgileri), proof.ts (referanslar), firebase.ts
  hooks/          useSeo — sayfa başlığı ve paylaşım etiketleri
  layouts/        MainLayout (genel), AdminLayout (yönetim)
  pages/          Sayfalar; pages/admin altında yönetim ekranları
```

## Erişilebilirlik ve hareket

Tüm animasyonlar `prefers-reduced-motion` tercihine saygı duyar. Yeni bir
animasyon eklerken framer-motion'ın `useReducedMotion()` hook'unu kullanın ya da
salt CSS animasyonlarını `motion-safe:` öneki ile yazın.

## SEO ve prerender

Site tek sayfa uygulaması; başlık ve paylaşım etiketlerini normalde JavaScript
yazar. **Ama WhatsApp, Facebook, LinkedIn ve X'in önizleme botları JavaScript
çalıştırmaz** — bu yüzden `vite build` sonunda çalışan `celik-prerender`
eklentisi (`vite.config.ts`) her rota için gerçek statik HTML üretir:

```
dist/hizmetler/vci-koruma/index.html   ← kendi başlığı, açıklaması, canonical'ı
```

Vercel dosya sistemini `rewrites` kuralından önce kontrol ettiği için bu
dosyalar servis edilir; bilinmeyen adresler `vercel.json`'daki SPA yedeğine
düşer.

**Bir sayfanın başlığını/açıklamasını değiştirmek için tek yer:
`src/config/seo.ts`.** Hem tarayıcıdaki `useSeo` hook'u hem prerender eklentisi
hem de `sitemap.xml` bu dosyadan beslenir — üçünün arası açılamaz.

Yeni bir sayfa eklerken `seo.ts`'e kaydını yazmayı unutmayın; aksi halde
prerender edilmez ve sitemap'e girmez.

Prerender, `index.html` içindeki etiketleri bulup değiştirerek çalışır. Bir
etiketi silerseniz **build bilerek kırılır** (sessizce yanlış çıktı üretmesin
diye). Hata mesajı hangi etiketin kaybolduğunu söyler.

### Sizin yapmanız gerekenler

- **Google Search Console**: alan adını doğrulayıp `sitemap.xml`'i gönderin.
  Bu adım alan adı sahipliği gerektirdiği için koddan yapılamaz.
- Analytics kurulu değil; ziyaretçi sayısı şu an ölçülmüyor.
