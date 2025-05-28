'use client';

import { useEffect, useState, useRef } from 'react';
import { useLoading } from '../../contex/LoadingContext';

export default function AdminHeroPage() {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [headline, setHeadline] = useState('');
  const [subtext, setSubtext] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isImgUploading, setIsImgUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    fetch('/api/hero')
      .then((res) => res.json())
      .then((data) => {
        const hero = data.hero || {};
        setBackgroundImage(hero.backgroundImage || '');
        setHeadline(hero.headline || '');
        setSubtext(hero.subtext || '');
      })
      .catch((err) => {
        console.error('Ошибка при загрузке Hero:', err);
      })
      .finally(() => setLoading(false)); 
  }, [setLoading]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);

    if (selectedFile) {
      const localUrl = URL.createObjectURL(selectedFile);
      setPreview(localUrl);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsImgUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/uploadHero', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.url) {
        setBackgroundImage(data.url);
        URL.revokeObjectURL(preview);
        setPreview(null);
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        alert('Ошибка загрузки изображения');
      }
    } catch (err) {
      console.error('Ошибка при загрузке:', err);
    } finally {
      setIsImgUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch('/api/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ backgroundImage, headline, subtext }),
      });

      if (!res.ok) throw new Error('Ошибка при сохранении');
      alert('Hero-секция обновлена!');
    } catch (err) {
      console.error(err);
      alert('Не удалось сохранить изменения');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Редактировать Hero-секцию</h1>

      {/* Загрузка изображения */}
      <div>
        <label className="block font-medium mb-1">Изображение фона:</label>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={handleUpload}
          disabled={!file || isImgUploading}
          className="bg-gray-700 text-white px-3 py-1 rounded ml-2"
        >
          {isImgUploading ? 'Загрузка...' : 'Загрузить'}
        </button>
        {(preview || backgroundImage) && (
          <img
            src={preview || backgroundImage}
            alt="Hero preview"
            className="mt-2 border max-h-60"
          />
        )}
      </div>

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
