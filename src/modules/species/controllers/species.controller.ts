import { Controller } from 'routing-controllers';
import { Service } from 'typedi';
import { BaseController } from '../../base/base.controller';
import { CreateSpeciesDTO, ISpeciesDocument, UpdateSpeciesDTO } from '../interfaces/species.interfaces';
import { Species } from '../schemas/species.schema';
import { SpeciesUseCase } from '../use-case/species.use-case';

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
