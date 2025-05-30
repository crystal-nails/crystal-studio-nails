import './globals.css';
import { Alegreya_Sans_SC, Pompiere, Great_Vibes, Playfair_Display, Montserrat } from 'next/font/google';
import { LoadingProvider } from './contex/LoadingContext';
import GlobalLoader from './components/GlobalLoader';

// Google Fonts
const alegreyaSansSC = Alegreya_Sans_SC({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '800', '900'],
  variable: '--font-alegreya-sans-sc',
});

const pompiere = Pompiere({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pompiere',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-playfair',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
});

// ✅ Используем metadata вместо <Head>
export const metadata = {
  title: 'Nagelstudio – Crystal Nails Studio',
  description: 'Buchen Sie Ihren Termin über WhatsApp: +49 160 15 00 544.',
  icons: {
    icon: [
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon.ico', rel: 'shortcut icon' },
      { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
  other: {
    'preload-image': '<link rel="preload" as="image" href="/uploads/hero/hero.webp">'
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ru"
      className={`${alegreyaSansSC.variable} ${pompiere.variable} ${greatVibes.variable} ${playfair.variable} ${montserrat.variable}`}
    >
      <body className="antialiased font-sans">
        <LoadingProvider>
          <GlobalLoader />
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
