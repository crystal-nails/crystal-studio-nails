'use client';

import { useEffect, useState } from 'react';
import { useLoading } from '../../contex/LoadingContext';

export default function AdminMapSection() {
  const [address, setAddress] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { setLoading } = useLoading(); 

  useEffect(() => {
    setLoading(true);
    fetch('/api/map')
      .then((res) => res.json())
      .then((data) => setAddress(data.address || ''))
      .catch((err) => {
        console.error('Ошибка при загрузке адреса:', err);
      })
      .finally(() => setLoading(false));
  }, [setLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await fetch('/api/map', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });
      alert('Адрес обновлён!');
    } catch (err) {
      console.error('Ошибка при сохранении:', err);
      alert('Не удалось обновить адрес.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Редактировать адрес</h1>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Введите адрес"
      />
      <button
        type="submit"
        disabled={isSaving}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isSaving ? 'Сохраняем...' : '💾 Сохранить'}
      </button>
    </form>
  );
}
