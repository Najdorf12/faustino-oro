import mongoose, { Schema, Model } from 'mongoose';
import { Achievement } from '@/types/achievement';

const achievementSchema = new Schema<Achievement>(
  {
    title: {
      type: String,
      required: [true, 'El logro es requerido'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const AchievementModel: Model<Achievement> = 
  mongoose.models.Achievement || mongoose.model<Achievement>('Achievement', achievementSchema);

export default AchievementModel;