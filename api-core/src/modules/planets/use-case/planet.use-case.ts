import { Service } from 'typedi';
import { BaseUseCase } from '../../base/base.use-case';
import { CreatePlanetDTO, IPlanetDocument, UpdatePlanetDTO } from '../interfaces/planet.interfaces';
import { PlanetRepository } from '../repository/planet.repository';
import { Planet } from '../schemas/planet.schema';

@Service()
export class PlanetUseCase extends BaseUseCase<
  IPlanetDocument,
  Planet,
  CreatePlanetDTO,
  UpdatePlanetDTO
> {
  constructor(repository: PlanetRepository) {
    super(repository, 'planet');
  }
}