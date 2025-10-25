import React from 'react';

export default function AnnouncementCard({ announcement }) {
  return (
    <div className="bg-gray-300 rounded shadow-xl p-4">
      <div className="font-semibold">{announcement.title}</div>
      <div className="text-md text-gray-900 mt-2">{announcement.message}</div>
      <div className="text-sm text-gray-900 mt-1">{new Date(announcement.createdAt).toLocaleString()}</div>
    </div>
  );
}
