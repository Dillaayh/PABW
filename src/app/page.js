import Link from 'next/link';
import './globals.css'

export default function HomePage() {
  return (
    <div>
      <h1>Selamat Datang</h1>
      <Link href="/dashboard">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Ke Dashboard</button>
      </Link>
    </div>
  );
}