import mongoose, { Schema, Model } from 'mongoose';
import { Notice } from '@/types/notice';

const noticeSchema = new Schema<Notice>(
  {
    title: {
      type: String,
      required: [true, 'El título es requerido'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'La descripción es requerida'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'El contenido es requerido'],
    },
    category: {
      type: String,
      required: [true, 'La categoría es requerida'],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    images: {
      type: [
        {
          public_id: { type: String, required: true },
          secure_url: { type: String, required: true },
        },
      ],
      default: [],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const NoticeModel: Model<Notice> = 
  mongoose.models.Notice || mongoose.model<Notice>('Notice', noticeSchema);

export default NoticeModel;