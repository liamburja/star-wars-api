import { Schema, model } from 'mongoose';
import { IPeopleDocument } from '../interfaces/people.interfaces';

const peopleSchema = new Schema({
  name: { type: String, required: true },
  height: { type: Number },
  mass: { type: Number },
  hair_color: { type: String, required: true },
  skin_color: { type: String, required: true },
  eye_color: { type: String, required: true },
  birth_year: { type: String, required: true },
  gender: { type: String, required: true },
  homeworld: { type: String, required: true },
  films: { type: [String] },
  species: { type: [String] },
  vehicles: { type: [String] },
  starships: { type: [String] },
  numberCharacter: { type: Number, required: true }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: function(doc: any, ret: any) {
      ret.id = ret._id.toString();
      delete ret._id;
      return ret;
    }
  }
});

export const PeopleModel = model<IPeopleDocument>('People', peopleSchema);

export { default as People } from '../interfaces/people';