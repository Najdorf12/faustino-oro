export interface FideHistory {
  period: string;
  classical_rating: number;
  classical_games: number;
  rapid_rating: number;
  rapid_games: number;
  blitz_rating: number;
  blitz_games: number;
}

export interface FideResponse {
  fide_id: string;
  name: string;
  fide_title: string;
  federation: string;
  birth_year: number;
  sex: string;
  classical_rating: number;
  rapid_rating: number;
  blitz_rating: number;
  world_rank_active: number;
  world_rank_all: number;
  continental_rank_active: number;
  continental_rank_all: number;
  national_rank_active: number;
  national_rank_all: number;
  history: FideHistory[];
}