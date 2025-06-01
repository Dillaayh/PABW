
'use client';

import Sidebar from '../../../components/admin/Sidebar';
import AddUserForm from '../../../components/admin/AddUserForm';
import PageTitle from '../../../components/admin/PageTitle'; 

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-white flex">
          {/* Sidebar */}
          <Sidebar />
    
          {/* Main Content */}
          <main className="flex-1 p-10">
            <PageTitle title="Halaman Pengelolaan Admin - Pengguna" />
            <AddUserForm />
          </main>
        </div>
  );
}
