import type { Todo } from "./types.js";

export const todos: Todo[] = [
  { id: 1, userId: 1, title: "Ship Express app to Vercel", completed: true },
  { id: 2, userId: 1, title: "Add TypeScript", completed: false },
  { id: 3, userId: 2, title: "Write API docs", completed: false },
  { id: 4, userId: 3, title: "Review pull requests", completed: true },
];

let nextTodoId = 5;

export function createTodoId(): number {
  const id = nextTodoId;
  nextTodoId += 1;
  return id;
}
