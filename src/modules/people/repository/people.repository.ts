import { Service } from "typedi";
import { BaseRepository } from "../../base/base.repository";
import { People, PeopleModel } from "../schemas/people.schema";
import { IPeopleDocument } from "../interfaces/people.interfaces";

@Service()
export class PeopleRepository extends BaseRepository<IPeopleDocument, People> {
  constructor() {
    super(PeopleModel);
  }
}