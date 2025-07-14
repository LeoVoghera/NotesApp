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
  console.log('Created new note:', newNote.id);
});

// DELETE a note
router.delete('/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const initialLength = notes.length;
  
  notes = notes.filter(note => note.id !== noteId);
  
  if (notes.length === initialLength) {
    return res.status(404).json({ error: 'Note not found' });
  }
  
  res.status(200).json({ message: 'Note deleted successfully' });
  console.log('Deleted note:', noteId);
});

module.exports = router;