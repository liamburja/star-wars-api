import 'reflect-metadata';
import { Container } from 'typedi';
import Database from '../../shared/database';
import logger from '../../shared/logger';
import { setupContainer } from '../../container';
import { PeopleUseCase } from '../../modules/people/use-case/people.use-case';
import { DataType, StarWarsApiService } from '../../services/star-wars.api';
import { extractCharacterNumber, parseNumber } from '../../utils/function-utils';
import { CreatePeopleDTO } from '../../modules/people/interfaces/people.interfaces';


async function AddAllPeople() {
  await Database.connect()

  setupContainer();

  const peopleUseCase = Container.get(PeopleUseCase);
  const starWarsApiService = Container.get(StarWarsApiService);


  logger.info('Fetching people from Star Wars API...');

  const {results} = await starWarsApiService.getData(DataType.PEOPLE);

  for (const person of results) {
    try {
      const numberCharacter = extractCharacterNumber(person.url);
      const peopleData: CreatePeopleDTO = {
        name: person.name,
        height: parseNumber(person.height) ? parseNumber(person.height)! : undefined,
        mass: parseNumber(person.mass) ? parseNumber(person.mass)! : undefined,
        hair_color: person.hair_color,
        skin_color: person.skin_color,
        eye_color: person.eye_color,
        birth_year: person.birth_year,
        gender: person.gender,
        homeworld: person.homeworld,
        numberCharacter: numberCharacter,
      };
      
      await peopleUseCase.create(peopleData);
      logger.info(`Added character: ${person.name} (Number: ${numberCharacter})`);
    } catch (error) {
      logger.error(`Failed to add character: ${person.name}. Error: ${error}`);
    }
  }

  await Database.disconnect();
}

export async function AddPeople(data: CreatePeopleDTO) {
  await Database.connect()

  setupContainer();

  const peopleUseCase = Container.get(PeopleUseCase);

  logger.info(`Adding character: ${data.name}`);

  try {
    await peopleUseCase.create(data);
  } catch (error) {
    logger.error(`Failed to add character: ${data.name}. Error: ${error}`);
  }
}

// AddAllPeople();