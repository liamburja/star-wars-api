import { IPeople } from './people.interfaces';


class People implements IPeople {
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

  constructor(people: IPeople) {
    this.id = people.id;
    this.name = people.name;
    this.height = people.height;
    this.mass = people.mass;
    this.hair_color = people.hair_color;
    this.skin_color = people.skin_color;
    this.eye_color = people.eye_color;
    this.birth_year = people.birth_year;
    this.gender = people.gender;
    this.homeworld = people.homeworld;
    this.films = people.films;
    this.species = people.species;
    this.vehicles = people.vehicles;
    this.starships = people.starships;
    this.numberCharacter = people.numberCharacter;
  }
}

export default People;