ignore exixting files, remove them

# 🧠 Priority Matrix Canvas Web Tool

A web-based interactive canvas tool that allows users to create, drag, and organize sticky notes inside a quadrant system based on **Urgency (X-axis)** and **Priority (Y-axis)**.

---

## 🎯 Concept

This tool is inspired by:
- Eisenhower Matrix
- Miro Board
- Notion Canvas

Users can visually organize tasks into 4 quadrants:
```

* * *

## | | |  
| Q1 | Q2 |  
| | |  
|--------+---------------|  
| | |  
| Q3 | Q4 |  
| | |

````

### Quadrants:
- **Q1**: High Priority / High Urgency
- **Q2**: High Priority / Low Urgency
- **Q3**: Low Priority / High Urgency
- **Q4**: Low Priority / Low Urgency

---

## ✨ Features

- Create sticky notes
- Drag & drop notes across canvas
- Auto-position detection (quadrant)
- Edit note content
- Persistent storage (save/load notes)
- Color customization (optional)

---

## 🧩 UI Structure

- Full-screen canvas layout
- 2x2 grid (quadrant system)
- Floating sticky notes (absolute positioned)
- Axis labels:
  - X → Urgency
  - Y → Priority

---

## ⚙️ Tech Stack

### Frontend
- React / Next.js
- Tailwind CSS

### Libraries
- `dnd-kit` or `react-draggable` (drag & drop)

### Backend / Database
- Firebase Firestore OR Supabase

---

## 🧱 Layout Implementation

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  height: 100vh;
}
````

* * *

## 📌 Data Structure

```JSON
{
  "id": "note-1",
  "content": "Call client",
  "x": 320,
  "y": 240,
  "color": "yellow"
}
```

* * *

## 🖱 Drag & Drop Logic

* Notes are positioned using `x` and `y`
* On drag end → update position
* Save position to state/database

* * *

## 🧠 Quadrant Detection Logic

```JavaScript
if (x > middleX && y < middleY) {
  quadrant = "Q1";
}
```

* * *

## 💾 Database Structure

```
boards/
  boardId/
    notes/
      noteId
```

* * *

## 🚀 MVP Roadmap

1. Create quadrant grid
2. Add sticky note manually
3. Implement drag & drop
4. Store position in state
5. Save to database
6. Reload saved notes

* * *

## 🔥 Advanced Features (Future)

* Multi-board system
* Real-time collaboration
* Sticky animations (micro-interactions)
* AI suggestion for quadrant placement
* Task analytics (distribution per quadrant)

* * *

## 🎨 UX Notes

* Make sticky notes feel “physical”
* Add subtle shadow & hover effect
* Smooth drag animation
* Snap-to-grid (optional)

* * *

## 🧠 Vision

A lightweight visual thinking tool that helps users:

* Prioritize tasks
* Reduce overwhelm
* Think spatially instead of linearly

* * *

## 📌 Author

Built as a personal UI/UX + frontend exploration project.




🧠 Skenario Masalah

Misalnya:

User A drag note ke kanan atas (Q1)
User B drag note ke kiri bawah (Q4)
Keduanya terjadi hampir bersamaan

👉 Tanpa sistem yang benar → posisi bisa:

loncat-loncat
overwrite random
beda di tiap browser
🧩 Solusi (dari simple → advanced)
1️⃣ 🟢 Last Write Wins (Paling Simple - MVP)

Cara kerja:

Setiap update punya timestamp
Yang terakhir update → menang
{
  "id": "note-1",
  "x": 500,
  "y": 200,
  "updatedAt": 1719999999
}

👉 Backend:

if (incoming.updatedAt > current.updatedAt) {
  save(incoming)
}

✅ Kelebihan:

Simple banget
Cocok MVP

❌ Kekurangan:

Bisa “rebutan” (user lain tiba-tiba kalah)