export interface NoticeImage {
  public_id: string;
  secure_url: string;
}

export interface LocalizedField {
  es: string;
  en: string;
}

export interface Notice {
  _id?: string;
  title: LocalizedField;
  description: LocalizedField;
  content: LocalizedField;
  category: string;
  isActive: boolean;
  images: NoticeImage[];
  date?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateNewsInput = Omit<
  Notice,
  "_id" | "date" | "createdAt" | "updatedAt"
>;
export type UpdateNewsInput = Partial<CreateNewsInput>;

export interface LocalizedNotice {
  _id?: string;
  title: string;
  description: string;
  content: string;
  category: string;
  isActive: boolean;
  images: NoticeImage[];
  date?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
