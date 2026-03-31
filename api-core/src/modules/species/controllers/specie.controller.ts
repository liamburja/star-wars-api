import { Controller } from 'routing-controllers';
import { Service } from 'typedi';
import { BaseController } from '../../base/base.controller';
import { CreateSpeciesDTO, ISpeciesDocument, UpdateSpeciesDTO } from '../interfaces/specie.interfaces';
import { Species } from '../schemas/specie.schema';
import { SpeciesUseCase } from '../use-case/specie.use-case';

@Controller('/species')
@Service()
export class SpeciesController extends BaseController<
  ISpeciesDocument,
  Species,
  CreateSpeciesDTO,
  UpdateSpeciesDTO
> {
  constructor(private speciesUseCase: SpeciesUseCase) {
    super(speciesUseCase, 'species');
  }
}
