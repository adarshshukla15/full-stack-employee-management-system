import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import api from '../api/axios';
import EmployeeCard from '../components/EmployeeCard';
import TaskCard from '../components/TaskCard';
import AnnouncementCard from '../components/AnnouncementCard';

export default function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const load = async () => {
    try {
      const [e, t, a] = await Promise.all([
        api.get('/employees').then(r => r.data.data),
        api.get('/tasks').then(r => r.data.data),
        api.get('/announcements').then(r => r.data.data).catch(()=>[])
      ]);
      setEmployees(e);
      setTasks(t);
      setAnnouncements(a);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Employees</h2>
            <div className="grid grid-cols-3 gap-4">
              {employees.map(emp => <EmployeeCard key={emp._id} employee={emp} />)}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Tasks</h2>
            <div className="grid grid-cols-3 gap-4">
              {tasks.map(task => <TaskCard key={task._id} task={task} />)}
              </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Announcements</h2>
            <div className="grid grid-cols-3 gap-4">
              {announcements.map(a => <AnnouncementCard key={a._id} announcement={a} />)}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
