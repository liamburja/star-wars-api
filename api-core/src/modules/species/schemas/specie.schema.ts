import { Schema, model } from 'mongoose';
import { ISpeciesDocument } from '../interfaces/specie.interfaces';

const speciesSchema = new Schema({
  name: { type: String, required: true },
  classification: { type: String, required: true },
  designation: { type: String, required: true },
  average_height: { type: Number, required: true },
  skin_colors: { type: String, required: true },
  hair_colors: { type: String, required: true },
  eye_colors: { type: String, required: true },
  average_lifespan: { type: Number, required: true },
  homeworld: { type: String, required: true },
  language: { type: String, required: true },
  people: [{ type: String }],
  films: [{ type: String }],
  numberSpecies: { type: Number, required: true }
}, {
  timestamps: true,
  versionKey: false,
  strict: false,
  toJSON: {
    transform: function(doc: unknown, ret: Record<string, unknown>) {
      ret.id = (ret as { _id: unknown })._id?.toString();
      delete (ret as { _id?: unknown })._id;
      return ret;
    }
  }
});

export const SpeciesModel = model<ISpeciesDocument>('Species', speciesSchema);

export { default as Species } from '../interfaces/specie';
