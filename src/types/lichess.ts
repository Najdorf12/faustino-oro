export interface LichessPlayer {
  name: string;
  title?: string;
  rating: number;
  performance: number;
  score: number;
  rank: number;
  played: number;
  ratingDiff: number;

  games: {
    id: string;
    round: string;
    color: "white" | "black";
    points: string;
    ratingDiff: number;
    opponent: {
      name: string;
      title?: string;
      rating: number;
      fed: string;
    };
  }[];
}
