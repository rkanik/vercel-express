import { Router } from 'express'
import { createTodoId, todos } from '../store.js'

export const todosRouter = Router()

todosRouter.get('/', (req, res) => {
  const userId = req.query.userId ? Number(req.query.userId) : undefined
  const completed =
    req.query.completed === 'true'
      ? true
      : req.query.completed === 'false'
        ? false
        : undefined

  const result = todos.filter((todo) => {
    if (userId !== undefined && todo.userId !== userId) {
      return false
    }

    if (completed !== undefined && todo.completed !== completed) {
      return false
    }

    return true
  })

  res.json(result)
})

todosRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const todo = todos.find((item) => item.id === id)

  if (!todo) {
    res.status(404).json({ error: 'Todo not found' })
    return
  }

  res.json(todo)
})

todosRouter.post('/', (req, res) => {
  const title = typeof req.body?.title === 'string' ? req.body.title.trim() : ''
  const userId = Number(req.body?.userId)
  const completed = Boolean(req.body?.completed)

  if (!title || !Number.isInteger(userId)) {
    res.status(400).json({ error: 'title and userId are required' })
    return
  }

  const todo = { id: createTodoId(), userId, title, completed }
  todos.push(todo)
  res.status(201).json(todo)
})

todosRouter.patch('/:id', (req, res) => {
  const id = Number(req.params.id)
  const todo = todos.find((item) => item.id === id)

  if (!todo) {
    res.status(404).json({ error: 'Todo not found' })
    return
  }

  if (typeof req.body?.title === 'string') {
    todo.title = req.body.title.trim()
  }

  if (typeof req.body?.completed === 'boolean') {
    todo.completed = req.body.completed
  }

  if (req.body?.userId !== undefined) {
    const userId = Number(req.body.userId)

    if (!Number.isInteger(userId)) {
      res.status(400).json({ error: 'userId must be a number' })
      return
    }

    todo.userId = userId
  }

  res.json(todo)
})

todosRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = todos.findIndex((item) => item.id === id)

  if (index === -1) {
    res.status(404).json({ error: 'Todo not found' })
    return
  }

  const [todo] = todos.splice(index, 1)
  res.json(todo)
})
