import { Service } from 'typedi';
import { BaseUseCase } from '../../base/base.use-case';
import { PeopleRepository } from '../repository/people.repository';
import { CreatePeopleDTO, IPeopleDocument, UpdatePeopleDTO } from '../interfaces/people.interfaces';
import { People } from '../schemas/people.schema';
import { StarWarsApiService } from '../../../services/star-wars.api';

@Service()
export class PeopleUseCase extends BaseUseCase<
  IPeopleDocument,
  People,
  CreatePeopleDTO,
  UpdatePeopleDTO
> {
  starWarsService: StarWarsApiService;
  constructor(repository: PeopleRepository, starWarsService: StarWarsApiService) {
    super(repository);
    this.starWarsService = starWarsService;
  }
}