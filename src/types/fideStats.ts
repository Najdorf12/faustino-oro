export interface FideStats {
  titles: {
    name: string;
    date: string;
  }[];
  stats: {
    white_total: string;
    white_win_num: string;
    white_draw_num: string;
    black_total: string;
    black_win_num: string;
    black_draw_num: string;
    white_total_std: string;
    white_win_num_std: string;
    white_draw_num_std: string;
    black_total_std: string;
    black_win_num_std: string;
    black_draw_num_std: string;
    white_total_rpd: string;
    white_win_num_rpd: string;
    white_draw_num_rpd: string;
    black_total_rpd: string;
    black_win_num_rpd: string;
    black_draw_num_rpd: string;
    white_total_blz: string;
    white_win_num_blz: string;
    white_draw_num_blz: string;
    black_total_blz: string;
    black_win_num_blz: string;
    black_draw_num_blz: string;
  };
}