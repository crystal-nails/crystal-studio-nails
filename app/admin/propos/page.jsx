'use client';

import { useEffect, useState, useRef } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from '@hello-pangea/dnd';
import { useLoading } from '../../contex/LoadingContext';

export default function AdminProposPage() {
  const [sections, setSections] = useState([]);
  const [headline, setHeadline] = useState('');
  const [subtext, setSubtext] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingSections, setUploadingSections] = useState({});
  const fileInputRef = useRef(null);

  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    fetch('/api/ourPropos')
      .then((res) => res.json())
      .then((data) => {
        const propos = data.propos;
        if (propos?.items?.length > 0) {
          setSections(propos.items);
        }
      })
      .catch((err) => console.error('Ошибка загрузки секций:', err))
      .finally(() => setLoading(false));
  }, [setLoading]);

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    try {
      const createRes = await fetch('/api/ourPropos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headline, subtext, price }),
      });

      const createData = await createRes.json();
      if (!createRes.ok || !createData.propos?.items?.length) throw new Error('Ошибка создания');

      const newSectionFromServer = createData.propos.items.at(-1);
      const newSectionId = newSectionFromServer._id;
      const formData = new FormData();
      formData.append('file', file);

         setSections((prev) => {
        const updatedSections = prev.map((s) =>
          s._id === sectionId ? { ...s, backgroundImage: newImageUrl } : s
        );
        console.log('Sections updated in UI state with new image URL.');
        return updatedSections;
      });

      const imageRes = await fetch(`/api/uploadOurProposImage?id=${newSectionId}`, {
        method: 'POST',
        body: formData,
      });

      const imageData = await imageRes.json();
     const imageUrl = imageData?.imageUrl;

      await fetch('/api/ourPropos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: newSectionId, backgroundImage: imageUrl }),
      });

      setSections((prevSections) =>
        prevSections.map((section) =>
          section._id === newSectionId ? { ...section, backgroundImage: imageUrl } : section
        )
      );

      setHeadline('');
      setSubtext('');
      setPrice('');
      setFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error('Ошибка при добавлении секции:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = async (e, sectionId) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      console.log('No file selected.');
      return;
    }

    setUploadingSections((prev) => ({ ...prev, [sectionId]: true }));
    console.log(`Starting image upload for sectionId: ${sectionId}`);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      console.log('Sending POST request to /api/uploadOurProposImage');
      const res = await fetch(`/api/uploadOurProposImage?id=${sectionId}`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Image upload API responded with error:', res.status, errorText);
        throw new Error(`Image upload failed: ${res.status} ${errorText}`);
      }

      const data = await res.json();
      console.log('Response from /api/uploadOurProposImage:', data);

     const newImageUrl = data?.imageUrl;
      if (!newImageUrl || typeof newImageUrl !== 'string') {
        console.error('Invalid image URL received from API:', newImageUrl);
        throw new Error('Received invalid image URL from server.');
      }
      console.log('New image URL from Cloudinary:', newImageUrl);

      console.log('Sending PUT request to /api/ourPropos to update backgroundImage');
      const putRes = await fetch('/api/ourPropos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: sectionId,
          backgroundImage: newImageUrl, 
        }),
      });

      if (!putRes.ok) {
        const errorText = await putRes.text();
        console.error('PUT /api/ourPropos responded with error:', putRes.status, errorText);
        throw new Error(`Failed to update section with new image: ${putRes.status} ${errorText}`);
      }
      console.log('PUT /api/ourPropos successful.');


      setSections((prev) => {
        const updatedSections = prev.map((s) =>
          s._id === sectionId ? { ...s, backgroundImage: newImageUrl } : s
        );
        console.log('Sections updated in UI state with new image URL.');
        return updatedSections;
      });

    } catch (err) {
      console.error('Ошибка при обработке изменения изображения:', err);
    } finally {
      setUploadingSections((prev) => ({ ...prev, [sectionId]: false }));
      console.log(`Image upload process finished for sectionId: ${sectionId}`);
    }
  };

  const handleDelete = async (index) => {
    const id = sections[index]._id;
    const res = await fetch(`/api/ourPropos?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setSections((prev) => prev.filter((s) => s._id !== id));
    }
  };

  const handleEdit = async (index, newHeadline, newPrice, newSubtext) => {
    const section = sections[index];
    const res = await fetch('/api/ourPropos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: section._id,
        headline: newHeadline,
        subtext: newSubtext,
        backgroundImage: section.backgroundImage,
        price: newPrice || '',
      }),
    });

    if (res.ok) {
      setSections((prev) =>
        prev.map((s, i) =>
          i === index ? { ...s, headline: newHeadline, subtext: newSubtext, price: newPrice } : s
        )
      );
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const items = Array.from(sections);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setSections(items);

    await fetch('/api/reorder', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: items.map((item) => item._id) }),
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Редактировать секцию OurPropos</h1>

      <div className="space-y-4">
        <input
          type="text"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          placeholder="Заголовок"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Цена"
          className="w-full p-2 border rounded"
        />
        <textarea
          value={subtext}
          onChange={(e) => setSubtext(e.target.value)}
          placeholder="Подтекст"
          className="w-full p-2 border rounded"
          rows={3}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            const selected = e.target.files?.[0];
            setFile(selected);
            setPreview(selected ? URL.createObjectURL(selected) : null);
          }}
        />
        {preview && <img src={preview} alt="Preview" className="mt-2 max-h-60 border" />}

        <button
          type="button"
          onClick={handleUpload}
          disabled={isUploading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isUploading ? 'Загрузка...' : 'Добавить секцию'}
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="mt-8 space-y-4">
              {sections.map((section, index) => (
                <Draggable key={section._id} draggableId={section._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 border rounded bg-blue-700 text-white"
                    >
                      <input
                        type="text"
                        value={section.headline}
                        onChange={(e) =>
                          handleEdit(index, e.target.value, section.price, section.subtext)
                        }
                        className="font-semibold text-lg w-full bg-transparent border-b border-white focus:outline-none"
                      />
                      <input
                        type="text"
                        value={section.price}
                        onChange={(e) =>
                          handleEdit(index, section.headline, e.target.value, section.subtext)
                        }
                        className="font-semibold text-lg w-full bg-transparent border-b border-white focus:outline-none"
                      />
                      <textarea
                        value={section.subtext}
                        onChange={(e) =>
                          handleEdit(index, section.headline, section.price, e.target.value)
                        }
                        className="text-sm w-full mt-1 bg-transparent border-b border-white focus:outline-none"
                        rows={3}
                      />

                      {section.backgroundImage && (
                        <div className="mt-2 relative">
                          <img
                            src={section.backgroundImage}
                            alt="Секция"
                            className="border max-h-60 w-full object-cover"
                          />
                          {uploadingSections[section._id] && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm">
                              Загрузка...
                            </div>
                          )}
                        </div>
                      )}

                      <label className="block mt-2 cursor-pointer text-sm underline">
                        Изменить фото
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, section._id)}
                          className="hidden"
                        />
                      </label>

                      <button
                        onClick={() => handleDelete(index)}
                        className="mt-2 bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Удалить
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
