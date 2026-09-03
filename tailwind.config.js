/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Liman paleti: emniyet turuncusu (uyarı/vurgu) + patina yeşili (güven/eylem). */
        hazard: {
          DEFAULT: "#BF3F09",
          ink: "#8F3007",
          soft: "#FAE8DE",
          /* Koyu fotograf uzerinde kullanilan acik ton: #BF3F09 koyu zeminde
             ~3.4:1 kaliyor, bu ton ~7:1 veriyor. */
          light: "#F0763F",
        },
        secure: {
          DEFAULT: "#146A64",
          ink: "#0E4F4A",
          soft: "#DBEBE9",
          /* Koyu zeminde patina */
          light: "#4FB6AE",
        },
        /* Sinema kaydı: ana sayfanın karanlık liman zemini. Saf siyah değil,
           çelik-mavi eğimli. */
        night: {
          DEFAULT: "#0B0F11",
          panel: "#121719",
          raised: "#1A2124",
        },
        /* Nötrler saf gri değil; palete doğru hafif çelik/yeşil eğimli. */
        steel: {
          50: "#F5F7F6",
          100: "#EDEFEE",
          200: "#E3E8E7",
          300: "#D1D8D7",
          400: "#B5C0BF",
          500: "#7A858B",
          600: "#4D585E",
          700: "#2F383D",
          800: "#212A2E",
          900: "#161A1C",
        },
        /* Eski kodun tamamı `primary`/`secondary` kullanıyor; yeniden
           eşlendikleri için tek noktadan renk değişimi sağlanıyor. */
        primary: "#146A64",
        secondary: "#4D585E",
      },
      fontFamily: {
        display: ['Oswald', 'Arial Narrow', 'Impact', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        label: '0.09em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(22,26,28,.05), 0 10px 28px -14px rgba(22,26,28,.22)',
        lift: '0 2px 4px rgba(22,26,28,.06), 0 18px 40px -18px rgba(22,26,28,.30)',
      },
      transitionTimingFunction: {
        /* Gerilip yerine oturan his — lashing metaforunun hareket karşılığı. */
        tension: 'cubic-bezier(.2,.85,.3,1)',
        snap: 'cubic-bezier(.3,1.4,.5,1)',
      },
    },
  },
  plugins: [],
}
