'use client';
import { useLoading } from '../contex/LoadingContext'; 
import NailLoader from './Loader';

export default function GlobalLoader() {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <NailLoader />
    </div>
  );
}