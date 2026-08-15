import { Router } from 'express'
import { createUserId, todos, users } from '../store.js'

export const usersRouter = Router()

usersRouter.get('/', (_req, res) => {
  res.json(users)
})

usersRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const user = users.find((item) => item.id === id)

  if (!user) {
    res.status(404).json({ error: 'User not found' })
    return
  }

  res.json(user)
})

usersRouter.get('/:id/todos', (req, res) => {
  const id = Number(req.params.id)
  const user = users.find((item) => item.id === id)

  if (!user) {
    res.status(404).json({ error: 'User not found' })
    return
  }

  res.json(todos.filter((todo) => todo.userId === id))
})

usersRouter.post('/', (req, res) => {
  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : ''
  const email = typeof req.body?.email === 'string' ? req.body.email.trim() : ''

  if (!name || !email) {
    res.status(400).json({ error: 'name and email are required' })
    return
  }

  const user = { id: createUserId(), name, email }
  users.push(user)
  res.status(201).json(user)
})

usersRouter.patch('/:id', (req, res) => {
  const id = Number(req.params.id)
  const user = users.find((item) => item.id === id)

  if (!user) {
    res.status(404).json({ error: 'User not found' })
    return
  }

  if (typeof req.body?.name === 'string') {
    user.name = req.body.name.trim()
  }

  if (typeof req.body?.email === 'string') {
    user.email = req.body.email.trim()
  }

  res.json(user)
})

usersRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = users.findIndex((item) => item.id === id)

  if (index === -1) {
    res.status(404).json({ error: 'User not found' })
    return
  }

  const [user] = users.splice(index, 1)
  const remainingTodos = todos.filter((todo) => todo.userId !== id)
  todos.splice(0, todos.length, ...remainingTodos)

  res.json(user)
})
