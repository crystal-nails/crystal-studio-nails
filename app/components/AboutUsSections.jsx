'use client';

import { useEffect, useState } from 'react';

export default function AboutUsSections() {
  const [sections, setSections] = useState([]);
  const [activeCardId, setActiveCardId] = useState(null);

  useEffect(() => {
    fetch('/api/about-sections')
      .then((res) => res.json())
      .then((data) => setSections(data.sections))
      .catch((err) => console.error('Failed to fetch sections:', err)); 
  }, []);

  if (sections.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600">
        Загрузка секций...
      </div>
    );
  }

  const firstSection = sections[0];
  const remainingSections = sections.slice(1);

  return (
    <>

      <section id="section-0" className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {firstSection.imageUrl?.url && (
            <div className="w-full h-[400px] lg:w-[30%]">
              <div className="aspect-w-4 aspect-h-3 flex justify-center">
                <img
                  src={firstSection.imageUrl.url}
                  alt={firstSection.title}
                  className="h-[400px] object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          )}
          <div className="space-y-4 md:w-[70%] lg:w-[100%]">
            <h2 className="text-5xl font-bold text-[#B8860B]">{firstSection.title}</h2>
            <p className="text-gray-700 whitespace-pre-line">{firstSection.content}</p>
            {firstSection.cta && (
              <button className="mt-2 bg-[#B8860B] text-white px-6 py-3 rounded-full hover:bg-[#D4AF37] font-semibold">
                {firstSection.cta}
              </button>
            )}
          </div>
        </div>
      </section>


      {remainingSections.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="grid gap-20 md:grid-cols-2 lg:grid-cols-3">
            {remainingSections.map((sec) => (
              <div
                key={sec._id}
                className="shadow-md rounded-lg overflow-hidden relative cursor-pointer"
                onMouseEnter={() => setActiveCardId(sec._id)}
                onMouseLeave={() => setActiveCardId(null)}
                onFocus={() => setActiveCardId(sec._id)} 
                onBlur={() => setActiveCardId(null)}   
                tabIndex="0" 
              >
                {sec.imageUrl?.url && (
                  <img
                    src={sec.imageUrl.url}
                    alt={sec.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <div className="bg-[#073891] text-white p-4 rounded-b-lg min-h-25 h-[100%]">
                  <h3 className="text-xl font-semibold">{sec.title}</h3>
                  <p className="text-sm">{sec.content.substring(0, 200)}</p>
                </div>


                {activeCardId === sec._id && (
                  <div className="absolute inset-0 bg-[#073891]/90 text-white p-4 flex flex-col justify-center items-center text-center rounded-lg opacity-100 transition-opacity duration-300">
                    <h3 className="text-xl font-semibold mb-2">{sec.title}</h3>
                    <p className="text-sm overflow-y-auto max-h-[80%]">{sec.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}