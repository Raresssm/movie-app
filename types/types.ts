export interface SearchResult {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_title: string;
  release_date: Date;
  poster_path: string;
  popularity: number;
  title: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: string[]
  overview?: string;
}

export interface SearchResults {
  page: number;
  results: SearchResult[] | [];
  total_pages: number;
  total_results: number;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface VideosResponse {
  id: number;
  results: Video[];
}

export interface Image {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface ImagesResponse {
  id: number;
  backdrops: Image[];
  logos: Image[];
  posters: Image[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: Genre[];
}