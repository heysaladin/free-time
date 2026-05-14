import React, { useRef } from 'react';
import StickyNote from './StickyNote';

const QUADRANTS = [
  {
    id: 'Q1', label: 'Do', desc: 'Important · Urgent',
    bg: '#fff1f2', labelColor: '#e11d48', top: 0, left: 0,
    corner: 'top-left',
  },
  {
    id: 'Q2', label: 'Schedule', desc: 'Important · Not Urgent',
    bg: '#f0fdf4', labelColor: '#16a34a', top: 0, left: '50%',
    corner: 'top-right',
  },
  {
    id: 'Q3', label: 'Delegate', desc: 'Not Important · Urgent',
    bg: '#fefce8', labelColor: '#ca8a04', top: '50%', left: 0,
    corner: 'bottom-left',
  },
  {
    id: 'Q4', label: 'Eliminate', desc: 'Not Important · Not Urgent',
    bg: '#f8fafc', labelColor: '#64748b', top: '50%', left: '50%',
    corner: 'bottom-right',
  },
];

const CORNER_ALIGN = {
  'top-left': { alignItems: 'flex-start', justifyContent: 'flex-start' },
  'top-right': { alignItems: 'flex-start', justifyContent: 'flex-end' },
  'bottom-left': { alignItems: 'flex-end', justifyContent: 'flex-start' },
  'bottom-right': { alignItems: 'flex-end', justifyContent: 'flex-end' },
};

export default function Canvas({ notes, onAdd, onUpdate, onDelete, currentUser, boardLabel }) {
  const canvasRef = useRef(null);

  const handleAddNote = () => {
    if (!canvasRef.current) return;
    const { clientWidth, clientHeight } = canvasRef.current;
    onAdd({
      x: Math.round(clientWidth / 2 - 84),
      y: Math.round(clientHeight / 2 - 70),
    });
  };

  return (
    <div
      ref={canvasRef}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Quadrant backgrounds */}
      {QUADRANTS.map(q => {
        const align = CORNER_ALIGN[q.corner];
        return (
          <div
            key={q.id}
            style={{
              position: 'absolute',
              top: q.top,
              left: q.left,
              width: '50%',
              height: '50%',
              backgroundColor: q.bg,
              pointerEvents: 'none',
              display: 'flex',
              flexDirection: 'column',
              ...align,
              padding: 16,
            }}
          >
            <div>
              <div style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: q.labelColor,
                opacity: 0.6,
              }}>
                {q.id}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: q.labelColor }}>
                {q.label}
              </div>
              <div style={{ fontSize: 11, color: q.labelColor, opacity: 0.6, marginTop: 2 }}>
                {q.desc}
              </div>
            </div>
          </div>
        );
      })}

      {/* Divider lines */}
      <div style={{
        position: 'absolute', top: '50%', left: 0, right: 0,
        height: 1, backgroundColor: '#cbd5e1', pointerEvents: 'none', zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', left: '50%', top: 0, bottom: 0,
        width: 1, backgroundColor: '#cbd5e1', pointerEvents: 'none', zIndex: 1,
      }} />

      {/* X-axis label */}
      <div style={{
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 10,
        color: '#94a3b8',
        letterSpacing: 2.5,
        fontWeight: 600,
        textTransform: 'uppercase',
        pointerEvents: 'none',
        zIndex: 2,
      }}>
        ← Urgent · Not Urgent →
      </div>

      {/* Y-axis label */}
      <div style={{
        position: 'absolute',
        left: 10,
        top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
        fontSize: 10,
        color: '#94a3b8',
        letterSpacing: 2.5,
        fontWeight: 600,
        textTransform: 'uppercase',
        pointerEvents: 'none',
        zIndex: 2,
        whiteSpace: 'nowrap',
      }}>
        ↑ Important · Not Important ↓
      </div>

      {/* Title */}
      <div style={{
        position: 'absolute',
        top: 14,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 11,
        fontWeight: 700,
        color: '#94a3b8',
        letterSpacing: 3,
        textTransform: 'uppercase',
        zIndex: 2,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        background: 'rgba(248,250,252,0.9)',
        padding: '4px 10px',
        borderRadius: 4,
      }}>
        {boardLabel || 'Priority Matrix'}
      </div>

      {/* User indicator */}
      {currentUser && (
        <div style={{
          position: 'absolute',
          top: 14,
          right: 14,
          fontSize: 11,
          fontWeight: 600,
          color: '#64748b',
          letterSpacing: 1,
          zIndex: 2,
          pointerEvents: 'none',
          background: 'rgba(248,250,252,0.9)',
          padding: '4px 10px',
          borderRadius: 4,
        }}>
          {currentUser}
        </div>
      )}

      {/* Notes */}
      {notes.map(note => (
        <StickyNote
          key={note.id}
          note={note}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}

      {/* Add note button */}
      <button
        onClick={handleAddNote}
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          width: 56,
          height: 56,
          borderRadius: '50%',
          backgroundColor: '#3b82f6',
          color: '#fff',
          border: 'none',
          fontSize: 30,
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(59,130,246,0.45)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(59,130,246,0.6)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(59,130,246,0.45)';
        }}
        title="Add note"
      >
        +
      </button>
    </div>
  );
}
