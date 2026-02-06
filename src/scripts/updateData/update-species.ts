import 'reflect-metadata';
import { Container } from 'typedi';
import { setupContainer } from '../../container';
import { CreateSpeciesDTO } from '../../modules/species/interfaces/species.interfaces';
import { SpeciesUseCase } from '../../modules/species/use-case/species.use-case';
import { DataType, StarWarsApiService } from '../../services/star-wars.api';
import Database from '../../shared/database';
import logger from '../../shared/logger';
import { extractFinallyUrlNumber } from '../../utils/function-utils';
import { AddSpecies } from '../addData/add-species';

async function UpdateSpecies() {
  await Database.connect();

  setupContainer();

  const speciesUseCase = Container.get(SpeciesUseCase);
  const starWarsApiService = Container.get(StarWarsApiService);

  logger.info('Fetching species from Star Wars API...');

  const { results } = await starWarsApiService.getData(DataType.SPECIES);
  const { data } = await speciesUseCase.findAll(1, 1000);

  for (const species of results) {
    const numberSpecies = extractFinallyUrlNumber(species.url, 'species');

    const existingSpecies = data.find(s => (s as { numberSpecies?: number }).numberSpecies === numberSpecies);

    try {
      if (!existingSpecies) {
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
        await AddSpecies(speciesData);
        logger.info(`Created species: ${species.name} (Number: ${numberSpecies})`);
      } else {
        const apiData = {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updates: any = {};

        (Object.keys(apiData) as Array<keyof typeof apiData>).forEach((key) => {
          if (apiData[key] !== existingSpecies[key]) {
            updates[key] = apiData[key];
          }
        });

        if (Object.keys(updates).length > 0) {
          await speciesUseCase.update((existingSpecies as { id: string }).id, updates);
          logger.info(`Updated species: ${species.name} - Changed: ${Object.keys(updates).join(', ')}`);
        } else {
          logger.info(`No changes for: ${species.name}`);
        }
      }
    } catch (error) {
      logger.error(`Failed to update species: ${species.name}. Error: ${error}`);
    }
  }

  await Database.disconnect();
}

UpdateSpecies();
