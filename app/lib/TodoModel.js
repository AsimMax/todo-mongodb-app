import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },

    // ✅ New Field for Checkbox
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Todo =
  mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
