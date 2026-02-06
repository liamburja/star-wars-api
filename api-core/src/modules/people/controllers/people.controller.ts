import { JsonController } from 'routing-controllers';
import { Service } from 'typedi';
import { BaseController } from '../../base/base.controller';
import { CreatePeopleDTO, IPeopleDocument, UpdatePeopleDTO } from '../interfaces/people.interfaces';
import { People } from '../schemas/people.schema';
import { PeopleUseCase } from '../use-case/people.use-case';

@JsonController('/people')
@Service()
export class PeopleController extends BaseController<
  IPeopleDocument,
  People,
  CreatePeopleDTO,
  UpdatePeopleDTO
> {
  constructor(private peopleUseCase: PeopleUseCase) {
    super(peopleUseCase, 'people');
  }
}