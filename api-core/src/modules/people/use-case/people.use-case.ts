import { StarWarsApiService } from '../../../services/star-wars.api';
import { Service } from 'typedi';
import { BaseUseCase } from '../../base/base.use-case';
import { CreatePeopleDTO, IPeopleDocument, UpdatePeopleDTO } from '../interfaces/people.interfaces';
import { PeopleRepository } from '../repository/people.repository';
import { People } from '../schemas/people.schema';

@Service()
export class PeopleUseCase extends BaseUseCase<
  IPeopleDocument,
  People,
  CreatePeopleDTO,
  UpdatePeopleDTO
> {
  starWarsService: StarWarsApiService;
  constructor(repository: PeopleRepository, starWarsService: StarWarsApiService) {
    super(repository, 'people');
    this.starWarsService = starWarsService;
  }
}