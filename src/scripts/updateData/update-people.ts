import 'reflect-metadata';
import { Container } from 'typedi';
import { setupContainer } from '../../container';
import { CreatePeopleDTO } from '../../modules/people/interfaces/people.interfaces';
import { PeopleUseCase } from '../../modules/people/use-case/people.use-case';
import { DataType, StarWarsApiService } from '../../services/star-wars.api';
import Database from '../../shared/database';
import logger from '../../shared/logger';
import { extractFinallyUrlNumber, parseNumber } from '../../utils/function-utils';
import { AddPeople } from '../addData/add-people';


async function UpdatePeople() {
  await Database.connect();

  setupContainer();

  const peopleUseCase = Container.get(PeopleUseCase);
  const starWarsApiService = Container.get(StarWarsApiService);


  logger.info('Fetching people from Star Wars API...');

  const { results } = await starWarsApiService.getData(DataType.PEOPLE);
  const { data } = await peopleUseCase.findAll(1, 1000);

  for (const person of results) {
    const numberCharacter = extractFinallyUrlNumber(person.url, 'people');

    const existingPerson = data.find(p => p.numberCharacter === numberCharacter);

    try {
      if (!existingPerson) {
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
        await AddPeople(peopleData);
        logger.info(`Created character: ${person.name} (Number: ${numberCharacter})`);
      } else {

        const apiData = {
          name: person.name,
          height: parseNumber(person.height),
          mass: parseNumber(person.mass),
          hair_color: person.hair_color,
          skin_color: person.skin_color,
          eye_color: person.eye_color,
          birth_year: person.birth_year,
          gender: person.gender,
          homeworld: person.homeworld,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updates: any = {};

        (Object.keys(apiData) as Array<keyof typeof apiData>).forEach((key) => {
          if (apiData[key] !== existingPerson[key]) {
            updates[key] = apiData[key];
          }
        });

        if (Object.keys(updates).length > 0) {
          await peopleUseCase.update(existingPerson.id, updates);
          logger.info(`Updated character: ${person.name} - Changed: ${Object.keys(updates).join(', ')}`);
        } else {
          logger.info(`No changes for: ${person.name}`);
        }
      }
    } catch (error) {
      logger.error(`Failed to update character: ${person.name}. Error: ${error}`);
    }
  }

  await Database.disconnect();
}

UpdatePeople();