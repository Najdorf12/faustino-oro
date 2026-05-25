import { LocalizedField } from "./notice";

export type AchievementCategory =
  | "Títulos y ránkings"
  | "Récords de precocidad"
  | "Presencia en la Élite mundial";

export const ACHIEVEMENT_CATEGORIES: AchievementCategory[] = [
  "Títulos y ránkings",
  "Récords de precocidad",
  "Presencia en la Élite mundial",
];

export interface Achievement {
  _id?: string;
  title: LocalizedField;
  category: AchievementCategory;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LocalizedAchievement {
  _id?: string;
  title: string;           // ya aplanado según locale
  category: AchievementCategory;  // sigue siendo la clave ES para agrupar
  categoryLabel: string;   // versión traducida para mostrar
  order: number;
}

export type CreateAchievementInput = Omit<
  Achievement,
  "_id" | "createdAt" | "updatedAt"
>;
export type UpdateAchievementInput = Partial<CreateAchievementInput>;