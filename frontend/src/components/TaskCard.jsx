import React from 'react';

export default function TaskCard({ task, onUpdateStatus, onDelete }) {
  return (
    <div className="bg-white rounded shadow-xl p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-black">{task.description}</p>
          <p className="text-xs text-black mt-3">Assigned By: {task.assignedBy?.name}</p>
          <p className="text-xs text-black">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</p>
        </div>
        <div className="text-sm">
          <div className={`px-2 py-1 rounded ${task.status === 'pending' ? 'bg-yellow-200' : task.status === 'completed' ? 'bg-green-200' : 'bg-red-200'}`}>
            {task.status}
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        {onUpdateStatus && (
          <>
            <button className="px-2 py-1 bg-green-500 text-white rounded cursor-pointer" onClick={() => onUpdateStatus(task._id, 'completed')}>
              Mark Completed
            </button>
            <button className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer" onClick={() => onUpdateStatus(task._id, 'failed')}>
              Mark Failed
            </button>
          </>
        )}
        {onDelete && (
          <button className="px-2 py-1 bg-gray-300 rounded" onClick={() => onDelete(task._id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
