const express = require('express');
const router = express.Router();

// Temporary in-memory notes
let notes = [
  { id: 1, title: "First note", content: "Welcome to Smart Notes!" },
  { id: 2, title: "Second note", content: "Your second note." }
];

// GET all notes
router.get('/', (req, res) => {
  res.json(notes);
  console.log('Fetched all notes');
});

// POST a new note
router.post('/', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newNote = {
    id: Date.now(),
    title,
    content
  };

  notes.push(newNote);
  res.status(201).json(newNote);
  console.log('✅ Added note:', newNote);
});

module.exports = router;