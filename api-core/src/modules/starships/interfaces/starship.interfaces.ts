import { Document } from 'mongoose';

export interface IStarshipDocument extends Document {
  name: string;
  model_starship: string;
  manufacturer: string;
  cost_in_credits: number;
  lenght: number;
  max_atmosphering_speed: number;
  crew: string;
  passengers: number;
  cargo_capacity: number;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: number;
  starship_class: string;
  pilots?: string[];
  films?: string[];
  numberStarships: number;
}

export interface IStarship {
  id: string;
  name: string;
  model_starship: string;
  manufacturer: string;
  cost_in_credits: number;
  lenght: number;
  max_atmosphering_speed: number;
  crew: string;
  passengers: number;
  cargo_capacity: number;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: number;
  starship_class: string;
  pilots?: string[];
  films?: string[];
  numberStarships: number;
}

export interface CreateStarshipDTO {
  name: string;
  model_starship: string;
  manufacturer: string;
  cost_in_credits: number;
  lenght: number;
  max_atmosphering_speed: number;
  crew: string;
  passengers: number;
  cargo_capacity: number;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: number;
  starship_class: string;
  pilots?: string[];
  films?: string[];
  numberStarships: number;
}

export interface StarshipResponseDTO extends IStarship {
}

export interface StarshipResponseListDTO {
  data: StarshipResponseDTO[];
  total: number;
  pages: number;
}

export type UpdateStarshipDTO = Record<string, unknown>;