'use client';

import { useEffect, useState } from 'react';
import ProposSliderSection from './ProposSection';

export default function OurProposPage() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch('/api/ourPropos')
      .then((res) => res.json())
      .then((data) => {
        if (data.propos?.items) {
          setSections(data.propos.items);
        }
      });
  }, []);

  if (!sections.length) return null;

  return (
    <section id="section-1" className="container mx-auto p-4">
      <h2 className="text-5xl font-bold mb-4">Unsere Angebote</h2>
      <ProposSliderSection items={sections} />
    </section>
  );
}