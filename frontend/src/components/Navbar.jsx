import React from 'react';
import { useAuth } from '../context/AuthContext';
import useTheme from '../hooks/useTheme';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-slate-800 text-white">
      <div className="flex items-center gap-3">
        <div className="text-lg font-semibold">EMS</div>
        <div className="text-sm opacity-80">{user?.department || ''}</div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={toggleTheme} className="px-3 py-1 rounded bg-slate-700">
          {theme === 'light' ? '🌞' : '🌙'}
        </button>
        <div className="text-sm mr-2">{user?.name}</div>
        <button onClick={logout} className="px-3 py-1 rounded bg-red-600">Logout</button>
      </div>
    </div>
  );
}
