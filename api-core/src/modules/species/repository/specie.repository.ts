import { Service } from 'typedi';
import { BaseRepository } from '../../base/base.repository';
import { ISpeciesDocument } from '../interfaces/specie.interfaces';
import { Species, SpeciesModel } from '../schemas/specie.schema';

@Service()
export class SpeciesRepository extends BaseRepository<ISpeciesDocument, Species> {
  constructor() {
    super(SpeciesModel);
  }
}
