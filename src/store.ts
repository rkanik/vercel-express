import type { Todo, User } from './types.js'

export const users: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
  { id: 3, name: 'Carol Lee', email: 'carol@example.com' },
]

export const todos: Todo[] = [
  { id: 1, userId: 1, title: 'Ship Express app to Vercel', completed: true },
  { id: 2, userId: 1, title: 'Add TypeScript', completed: false },
  { id: 3, userId: 2, title: 'Write API docs', completed: false },
  { id: 4, userId: 3, title: 'Review pull requests', completed: true },
]

let nextUserId = 4
let nextTodoId = 5

export function createUserId(): number {
  const id = nextUserId
  nextUserId += 1
  return id
}

export function createTodoId(): number {
  const id = nextTodoId
  nextTodoId += 1
  return id
}
