import { ISpecie } from './species.interfaces';

class Specie implements ISpecie {
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

  constructor(species: ISpecie) {
    this.id = species.id;
    this.name = species.name;
    this.classification = species.classification;
    this.designation = species.designation;
    this.average_height = species.average_height;
    this.skin_colors = species.skin_colors;
    this.hair_colors = species.hair_colors;
    this.eye_colors = species.eye_colors;
    this.average_lifespan = species.average_lifespan;
    this.homeworld = species.homeworld;
    this.language = species.language;
    this.people = species.people;
    this.films = species.films;
    this.numberSpecies = species.numberSpecies;
  }
}

export default Specie;
