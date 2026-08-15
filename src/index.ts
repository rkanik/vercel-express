import express from 'express'
import { todosRouter } from './routes/todos.js'
import { usersRouter } from './routes/users.js'

const app = express()
const port = Number(process.env.PORT ?? 3000)

app.use(express.json())

app.get('/', (_req, res) => {
  res.json({
    message: 'Hello World',
    endpoints: {
      users: '/users',
      user: '/users/:id',
      userTodos: '/users/:id/todos',
      todos: '/todos',
      todo: '/todos/:id',
    },
  })
})

app.use('/users', usersRouter)
app.use('/todos', todosRouter)

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

export default app

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
}
