'use client';

import { useEffect, useState } from 'react';

export default function DiscountBanner() {
  const [discount, setDiscount] = useState(null);

  useEffect(() => {
    fetch('/api/discount')
      .then((res) => res.json())
      .then((data) => setDiscount(data.discount));
  }, []);

  return (
    <div className="relative min-h-[100px]">
      {discount?.enabled ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
          <h3 className="text-xl font-bold text-yellow-800">
            {discount.reason}: {discount.amount} Rabatt
          </h3>
          <p className="text-yellow-700 mt-1">{discount.description}</p>
        </div>
      ) : null}
    </div>
  );
}