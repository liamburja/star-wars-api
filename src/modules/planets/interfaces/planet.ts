import { IPlanet } from './planet.interfaces';


class Planet implements IPlanet {
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
  

  constructor(planet: IPlanet) {
    this.id = planet.id;
    this.name = planet.name;
    this.rotation_period = planet.rotation_period;
    this.orbital_period = planet.orbital_period;
    this.diameter = planet.diameter;
    this.climate = planet.climate;
    this.gravity = planet.gravity;
    this.terrain = planet.terrain;
    this.surface_water = planet.surface_water;
    this.population = planet.population;
    this.residents = planet.residents || [];
    this.films = planet.films || [];
    this.numberPlantet = planet.numberPlantet;
  }
}

export default Planet;