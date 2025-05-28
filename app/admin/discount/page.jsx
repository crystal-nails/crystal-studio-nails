'use client';

import { useLoading } from '../../contex/LoadingContext';
import { useEffect, useState } from 'react';

export default function AdminDiscount() {
  const [enabled, setEnabled] = useState(true);
  const [reason, setReason] = useState('Ersten Besuch');
  const [amount, setAmount] = useState('10%');
  const [description, setDescription] = useState('');

    const { setLoading } = useLoading();

  useEffect(() => {
    fetch('/api/discount')
      .then((res) => res.json())
      .then((data) => {
        const d = data.discount;
        if (d) {
          setEnabled(d.enabled);
          setReason(d.reason);
          setAmount(d.amount);
          setDescription(d.description);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();


    await fetch('/api/discount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled, reason, amount, description }),
    });

    alert('Секция скидки обновлена!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <h1 className="text-2xl font-bold">Секция скидки</h1>

      <label className="flex items-center space-x-2">
        <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
        <span>Показать секцию скидки</span>
      </label>

      <input
        type="text"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Причина (например: Ersten Besuch)"
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Размер скидки (например: 10%)"
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        className="w-full p-2 border rounded"
        placeholder="Описание скидки"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        { '💾Сохранить'}
      </button>
    </form>
  );
}
