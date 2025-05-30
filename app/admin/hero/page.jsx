'use client';

import { useEffect, useState } from 'react';
import { useLoading } from '../../contex/LoadingContext';

export default function AdminHeroPage() {
  const [headline, setHeadline] = useState('');
  const [subtext, setSubtext] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    fetch('/api/hero')
      .then((res) => res.json())
      .then((data) => {
        const hero = data.hero || {};
        setHeadline(hero.headline || '');
        setSubtext(hero.subtext || '');
      })
      .catch((err) => {
        console.error('Ошибка при загрузке Hero:', err);
      })
      .finally(() => setLoading(false));
  }, [setLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch('/api/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headline, subtext }),
      });

      if (!res.ok) throw new Error('Ошибка при сохранении');
      alert('Hero-секция обновлена!');
    } catch (err) {
      alert('Не удалось сохранить изменения');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Редактировать Hero-секцию</h1>

      {/* Заголовок */}
      <div>
        <label className="block font-medium mb-1">Заголовок:</label>
        <input
          type="text"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Подтекст */}
      <div>
        <label className="block font-medium mb-1">Подтекст:</label>
        <textarea
          value={subtext}
          onChange={(e) => setSubtext(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />
      </div>

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