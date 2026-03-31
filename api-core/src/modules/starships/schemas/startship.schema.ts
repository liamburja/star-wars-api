import { Schema, model } from 'mongoose';
import { IStarshipDocument } from '../interfaces/starship.interfaces';

const starshipSchema = new Schema({
  name: { type: String, required: true },
  model_starship: { type: String, required: true },
  manufacturer: { type: String, required: true },
  cost_in_credits: { type: Number, required: true },
  lenght: { type: Number, required: true },
  max_atmosphering_speed: { type: Number, required: true },
  crew: { type: String, required: true },
  passengers: { type: Number, required: true },
  cargo_capacity: { type: Number, required: true },
  consumables: { type: String, required: true },
  hyperdrive_rating: { type: String, required: true },
  MGLT: { type: Number, required: true },
  starship_class: { type: String, required: true },
  pilots: [{ type: String }],
  films: [{ type: String }],
  numberStarships: { type: Number, required: true }
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

export const StarshipModel = model<IStarshipDocument>('Starship', starshipSchema);

export { default as Starship } from '../interfaces/starship';