import { Alegreya_Sans_SC } from 'next/font/google';
import { Pompiere } from 'next/font/google';
import { Great_Vibes, Playfair_Display } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { LoadingProvider } from './contex/LoadingContext';
import GlobalLoader from './components/GlobalLoader';

const pompiere = Pompiere({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-allura',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
});

const alegreyaSansSC = Alegreya_Sans_SC({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '800', '900'],
  variable: '--font-alegreya-sans-sc',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-greatVibes',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-playfair',
});

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
  appleWebApp: {
    title: 'Crystal nails',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${pompiere.variable} ${alegreyaSansSC.variable} ${greatVibes.variable} ${playfair.variable} ${montserrat.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playwrite+Danmark+Loopet&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans">
        <LoadingProvider>
          <GlobalLoader />
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}