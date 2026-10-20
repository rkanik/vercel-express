import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { connectDb } from "./db.js";
import { todosRouter } from "./routes/todos.js";
import { usersRouter } from "./routes/users.js";
import { createRequire } from 'module';

var require = createRequire(import.meta.url);
var module = { exports: {} };

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Hello World",
    endpoints: {
      users: "/users",
      user: "/users/:id",
      todos: "/todos",
      todo: "/todos/:id",
    },
  });
});

app.use("/users", usersRouter);
app.use("/todos", todosRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});
