'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLoading } from '../../contex/LoadingContext';



export default function AdminFooterSettings() {
    const [data, setData] = useState({
        links: [],
        social: {} 
      });
  const [logoPreview, setLogoPreview] = useState('');
    const { setLoading } = useLoading();

  useEffect(() => {
    fetch('/api/footer')
      .then((res) => res.json())
      .then((res) => {
        setData(prevData => ({
          ...prevData,
          ...res.footer,
          social: {
            ...prevData.social, 
            ...res.footer?.social
          },
        }));
        setLogoPreview(res.footer?.logoUrl || '')
      })
      .finally(() => setLoading(false))
  }, []);

  const updateField = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleLinkChange = (i, key, value) => {
    const updated = [...data.links];
    updated[i][key] = value;
    updateField('links', updated);
  };

  const addLink = () => {
    updateField('links', [...data.links, { label: '', url: '' }]);
  };

  const removeLink = (i) => {
    const updated = data.links.filter((_, index) => index !== i);
    updateField('links', updated);
  };

  const handleLogoUpload = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const res = await fetch('/api/upload-logo', { method: 'POST', body: formData });
    const result = await res.json();
    updateField('logoUrl', result.url);
    setLogoPreview(result.url);
  };

  const save = async () => {
    await fetch('/api/footer', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    alert('Сохранено');
  };

  console.log(data);

  if (!data) return <p>Загрузка...</p>;



  return (
    <div className="p-6 shadow rounded space-y-4">
      <h2 className="text-xl font-bold">Настройки футера</h2>

      <label className="block font-medium">Логотип</label>
      {logoPreview && <Image src={logoPreview} width={100} height={40} alt="logo preview" />}
      <input type="file" onChange={handleLogoUpload} />

      <label className="block font-medium">Телефон</label>
      <input
        className="border p-2 w-full"
        value={data.phone ? data.phone : ''}
        onChange={(e) => updateField('phone', e.target.value)}
      />

      <label className="block font-medium">Адрес</label>
      <input
        className="border p-2 w-full"
        value={data.address ? data.address : ''}
        onChange={(e) => updateField('address', e.target.value)}
      />

      <label className="block font-medium">Копирайт</label>
      <input
        className="border p-2 w-full"
        value={data.copyright  ? data.copyright : ''}
        onChange={(e) => updateField('copyright', e.target.value)}
      />

      <div>
        <label className="block font-medium">Ссылки</label>
        {data.links.map((link, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              className="border p-1 flex-1"
              placeholder="Название"
              value={link.label}
              onChange={(e) => handleLinkChange(i, 'label', e.target.value)}
            />
            <input
              className="border p-1 flex-1"
              placeholder="URL"
              value={link.url}
              onChange={(e) => handleLinkChange(i, 'url', e.target.value)}
            />
            <button onClick={() => removeLink(i)} className="text-red-500">Удалить</button>
          </div>
        ))}
        <button onClick={addLink} className="text-blue-600 mt-2">+ Добавить ссылку</button>
      </div>

      <div>
        <label className="block font-medium">Instagram</label>
        <input
          className="border p-2 w-full"
          value={data.social.instagram ? data.social.instagram : ''}
          onChange={(e) => updateField('social', { ...data.social, instagram: e.target.value })}
        />
        <label className="block font-medium mt-2">TikTok</label>
        <input
          className="border p-2 w-full"
          value={data.social.tiktok ? data.social.tiktok : ''}
          onChange={(e) => updateField('social', { ...data.social, tiktok: e.target.value })}
        />
        <label className="block font-medium mt-2">WhatsApp</label>
        <input
          className="border p-2 w-full"
          value={data.social.whatsapp ? data.social.whatsapp : ''}
          onChange={(e) => updateField('social', { ...data.social, whatsapp: e.target.value })}
        />
      </div>

      <button onClick={save} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        💾 Сохранить
      </button>
    </div>
  );
}
