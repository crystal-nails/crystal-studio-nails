'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [hero, setHero] = useState(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const getHeaderHeight = () => {
      const headerElement = document.querySelector('header');
      if (headerElement) {
        setHeaderHeight(headerElement.offsetHeight);
      } else {
        setHeaderHeight(0); 
      }
    };

    fetch('/api/hero')
      .then((res) => res.json())
      .then((data) => setHero(data.hero))
      .catch((error) => console.error('Ошибка загрузки данных Hero:', error));

    getHeaderHeight();
    window.addEventListener('resize', getHeaderHeight);

    return () => {
      window.removeEventListener('resize', getHeaderHeight);
    };
  }, []);

  if (!hero) return null;

  return (
    <section
      className="relative w-full bg-cover bg-center flex items-center justify-center text-white text-center"
      style={{
        backgroundImage: `url(${hero.backgroundImage})`,
        paddingTop: `${headerHeight}px`,
        minHeight: `calc(80vh - ${headerHeight}px)`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30 z-0" />

      <div className="relative z-10 container px-4 py-8 md:p-8 rounded-lg bg-[#073891]/80 mx-3 mb-10">
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-4 uppercase leading-tight">
          {hero.headline}
        </h1>
        <p className="text-sm xs:text-base sm:text-lg md:text-2xl uppercase inline text-[#B8860B] tracking-[1px] md:tracking-[3px] leading-tight">
          {hero.subtext}
        </p>
      </div>
    </section>
  );
}