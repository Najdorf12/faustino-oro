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

/*  "games": [
    {
      "round": "ZVNLsNSS",
      "id": "IOVcg1oZ",
      "opponent": {
        "name": "Ivic, Velimir",
        "title": "GM",
        "rating": 2638,
        "fideId": 950122,
        "fed": "SRB"
      },
      "color": "black",
      "fideTC": "standard",
      "points": "1/2",
      "ratingDiff": 2
    }, Ee0xddnN Ee0xddnN Ee0xddnN 20000197 20000197*/