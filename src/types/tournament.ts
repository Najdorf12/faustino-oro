export interface TournamentImage {
  public_id: string;
  secure_url: string;
}

export interface Tournament {
  _id?: string;
  tournament_id_lichess?: string;
  title: string;
  location: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  description?: string;
  images: TournamentImage[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateTournamentInput = Omit<
  Tournament,
  "_id" | "createdAt" | "updatedAt"
>;
export type UpdateTournamentInput = Partial<CreateTournamentInput>;
