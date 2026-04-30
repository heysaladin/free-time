import React, { useState, useEffect, useCallback } from 'react';
import Canvas from './Canvas';
import './App.css';

const BOARD_ID = 'default';
const BASE = `/api/boards/${BOARD_ID}`;

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE}/notes`)
      .then(r => {
        if (!r.ok) throw new Error(`Server error: ${r.status}`);
        return r.json();
      })
      .then(data => {
        setNotes(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const addNote = useCallback(async ({ x, y }) => {
    try {
      const res = await fetch(`${BASE}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: '', x, y, color: 'yellow' }),
      });
      const note = await res.json();
      setNotes(prev => [...prev, note]);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const updateNote = useCallback((id, fields) => {
    fetch(`/api/notes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    }).catch(console.error);
    setNotes(prev => prev.map(n => (n.id === id ? { ...n, ...fields } : n)));
  }, []);

  const deleteNote = useCallback(id => {
    fetch(`/api/notes/${id}`, { method: 'DELETE' }).catch(console.error);
    setNotes(prev => prev.filter(n => n.id !== id));
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: '#94a3b8',
        fontSize: 14,
        letterSpacing: 2,
      }}>
        LOADING...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: '#ef4444',
        gap: 12,
      }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>Cannot connect to server</div>
        <div style={{ fontSize: 13, color: '#94a3b8' }}>{error}</div>
        <div style={{ fontSize: 12, color: '#94a3b8' }}>Make sure the server is running on port 3001</div>
      </div>
    );
  }

  return (
    <Canvas
      notes={notes}
      onAdd={addNote}
      onUpdate={updateNote}
      onDelete={deleteNote}
    />
  );
}
