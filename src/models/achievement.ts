import mongoose, { Schema, Model } from 'mongoose';
import { Achievement, ACHIEVEMENT_CATEGORIES } from '@/types/achievement';

const achievementSchema = new Schema<Achievement>(
  {
    title: {
      type: String,
      required: [true, 'El logro es requerido'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'La categoría es requerida'],
      enum: ACHIEVEMENT_CATEGORIES,
    },
  },
  { timestamps: true }
);

const AchievementModel: Model<Achievement> =
  mongoose.models.Achievement || mongoose.model<Achievement>('Achievement', achievementSchema);

export default AchievementModel;