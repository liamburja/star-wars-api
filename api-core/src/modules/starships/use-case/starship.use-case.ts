import { Service } from 'typedi';
import { BaseUseCase } from '../../base/base.use-case';
import { CreateStarshipDTO, IStarshipDocument, UpdateStarshipDTO } from '../interfaces/starship.interfaces';
import { StarshipsRepository } from '../repository/starship.repository';
import { Starship } from '../schemas/startship.schema';

@Service()
export class StarshipsUseCase extends BaseUseCase<
  IStarshipDocument,
  Starship,
  CreateStarshipDTO,
  UpdateStarshipDTO
> {
  constructor(repository: StarshipsRepository) {
    super(repository, 'starships');
  }
}
