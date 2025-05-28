'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const ProposSliderSection = ({ items = [] }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleExpand = (itemId, e) => {
    e.stopPropagation();
    setExpandedItemId(expandedItemId === itemId ? null : itemId);
  };

  if (!Array.isArray(items)) {
    return null;
  }

  return (
    <section className="py-10 px-4 mx-auto relative">
      <button
        ref={prevRef}
        className="absolute w-[50px] h-[50px] left-[-10px] top-1/2 transform -translate-y-1/2 z-10 text-[#B8860B] hover:text-[#D4AF37] cursor-pointer"
        aria-label="Vorherige Folie"
      >
        <svg width={50} height={50} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        ref={nextRef}
        className="absolute w-[50px] h-[50px] right-[-10px] top-1/2 transform -translate-y-1/2 z-10 text-[#B8860B] hover:text-[#D4AF37] cursor-pointer"
        aria-label="Nächste Folie"
      >
        <svg width={50} height={50} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          if (swiper.params.navigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item._id || index} className="!h-auto">
            <div className="group relative overflow-hidden rounded-lg flex flex-col h-full">
              <div className="absolute p-2 text-[#073891] rounded-3xl font-semibold top-5 right-5 bg-[#B8860B] z-10">{item.price} &euro;</div>
              <img
                src={item.backgroundImage}
                alt={item.headline}
                className="w-full h-60 object-cover transform duration-300 group-hover:scale-105"
              />
              <h3 className="flex text-center justify-center items-center text-xl font-bold min-h-30 overflow-hidden p-2 bg-[#073891]">
                {item.headline}
              </h3>

              {isMobile ? (
                <>
                  <div
                    className={`bg-[#073891] text-sm overflow-hidden transition-all duration-500 ease-in-out ${
                      expandedItemId === (item._id || index) ? 'max-h-[500px]' : 'max-h-0'
                    }`}
                  >
                    <div className="p-4">
                      <p className="mb-2 overflow-y-auto max-h-[80%]">{item.subtext}</p>
                      <button
                        onClick={(e) => handleToggleExpand(item._id || index, e)}
                        className="mt-2 text-md font-bold py-1 px-3 rounded-full bg-blue-700 hover:bg-blue-800 cursor-pointer"
                        aria-label="Weniger anzeigen"
                      >
                        Weniger anzeigen
                      </button>
                    </div>
                  </div>
                  {expandedItemId !== (item._id || index) && (
                    <div className="bg-[#073891] p-2 flex justify-center">
                      <button
                        onClick={(e) => handleToggleExpand(item._id || index, e)}
                        className="text-md font-bold py-1 px-3 rounded-full bg-blue-700 hover:bg-blue-800 cursor-pointer"
                        aria-label="Mehr anzeigen"
                      >
                        Mehr anzeigen
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <p className="text-white text-center">{item.subtext}</p>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProposSliderSection;