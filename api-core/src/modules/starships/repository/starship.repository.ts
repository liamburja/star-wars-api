import { Service } from 'typedi';
import { BaseRepository } from '../../base/base.repository';
import { IStarshipDocument } from '../interfaces/starship.interfaces';
import { Starship, StarshipModel } from '../schemas/startship.schema';

@Service()
export class StarshipsRepository extends BaseRepository<IStarshipDocument, Starship> {
  constructor() {
    super(StarshipModel);
  }
}
