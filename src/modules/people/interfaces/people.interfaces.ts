import { Document } from 'mongoose';


export interface IPeopleDocument extends Document {
  name: string;
  height?: number;
  mass?: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films?: string[];
  species?: string[];
  vehicles?: string[];
  starships?: string[];
  numberCharacter: number;
}

export interface IPeople {
  id: string;
  name: string;
  height?: number;
  mass?: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films?: string[];
  species?: string[];
  vehicles?: string[];
  starships?: string[];
  numberCharacter: number;
}

export interface CreatePeopleDTO {
  name: string;
  height?: number;
  mass?: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films?: string[];
  species?: string[];
  vehicles?: string[];
  starships?: string[];
  numberCharacter: number;
}

export interface PeopleResponseDTO extends IPeople {
}

export interface PeopleResponseListDTO {
  data: PeopleResponseDTO[];
  total: number;
  pages: number;
}

export interface UpdatePeopleDTO extends IPeople {}