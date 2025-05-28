'use client';

import { useEffect, useState } from 'react';

export default function MapSection() {
  const [address, setAddress] = useState('');

  useEffect(() => {
    fetch('/api/map')
      .then((res) => res.json())
      .then((data) => setAddress(data.address));
  }, []);

  return (
    <section id="section-3" className="p-8 container mx-auto">
      <h2 className="text-5xl font-bold mb-4">Adresse</h2>
      <p className="mb-4">{address}</p>
      {address && (
        <iframe
          title="Google Maps"
          width="100%"
          height="400"
          className="rounded-lg border"
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
        />
      )}
    </section>
  );
}
