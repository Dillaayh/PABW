'use client';

import Sidebar from '../../../components/admin/Sidebar';
import PageTitle from '../../../components/admin/PageTitle'; 
import AddMitraForm from '../../../components/admin/AddMitraForm';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-10">
        <PageTitle title="Halaman Pengelolaan Admin - Mitra" />
        <AddMitraForm />
      </main>
    </div>
  );
}
