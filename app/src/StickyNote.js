import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';

const COLORS = {
  yellow: '#fef08a',
  pink: '#fda4af',
  blue: '#93c5fd',
  green: '#86efac',
  purple: '#d8b4fe',
  orange: '#fdba74',
};

export default function StickyNote({ note, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(note.content);
  const nodeRef = useRef(null);

  useEffect(() => {
    if (!editing) setContent(note.content);
  }, [note.content]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDragStop = (e, data) => {
    onUpdate(note.id, { x: data.x, y: data.y });
  };

  const handleBlur = () => {
    setEditing(false);
    onUpdate(note.id, { content });
  };

  const bg = COLORS[note.color] || COLORS.yellow;

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={{ x: note.x, y: note.y }}
      onStop={handleDragStop}
      bounds="parent"
      handle=".drag-handle"
    >
      <div
        ref={nodeRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 172,
          minHeight: 144,
          backgroundColor: bg,
          borderRadius: 6,
          padding: '6px 10px 10px',
          boxShadow: '2px 4px 18px rgba(0,0,0,0.14)',
          zIndex: 10,
          fontSize: 13,
          userSelect: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {/* Drag handle + delete */}
        <div
          className="drag-handle"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'grab',
            color: 'rgba(0,0,0,0.25)',
          }}
        >
          <span style={{ fontSize: 11, letterSpacing: 3 }}>· · ·</span>
          <button
            onMouseDown={e => e.stopPropagation()}
            onClick={() => onDelete(note.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 18,
              color: 'rgba(0,0,0,0.25)',
              padding: '0 2px',
              lineHeight: 1,
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(0,0,0,0.65)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,0,0,0.25)')}
          >
            ×
          </button>
        </div>

        {/* Content */}
        {editing ? (
          <textarea
            autoFocus
            value={content}
            onChange={e => setContent(e.target.value)}
            onBlur={handleBlur}
            onMouseDown={e => e.stopPropagation()}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(0,0,0,0.12)',
              resize: 'none',
              fontSize: 13,
              fontFamily: 'inherit',
              outline: 'none',
              minHeight: 72,
              color: '#1e293b',
              lineHeight: 1.5,
            }}
            rows={4}
          />
        ) : (
          <div
            onDoubleClick={() => setEditing(true)}
            style={{
              flex: 1,
              wordBreak: 'break-word',
              minHeight: 72,
              cursor: 'default',
              color: content ? '#1e293b' : 'rgba(0,0,0,0.28)',
              fontStyle: content ? 'normal' : 'italic',
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            {content || 'Double-click to edit'}
          </div>
        )}

        {/* Color picker */}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {Object.entries(COLORS).map(([name, val]) => (
            <div
              key={name}
              onMouseDown={e => e.stopPropagation()}
              onClick={() => onUpdate(note.id, { color: name })}
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: val,
                cursor: 'pointer',
                border: note.color === name
                  ? '2px solid rgba(0,0,0,0.45)'
                  : '1.5px solid rgba(0,0,0,0.1)',
                flexShrink: 0,
                transition: 'transform 0.1s',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.25)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
          ))}
        </div>
      </div>
    </Draggable>
  );
}
