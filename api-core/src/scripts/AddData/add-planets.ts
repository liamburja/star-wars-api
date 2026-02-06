import 'reflect-metadata';
import { Container } from 'typedi';
import { setupContainer } from '../../container';
import { CreatePlanetDTO } from '../../modules/planets/interfaces/planet.interfaces';
import { PlanetUseCase } from '../../modules/planets/use-case/planet.use-case';
import { DataType, StarWarsApiService } from '../../services/star-wars.api';
import Database from '../../shared/database';
import logger from '../../shared/logger';
import { extractFinallyUrlNumber } from '../../utils/function-utils';


async function AddAllPlanets() {
	await Database.connect();

	setupContainer();

	const planetUseCase = Container.get(PlanetUseCase);
	const starWarsApiService = Container.get(StarWarsApiService);

	logger.info('Fetching planets from Star Wars API...');

	const { results } = await starWarsApiService.getData(DataType.PLANETS);

	for (const planet of results) {
		try {
			const numberPlanet = extractFinallyUrlNumber(planet.url, 'planets');
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

			await planetUseCase.create(planetData);
			logger.info(`Added planet: ${planet.name} (Number: ${numberPlanet})`);
		} catch (error) {
			logger.error(`Failed to add planet: ${planet.name}. Error: ${error}`);
		}
	}

	await Database.disconnect();
}

export async function AddPlanet(data: CreatePlanetDTO) {
	await Database.connect();

	setupContainer();

	const planetUseCase = Container.get(PlanetUseCase);

	logger.info(`Adding planet: ${data.name}`);

	try {
		await planetUseCase.create(data);
	} catch (error) {
		logger.error(`Failed to add planet: ${data.name}. Error: ${error}`);
	}
}

AddAllPlanets();
