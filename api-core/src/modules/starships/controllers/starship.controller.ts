import { Controller } from 'routing-controllers';
import { Service } from 'typedi';
import { BaseController } from '../../base/base.controller';
import { CreateStarshipDTO, IStarshipDocument, UpdateStarshipDTO } from '../interfaces/starship.interfaces';
import { Starship } from '../schemas/startship.schema';
import { StarshipsUseCase } from '../use-case/starship.use-case';

@Controller('/starships')
@Service()
export class StarshipsController extends BaseController<
  IStarshipDocument,
  Starship,
  CreateStarshipDTO,
  UpdateStarshipDTO
> {
  constructor(private starshipsUseCase: StarshipsUseCase) {
    super(starshipsUseCase, 'starships');
  }
}
