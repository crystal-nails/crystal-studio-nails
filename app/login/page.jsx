'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoading } from '../contex/LoadingContext';


export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { setLoading } = useLoading();

  useEffect(() => {
 
    setLoading(false);
  }, [setLoading]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      setError('Неверный пароль');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Вход в админку</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Войти
        </button>
      </form>
    </div>
  );
}
