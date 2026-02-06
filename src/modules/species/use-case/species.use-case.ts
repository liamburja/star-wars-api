import { Service } from 'typedi';
import { BaseUseCase } from '../../base/base.use-case';
import { CreateSpeciesDTO, ISpeciesDocument, UpdateSpeciesDTO } from '../interfaces/species.interfaces';
import { SpeciesRepository } from '../repository/species.repository';
import { Species } from '../schemas/species.schema';

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
