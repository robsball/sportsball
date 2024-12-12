"use client";

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-5xl font-bold mb-6">Welcome to Sportsball!</h1>
      <p className="text-lg mb-8">The ultimate platform for sports fans.</p>
      <button
        className="bg-white text-blue-500 font-semibold py-3 px-6 rounded-full shadow-md hover:bg-blue-100 transition"
        onClick={() => router.push('/signup')}
      >
        Sign Up
      </button>
    </div>
  );
}