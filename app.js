const express = require('express')
const connectDB = require('./db')
const Task = require('./model/Task')
const authRoutes = require('./routes/auth')
const authMiddleware = require('./middleware/auth')

const app = express()
app.use(express.json())
app.use(express.static('public'))

connectDB()

// Auth routes (no protection needed)
app.use('/auth', authRoutes)

// Task routes (protected — must be logged in)
app.get('/tasks', authMiddleware, async (req, res) => {
  const tasks = await Task.find({ user: req.userId })
  res.json(tasks)
})

app.post('/tasks', authMiddleware, async (req, res) => {
  const task = await Task.create({ title: req.body.title, user: req.userId })
  res.json(task)
})

// ✅ Mark complete/incomplete
app.put('/tasks/:id', authMiddleware, async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  )
  res.json(task)
})

app.delete('/tasks/:id', authMiddleware, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id)
  res.json({ message: 'Task deleted' })
})

app.put('/tasks/:id/title', authMiddleware, async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { new: true }
  )
  res.json(task)
})

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'))