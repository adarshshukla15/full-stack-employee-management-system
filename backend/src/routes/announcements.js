const express = require('express');
const router = express.Router();

// In-memory announcements for demo
let announcements = [
  { _id: '1', title: 'Welcome', message: 'Welcome to the Employee Management System!', date: new Date() },
  { _id: '2', title: 'Holiday', message: 'Office will be closed on Friday.', date: new Date() }
];

// GET all announcements
router.get('/', (req, res) => {
  res.status(200).json({ 
    success: true, 
    data: announcements 
  });
});

// POST a new announcement (admin only, for demo)
router.post('/', (req, res) => {
  const { title, message } = req.body;
  if (!title || !message) 
    return res.status(400).json({ 
  success: false, 
  message: 'Title and message required' 
});
  const newAnnouncement = { _id: Date.now().toString(), title, message, date: new Date() };
  announcements.push(newAnnouncement);
  res.status(201).json({ 
    success: true, 
    data: newAnnouncement 
  });
});

module.exports = router;
