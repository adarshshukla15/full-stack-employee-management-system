import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import api from '../api/axios';
import TaskCard from '../components/TaskCard';
import AnnouncementCard from '../components/AnnouncementCard';

export default function EmployeeDashboard() {
  const [tasks, setTasks] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const load = async () => {
    try {
      const [t, a] = await Promise.all([
        api.get('/tasks/my').then(r => r.data.data),
        api.get('/announcements').then(r => r.data.data).catch(()=>[])
      ]);
      setTasks(t);
      setAnnouncements(a);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (taskId, status) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { status });
      load();
    } catch (err) {
      alert('Failed');
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">My Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {tasks.map(task => <TaskCard key={task._id} task={task} onUpdateStatus={updateStatus} />)}
          </div>

          <h2 className="text-2xl font-semibold mb-4">Announcements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {announcements.map(a => <AnnouncementCard key={a._id} announcement={a} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
