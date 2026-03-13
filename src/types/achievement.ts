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
  title: string;
  category: AchievementCategory;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateAchievementInput = Omit<
  Achievement,
  "_id" | "createdAt" | "updatedAt"
>;
export type UpdateAchievementInput = Partial<CreateAchievementInput>;
