import { Service } from 'typedi';
import { BaseUseCase } from '../../base/base.use-case';
import { CreateSpeciesDTO, ISpeciesDocument, UpdateSpeciesDTO } from '../interfaces/specie.interfaces';
import { SpeciesRepository } from '../repository/specie.repository';
import { Species } from '../schemas/specie.schema';

@Service()
export class SpeciesUseCase extends BaseUseCase<
  ISpeciesDocument,
  Species,
  CreateSpeciesDTO,
  UpdateSpeciesDTO
> {
  constructor(repository: SpeciesRepository) {
    super(repository, 'species');
  }
}
