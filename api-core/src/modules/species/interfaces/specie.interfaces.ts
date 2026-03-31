import { Document } from 'mongoose';

export interface ISpeciesDocument extends Document {
  name: string;
  classification: string;
  designation: string;
  average_height: number;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: number;
  homeworld: string;
  language: string;
  people?: string[];
  films?: string[];
  numberSpecies: number;
}

export interface ISpecie {
  id: string;
  name: string;
  classification: string;
  designation: string;
  average_height: number;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: number;
  homeworld: string;
  language: string;
  people?: string[];
  films?: string[];
  numberSpecies: number;
}

export interface CreateSpeciesDTO {
  name: string;
  classification: string;
  designation: string;
  average_height: number;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: number;
  homeworld: string;
  language: string;
  people?: string[];
  films?: string[];
  numberSpecies: number;
}

export interface SpeciesResponseDTO extends ISpecie {
}

export interface SpeciesResponseListDTO {
  data: SpeciesResponseDTO[];
  total: number;
  pages: number;
}

export type UpdateSpeciesDTO = Record<string, unknown>;
