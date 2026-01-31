export interface Achievement {
  _id?: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateAchievementInput = Omit<Achievement, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdateAchievementInput = Partial<CreateAchievementInput>;