'use client';

import { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminMitraPage from '../../components/admin/AdminMitraPage';
import PageTitle from '../../components/admin/PageTitle'; 

export default function AdminDashboardPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); 

  const handleEditClick = (user) => {
    setSelectedUser(user);      
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />

      <main className="flex-1 p-10">
        <PageTitle title="Halaman Pengelolaan Admin - Mitra" />

        {isEditing ? (
          <EditSaldoForm user={selectedUser} onCancel={handleCancelEdit} />
        ) : (
          <AdminMitraPage onEditClick={handleEditClick} />
        )}
      </main>
    </div>
  );
}
