import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import api from '../api/axios';
import EmployeeCard from '../components/EmployeeCard';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', department: '' });

  const load = async () => {
    try {
      const e = await api.get('/employees').then(r => r.data.data);
      setEmployees(e);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { load(); }, []);

  const create = async (ev) => {
    ev.preventDefault();
    try {
      await api.post('/auth/register', { ...form, role: 'employee' });
      setForm({ name: '', email: '', password: '', department: '' });
      load();
    } catch (err) { alert(err.response?.data?.message || 'Failed'); }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Employees</h2>

          <form onSubmit={create} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <input required placeholder="Name" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} className="p-2 border" />
            <input required placeholder="Email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} className="p-2 border" />
            <input required placeholder="Password" type="password" value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} className="p-2 border" />
            <input placeholder="Department" value={form.department} onChange={(e)=>setForm({...form, department: e.target.value})} className="p-2 border" />
            <div className="md:col-span-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded">Add Employee</button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {employees.map(emp => <EmployeeCard key={emp._id} employee={emp} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
