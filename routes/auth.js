const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/User')

const JWT_SECRET = 'dawood_secret_123'

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed })
    res.json({ message: '✅ Registered successfully!' })
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: 'User not found' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ error: 'Wrong password' })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, name: user.name })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router