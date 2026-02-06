import { Schema, model } from 'mongoose';
import { ISpeciesDocument } from '../interfaces/species.interfaces';

const speciesSchema = new Schema({}, {
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

export { default as Species } from '../interfaces/species';
