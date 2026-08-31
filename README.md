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
| Sayfa başlıkları / SEO açıklamaları | ilgili sayfadaki `useSeo({ … })` |

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
