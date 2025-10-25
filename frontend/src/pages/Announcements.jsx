import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import api from '../api/axios';
import AnnouncementCard from '../components/AnnouncementCard';
import { useAuth } from '../context/AuthContext';

export default function Announcements() {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ title: '', message: '' });

  const load = async () => {
    try {
      const a = await api.get('/announcements').then(r => r.data.data);
      setAnnouncements(a);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      await api.post('/announcements', form);
      setForm({ title: '', message: '' });
      load();
    } catch (err) { alert('Failed'); }
  };

  const remove = async (id) => {
    if(!confirm('Delete announcement?')) return;
    try {
      await api.delete(`/announcements/${id}`);
      load();
    } catch (err) { alert('Failed'); }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Announcements</h2>

          {user?.role === 'admin' && (
            <form onSubmit={create} className="bg-white p-4 rounded shadow mb-6">
              <input required placeholder="Title" value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} className="w-full p-2 border mb-2" />
              <textarea required placeholder="Message" value={form.message} onChange={(e)=>setForm({...form, message: e.target.value})} className="w-full p-2 border mb-2" />
              <button className="px-4 py-2 bg-blue-600 text-white rounded">Post Announcement</button>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {announcements.map(a => (
              <div key={a._id} className="relative">
                <AnnouncementCard announcement={a} />
                {user?.role === 'admin' && <button onClick={()=>remove(a._id)} className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 rounded">Delete</button>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
