import { Service } from 'typedi';
import { BaseRepository } from '../../base/base.repository';
import { IPlanetDocument } from '../interfaces/planet.interfaces';
import { Planet, PlanetModel } from '../schemas/planet.schema';

@Service()
export class PlanetRepository extends BaseRepository<IPlanetDocument, Planet> {
  constructor() {
    super(PlanetModel);
  }
}