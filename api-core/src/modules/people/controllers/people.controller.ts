import { Service } from 'typedi';
import { BaseController } from '../../base/base.controller';
import { PeopleUseCase } from '../use-case/people.use-case';
import { IPeopleDocument, CreatePeopleDTO, UpdatePeopleDTO } from '../interfaces/people.interfaces';
import { People } from '../schemas/people.schema';

@Service()
export class PeopleController extends BaseController<
  IPeopleDocument,
  People,
  CreatePeopleDTO,
  UpdatePeopleDTO
> {
  constructor(private peopleUseCase: PeopleUseCase) {
    super(peopleUseCase);
  }
}