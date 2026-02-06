import 'reflect-metadata';
import { Container } from 'typedi';
import { setupContainer } from '../../container';
import { CreatePlanetDTO } from '../../modules/planets/interfaces/planet.interfaces';
import { PlanetUseCase } from '../../modules/planets/use-case/planet.use-case';
import { DataType, StarWarsApiService } from '../../services/star-wars.api';
import Database from '../../shared/database';
import logger from '../../shared/logger';
import { extractFinallyUrlNumber } from '../../utils/function-utils';
import { AddPlanet } from '../addData/add-planets';

async function UpdatePlanet() {
  await Database.connect();

  setupContainer();

  const planetUseCase = Container.get(PlanetUseCase);
  const starWarsApiService = Container.get(StarWarsApiService);

  logger.info('Fetching planets from Star Wars API...');

  const { results } = await starWarsApiService.getData(DataType.PLANETS);
  const { data } = await planetUseCase.findAll(1, 1000);

  for (const planet of results) {
    const numberPlanet = extractFinallyUrlNumber(planet.url, 'planets');

    const existingPlanet = data.find(p => p.numberPlantet === numberPlanet);

    try {
      if (!existingPlanet) {
        const planetData: CreatePlanetDTO = {
          name: planet.name,
          rotation_period: parseInt(planet.rotation_period) || 0,
          orbital_period: parseInt(planet.orbital_period) || 0,
          diameter: parseInt(planet.diameter) || 0,
          climate: planet.climate,
          gravity: planet.gravity,
          terrain: planet.terrain,
          surface_water: parseInt(planet.surface_water) || 0,
          population: parseInt(planet.population) || 0,
          numberPlantet: numberPlanet,
        };
        await AddPlanet(planetData);
        logger.info(`Created planet: ${planet.name} (Number: ${numberPlanet})`);
      } else {
        const apiData = {
          name: planet.name,
          rotation_period: parseInt(planet.rotation_period) || 0,
          orbital_period: parseInt(planet.orbital_period) || 0,
          diameter: parseInt(planet.diameter) || 0,
          climate: planet.climate,
          gravity: planet.gravity,
          terrain: planet.terrain,
          surface_water: parseInt(planet.surface_water) || 0,
          population: parseInt(planet.population) || 0,
          numberPlantet: numberPlanet,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updates: any = {};

        (Object.keys(apiData) as Array<keyof typeof apiData>).forEach((key) => {
          if (apiData[key] !== existingPlanet[key]) {
            updates[key] = apiData[key];
          }
        });

        if (Object.keys(updates).length > 0) {
          await planetUseCase.update(existingPlanet.id, updates);
          logger.info(`Updated planet: ${planet.name} - Changed: ${Object.keys(updates).join(', ')}`);
        } else {
          logger.info(`No changes for: ${planet.name}`);
        }
      }
    } catch (error) {
      logger.error(`Failed to update planet: ${planet.name}. Error: ${error}`);
    }
  }

  await Database.disconnect();
}

UpdatePlanet();
