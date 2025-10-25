import React from 'react';

export default function EmployeeCard({ employee }) {
  return (
    <div className="bg-gray-300 rounded shadow p-4">
      <div className="font-semibold">{employee.name}</div>
      <div className="text-sm text-gray-600">{employee.email}</div>
      <div className="text-xs text-gray-500 mt-1">{employee.department || '—'}</div>
    </div>
  );
}
