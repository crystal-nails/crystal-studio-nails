'use client';

import { useEffect } from 'react';
import { useLoading } from '../contex/LoadingContext';


export default function AdminHomePage() {
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Добро пожаловать в Админку</h1>
      <p>Выберите раздел в меню слева, чтобы редактировать содержимое сайта.</p>
    </div>
  );
}