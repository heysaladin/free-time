import React, { useState, useEffect, useCallback } from 'react';
import Canvas from './Canvas';
import './App.css';

const BOARDS = {
  tamawal:     { id: 'default',      label: 'Tamawal',     requireLogin: true },
  hyperfantasy: { id: 'hyperfantasy', label: 'Hyperfantasy', requireLogin: false, defaultUser: 'Sholahuddin' },
};

const sharedStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  background: '#f8fafc',
};

function BoardPicker({ onSelect }) {
  return (
    <div style={{ ...sharedStyle, gap: 36 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: '#94a3b8', textTransform: 'uppercase' }}>
        Select Board
      </div>
      <div style={{ display: 'flex', gap: 20 }}>
        {Object.entries(BOARDS).map(([key, board]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            style={{
              width: 180,
              height: 120,
              border: '1.5px solid #e2e8f0',
              borderRadius: 12,
              background: '#fff',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 700,
              color: '#1e293b',
              fontFamily: 'inherit',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
            }}
          >
            {board.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [name, setName] = useState('');
  return (
    <div style={{ ...sharedStyle, gap: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: '#94a3b8', textTransform: 'uppercase' }}>
        Enter your name
      </div>
      <input
        autoFocus
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && name.trim() && onLogin(name.trim())}
        placeholder="Your name"
        style={{
          padding: '10px 16px',
          fontSize: 15,
          border: '1.5px solid #e2e8f0',
          borderRadius: 8,
          outline: 'none',
          fontFamily: 'inherit',
          width: 240,
          color: '#1e293b',
        }}
      />
      <button
        onClick={() => name.trim() && onLogin(name.trim())}
        style={{
          padding: '10px 32px',
          fontSize: 13,
          fontWeight: 700,
          background: '#3b82f6',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontFamily: 'inherit',
          letterSpacing: 1,
        }}
      >
        Enter
      </button>
    </div>
  );
}

export default function App() {
  const [selectedBoardKey, setSelectedBoardKey] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const board = selectedBoardKey ? BOARDS[selectedBoardKey] : null;
  const BASE = board ? `/api/boards/${board.id}` : null;
  const ready = board && currentUser;

  useEffect(() => {
    if (!ready) return;
    setLoading(true);
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
  }, [ready, BASE]);

  const handleSelectBoard = key => {
    const b = BOARDS[key];
    setSelectedBoardKey(key);
    if (!b.requireLogin) setCurrentUser(b.defaultUser);
  };

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
  }, [BASE]);

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

  if (!selectedBoardKey) return <BoardPicker onSelect={handleSelectBoard} />;

  if (board.requireLogin && !currentUser) return <LoginScreen onLogin={setCurrentUser} />;

  if (loading) {
    return (
      <div style={{ ...sharedStyle, color: '#94a3b8', fontSize: 14, letterSpacing: 2 }}>
        LOADING...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ ...sharedStyle, color: '#ef4444', gap: 12 }}>
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
      currentUser={currentUser}
      boardLabel={board.label}
    />
  );
}
