'use client';

import { useEffect, useState, useRef } from 'react';
import { useLoading } from '../../contex/LoadingContext';

export default function AdminGalleryPage() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const fileRef = useRef();
  const { setLoading } = useLoading();

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then(setImages)
      .finally(() => setLoading(false));
  }, []);

  const handleUpload = async () => {
    if (!file || uploading) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/uploadGallery', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Ошибка загрузки');

      const newImage = await res.json();
      setImages((prev) => [newImage, ...prev]);
      setFile(null);
      fileRef.current.value = '';
      setMessage({ type: 'success', text: 'Файл успешно загружен!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Не удалось загрузить файл.' });
    } finally {
      setUploading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
    setImages((prev) => prev.filter((img) => img._id !== id));
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Галерея: управление фото</h1>

      {/* Уведомление */}
      {message && (
        <div
          className={`mb-4 p-3 rounded text-white ${
            message.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex items-center gap-4 mb-6">
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!file || uploading}
        >
          {uploading ? 'Загрузка...' : 'Загрузить'}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="relative">
            <img
              src={img.url}
              alt=""
              className="w-full object-cover rounded shadow"
            />
            <button
              onClick={() => handleDelete(img._id)}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
