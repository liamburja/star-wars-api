import { Document } from 'mongoose';


export interface IPlanetDocument extends Document {
  name: string;
  rotation_period: number;
  orbital_period: number;
  diameter: number;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: number;
  population: number;
  residents?: string[];
  films?: string[];
  numberPlantet: number;
}

export interface IPlanet {
  id: string;
  name: string;
  rotation_period: number;
  orbital_period: number;
  diameter: number;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: number;
  population: number;
  residents?: string[];
  films?: string[];
  numberPlantet: number;
}

export interface CreatePlanetDTO {
  name: string;
  rotation_period: number;
  orbital_period: number;
  diameter: number;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: number;
  population: number;
  residents?: string[];
  films?: string[];
  numberPlantet: number;
}

export interface PlanetResponseDTO extends IPlanet {
}

export interface PlanetResponseListDTO {
  data: PlanetResponseDTO[];
  total: number;
  pages: number;
}

export interface UpdatePlanetDTO extends IPlanet {}