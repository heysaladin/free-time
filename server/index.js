require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Ensure a board exists, return it
async function getOrCreateBoard(boardId) {
  return prisma.board.upsert({
    where: { id: boardId },
    update: {},
    create: { id: boardId, name: 'Default Board' },
  });
}

// GET /api/boards/:boardId/notes
app.get('/api/boards/:boardId/notes', async (req, res) => {
  try {
    await getOrCreateBoard(req.params.boardId);
    const notes = await prisma.note.findMany({
      where: { boardId: req.params.boardId },
      orderBy: { createdAt: 'asc' },
    });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/boards/:boardId/notes
app.post('/api/boards/:boardId/notes', async (req, res) => {
  try {
    await getOrCreateBoard(req.params.boardId);
    const { content = '', x, y, color = 'yellow' } = req.body;
    const note = await prisma.note.create({
      data: { content, x, y, color, boardId: req.params.boardId },
    });
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/notes/:id
app.patch('/api/notes/:id', async (req, res) => {
  try {
    const { content, x, y, color, done, workingOnBy } = req.body;
    const data = {};
    if (content !== undefined) data.content = content;
    if (x !== undefined) data.x = x;
    if (y !== undefined) data.y = y;
    if (color !== undefined) data.color = color;
    if (done !== undefined) data.done = done;
    if (workingOnBy !== undefined) data.workingOnBy = workingOnBy;

    const note = await prisma.note.update({
      where: { id: req.params.id },
      data,
    });
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/notes/:id
app.delete('/api/notes/:id', async (req, res) => {
  try {
    await prisma.note.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', db: 'connected' });
  } catch (err) {
    res.status(503).json({ status: 'error', db: err.message });
  }
});

async function main() {
  await prisma.$connect();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
