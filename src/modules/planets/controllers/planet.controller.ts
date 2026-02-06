import { Controller } from 'routing-controllers';
import { Service } from 'typedi';
import { BaseController } from '../../base/base.controller';
import { CreatePlanetDTO, IPlanetDocument, UpdatePlanetDTO } from '../interfaces/planet.interfaces';
import { Planet } from '../schemas/planet.schema';
import { PlanetUseCase } from '../use-case/planet.use-case';

@Controller('/planets')
@Service()
export class PlanetController extends BaseController<
  IPlanetDocument,
  Planet,
  CreatePlanetDTO,
  UpdatePlanetDTO
> {
  constructor(private planetUseCase: PlanetUseCase) {
    super(planetUseCase, 'planet');
  }
}