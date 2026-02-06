import { Service } from 'typedi';
import { BaseRepository } from '../../base/base.repository';
import { IPeopleDocument } from '../interfaces/people.interfaces';
import { People, PeopleModel } from '../schemas/people.schema';

@Service()
export class PeopleRepository extends BaseRepository<IPeopleDocument, People> {
  constructor() {
    super(PeopleModel);
  }
}