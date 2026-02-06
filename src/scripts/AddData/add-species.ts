import 'reflect-metadata';
import { Container } from 'typedi';
import { setupContainer } from '../../container';
import { CreateSpeciesDTO } from '../../modules/species/interfaces/species.interfaces';
import { SpeciesUseCase } from '../../modules/species/use-case/species.use-case';
import { DataType, StarWarsApiService } from '../../services/star-wars.api';
import Database from '../../shared/database';
import logger from '../../shared/logger';
import { extractFinallyUrlNumber } from '../../utils/function-utils';


async function AddAllSpecies() {
	await Database.connect();

	setupContainer();

	const speciesUseCase = Container.get(SpeciesUseCase);
	const starWarsApiService = Container.get(StarWarsApiService);

	logger.info('Fetching species from Star Wars API...');

	const { results } = await starWarsApiService.getData(DataType.SPECIES);

	for (const species of results) {
		try {
			const numberSpecies = extractFinallyUrlNumber(species.url, 'species');
			const speciesData: CreateSpeciesDTO = {
        name: species.name,
        classification: species.classification,
        designation: species.designation,
        average_height: parseInt(species.average_height),
        skin_colors: species.skin_colors,
        hair_colors: species.hair_colors,
        eye_colors: species.eye_colors,
        average_lifespan: parseInt(species.average_lifespan),
        homeworld: species.homeworld,
        language: species.language,
				numberSpecies: numberSpecies
			};

			await speciesUseCase.create(speciesData);
			logger.info(`Added species: ${species.name} (Number: ${numberSpecies})`);
		} catch (error) {
			logger.error(`Failed to add species: ${species.name}. Error: ${error}`);
		}
	}

	await Database.disconnect();
}

export async function AddSpecies(data: CreateSpeciesDTO) {
	await Database.connect();

	setupContainer();

	const speciesUseCase = Container.get(SpeciesUseCase);

	logger.info(`Adding species: ${data.name as string}`);

	try {
		await speciesUseCase.create(data);
	} catch (error) {
		logger.error(`Failed to add species: ${data.name as string}. Error: ${error}`);
	}
}

AddAllSpecies();
