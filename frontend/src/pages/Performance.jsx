import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import api from '../api/axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function Performance() {
  const [tasks, setTasks] = useState([]);

  const load = async () => {
    try {
      const t = await api.get('/tasks').then(r => r.data.data);
      setTasks(t);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { load(); }, []);

  const summary = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const failed = tasks.filter(t => t.status === 'failed').length;
    const pending = total - completed - failed;
    return [
      { name: 'Completed', value: completed },
      { name: 'Failed', value: failed },
      { name: 'Pending', value: pending },
    ];
  };

  const data = summary();
  const COLORS = ['#16a34a', '#ef4444', '#f59e0b'];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Performance Overview</h2>

          <div className="bg-white p-6 rounded shadow">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={100} label>
                  {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {data.map(d => (
                <div key={d.name} className="text-center">
                  <div className="text-lg font-semibold">{d.value}</div>
                  <div className="text-sm text-gray-600">{d.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
