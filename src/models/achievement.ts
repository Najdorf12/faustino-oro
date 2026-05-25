import mongoose, { Schema, Model } from "mongoose";
import { Achievement, ACHIEVEMENT_CATEGORIES } from "@/types/achievement";

const localizedFieldSchema = {
  es: { type: String, required: true, trim: true },
  en: { type: String, required: true, trim: true },
};

const achievementSchema = new Schema<Achievement>(
  {
    title: {
      type: localizedFieldSchema,
      required: true,
    },
    category: {
      type: String,
      required: [true, "La categoría es requerida"],
      enum: ACHIEVEMENT_CATEGORIES,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const AchievementModel: Model<Achievement> =
  mongoose.models.Achievement ||
  mongoose.model<Achievement>("Achievement", achievementSchema);

export default AchievementModel;