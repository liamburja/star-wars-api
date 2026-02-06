import { Schema, model } from 'mongoose';
import { IPlanetDocument } from '../interfaces/planet.interfaces';

const planetSchema = new Schema({
  name: { type: String, required: true },
  rotation_period: { type: Number, required: true },
  orbital_period: { type: Number, required: true },
  diameter: { type: Number, required: true },
  climate: { type: String, required: true },
  gravity: { type: String, required: true },
  terrain: { type: String, required: true },
  surface_water: { type: Number, required: true },
  population: { type: Number, required: true },
  residents: [{ type: String }],
  films: [{ type: String }],
  numberPlantet: { type: Number, required: true }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: function(doc: unknown, ret: Record<string, unknown>) {
      ret.id = (ret as { _id: unknown })._id?.toString();
      delete (ret as { _id?: unknown })._id;
      return ret;
    }
  }
});

export const PlanetModel = model<IPlanetDocument>('Planet', planetSchema);

export { default as Planet } from '../interfaces/planet';