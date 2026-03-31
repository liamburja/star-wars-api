import { IStarship } from './starship.interfaces';

class Starship implements IStarship {
  id: string;

  numberStarships: number;

  constructor(starships: IStarship) {
    this.id = starships.id;

    this.numberStarships = starships.numberStarships;
  }
}

export default Starship;