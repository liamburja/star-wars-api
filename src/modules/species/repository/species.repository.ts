import { Service } from 'typedi';
import { BaseRepository } from '../../base/base.repository';
import { ISpeciesDocument } from '../interfaces/species.interfaces';
import { Species, SpeciesModel } from '../schemas/species.schema';

@Service()
export class SpeciesRepository extends BaseRepository<ISpeciesDocument, Species> {
  constructor() {
    super(SpeciesModel);
  }
}
