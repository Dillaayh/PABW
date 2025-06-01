import { redirect } from 'next/navigation';
import './globals.css';

export default function HomePage() {
  // Langsung redirect tanpa render apapun
  redirect('/pages/landingpage');
}