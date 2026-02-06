import { Document } from 'mongoose';


export interface IFilmDocument extends Document {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: Date;
  characters?: string[];
  planets?: string[];
  starships?: string[];
  vehicles?: string[];
  species?: string[];
  numberFilm: number;
  
}

export interface IFilm {
  id: string;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: Date;
  characters?: string[];
  planets?: string[];
  starships?: string[];
  vehicles?: string[];
  species?: string[];
  numberFilm: number;
}

export interface CreateFilmDTO {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: Date;
  characters?: string[];
  planets?: string[];
  starships?: string[];
  vehicles?: string[];
  species?: string[];
  numberFilm: number;
}

export interface FilmResponseDTO extends IFilm {
}

export interface FilmResponseListDTO {
  data: FilmResponseDTO[];
  total: number;
  pages: number;
}

export interface UpdateFilmDTO extends IFilm {}