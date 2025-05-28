'use client';

import { useState, useEffect } from 'react';
import { useLoading } from '../../contex/LoadingContext';

export default function AdminHeaderPage() {
  const [form, setForm] = useState({
    navigation1: '',
    navigation2: '',
    navigation3: '',
    navigation4: '',
    navigation5: '',
    navigation6: '',
    bookingLink: ''
  });
  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchHeader = async () => {
      const res = await fetch('/api/getHeader');
      const data = await res.json();

      if (data.header) {
        setForm({
          navigation1: data.header.navigation1 || '',
          navigation2: data.header.navigation2 || '',
          navigation3: data.header.navigation3 || '',
          navigation4: data.header.navigation4 || '',
          navigation5: data.header.navigation5 || '',
          navigation6: data.header.navigation6 || '',
          bookingLink: data.header.bookingLink || '',
        });
      }
    };

    fetchHeader()
    .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      navigation1: form.navigation1,
      navigation2: form.navigation2,
      navigation3: form.navigation3,
      navigation4: form.navigation4,
      navigation5: form.navigation5,
      navigation6: form.navigation6,
      bookingLink: form.bookingLink
    };

    const res = await fetch('/api/createHeader', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Редактирование Хедера</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="navigation1"
          placeholder="Навигация 1"
          value={form.navigation1}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="navigation2"
          placeholder="Навигация 2"
          value={form.navigation2}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="navigation3"
          placeholder="Навигация 3"
          value={form.navigation3}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="navigation4"
          placeholder="Навигация 4"
          value={form.navigation4}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
            <input
          name="navigation5"
          placeholder="Навигация 5"
          value={form.navigation5}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
            <input
          name="navigation6"
          placeholder="Навигация 6"
          value={form.navigation6}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
           <input
          name="bookingLink"
          placeholder="Ссылка WhatsApp"
          value={form.bookingLink}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
         💾 Сохранить
        </button>
      </form>
    </div>
  );
}