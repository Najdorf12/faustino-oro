import mongoose, { Schema, Model } from 'mongoose';
import { Notice } from '@/types/notice';

const localizedFieldSchema = {
  es: { type: String, required: true, trim: true },
  en: { type: String, required: true, trim: true },
};

const noticeSchema = new Schema<Notice>(
  {
    title: {
      type: localizedFieldSchema,
      required: true,
    },
    description: {
      type: localizedFieldSchema,
      required: true,
    },
    content: {
      type: localizedFieldSchema,
      required: true,
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
  { timestamps: true }
);

const NoticeModel: Model<Notice> =
  mongoose.models.Notice || mongoose.model<Notice>('Notice', noticeSchema);

export default NoticeModel;