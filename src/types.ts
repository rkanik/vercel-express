export type User = {
  id: number
  name: string
  email: string
}

export type Todo = {
  id: number
  userId: number
  title: string
  completed: boolean
}
