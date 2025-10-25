import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user } = useAuth();
  const common = [
    { to: user?.role === 'admin' ? '/admin' : '/employee', label: 'Dashboard' },
    { to: '/tasks', label: user?.role === 'admin' ? 'All Tasks' : 'My Tasks' },
    { to: '/announcements', label: 'Announcements' },
  ];

  const adminLinks = [
    { to: '/employees', label: 'Employees' },
    { to: '/performance', label: 'Performance' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <div className="text-xl font-bold mb-6">Panel</div>
      <nav className="flex flex-col gap-3">
        {common.map((c) => (
          <Link key={c.to} to={c.to} className="block px-3 py-2 rounded hover:bg-slate-700">
            {c.label}
          </Link>
        ))}
        {user?.role === 'admin' &&
          adminLinks.map((c) => (
            <Link key={c.to} to={c.to} className="block px-3 py-2 rounded hover:bg-slate-700">
              {c.label}
            </Link>
          ))}
      </nav>
    </aside>
  );
}
