import { connectDB } from "@/app/lib/db";
import { Todo } from "@/app/lib/TodoModel";
import { NextResponse } from "next/server";

/* ✅ GET Todos */
export async function GET() {
  await connectDB();
  const todos = await Todo.find().sort({ createdAt: -1 });

  return NextResponse.json(todos);
}

/* ✅ POST Add Todo */
export async function POST(req) {
  await connectDB();

  const { text } = await req.json();

  const newTodo = await Todo.create({
    text,
    completed: false,
  });

  return NextResponse.json(newTodo);
}

/* ✅ DELETE Todo */
export async function DELETE(req) {
  await connectDB();

  const { id } = await req.json();

  await Todo.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}

/* ✅ PATCH Toggle Done */
export async function PATCH(req) {
  await connectDB();

  const { id, completed } = await req.json();

  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { completed },
    { new: true }
  );

  return NextResponse.json(updatedTodo);
}
