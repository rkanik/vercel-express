import { Router } from "express";
import mongoose from "mongoose";
import { connectDb } from "../db.js";
import { User } from "../models/user.js";

export const usersRouter = Router();

usersRouter.use(async (_req, _res, next) => {
  await connectDb();
  next();
});

usersRouter.get("/", async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

usersRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ error: "Invalid user id" });
    return;
  }

  const user = await User.findById(id).lean();

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(user);
});

usersRouter.post("/", async (req, res) => {
  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  const email =
    typeof req.body?.email === "string" ? req.body.email.trim() : "";

  if (!name || !email) {
    res.status(400).json({ error: "name and email are required" });
    return;
  }

  const user = await User.create({ name, email });
  res.status(201).json(user);
});

usersRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ error: "Invalid user id" });
    return;
  }

  const updates: { name?: string; email?: string } = {};

  if (typeof req.body?.name === "string") {
    updates.name = req.body.name.trim();
  }

  if (typeof req.body?.email === "string") {
    updates.email = req.body.email.trim();
  }

  const user = await User.findByIdAndUpdate(id, updates, { new: true }).lean();

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(user);
});

usersRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ error: "Invalid user id" });
    return;
  }

  const user = await User.findByIdAndDelete(id).lean();

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(user);
});
