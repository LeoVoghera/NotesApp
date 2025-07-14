import React, { useState, useEffect } from 'react';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/notes/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete note');

      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    } catch (error) {
      console.error(error);
      alert('Error deleting note');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNote.trim()) return;

    try {
      const res = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newNoteTitle, content: newNote }),
      });

      if (!res.ok) throw new Error("Failed to add note");

      const addedNote = await res.json();
      setNotes(prevNotes => [...prevNotes, addedNote]);
      setNewNote('');
      setNewNoteTitle('');
    } catch (error) {
      console.error(error);
      alert("Error adding note");
    }
  };


  return (
    <div style={{
      maxWidth: 600,
      margin: '40px auto',
      padding: '20px',
      backgroundColor: '#121212',
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      borderRadius: 10,
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.4)'
    }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: 20 }}>🧠 Smart Notes</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="text"
          placeholder="Title"
          value={newNoteTitle}
          onChange={e => setNewNoteTitle(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: 6,
            border: '1px solid #333',
            backgroundColor: '#1e1e1e',
            color: '#fff'
          }}
        />
        <textarea
          placeholder="Write your note..."
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
          rows={6}
          style={{
            padding: '12px',
            fontSize: '1rem',
            borderRadius: 6,
            border: '1px solid #333',
            backgroundColor: '#1e1e1e',
            color: '#fff',
            lineHeight: 1.4,
            resize: 'vertical'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '12px',
            fontSize: '1rem',
            fontWeight: 'bold',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={e => (e.target.style.backgroundColor = '#444')}
          onMouseOut={e => (e.target.style.backgroundColor = '#333')}
        >
          ➕ Add Note
        </button>
      </form>

      <ul style={{ marginTop: 30, padding: 0, listStyle: 'none' }}>
        {notes.map(note => (
          <li key={note.id} style={{
            marginBottom: 16,
            padding: 16,
            borderRadius: 10,
            backgroundColor: '#1e1e1e',
            border: '1px solid #2a2a2a'
          }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: 6 }}>
              {note.title}
            </div>
            <div style={{ fontSize: '1rem', color: '#ccc', whiteSpace: 'pre-wrap', marginBottom: '10px' }}>
              {note.content}
            </div>
            <button
              onClick={() => handleDelete(note.id)}
              style={{
                padding: '8px 12px',
                fontSize: '0.9rem',
                backgroundColor: '#ff4444',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={e => (e.target.style.backgroundColor = '#ff6666')}
              onMouseOut={e => (e.target.style.backgroundColor = '#ff4444')}
            >
              🗑️ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}