import { Schema, model } from 'mongoose';
import { IFilmDocument } from '../interfaces/film.interfaces';

const filmSchema = new Schema({
  title: { type: String, required: true },
  episode_id: { type: Number, required: true },
  opening_crawl: { type: String, required: true },
  director: { type: String, required: true },
  producer: { type: String, required: true },
  release_date: { type: Date, required: true },
  characters: [{ type: String }],
  planets: [{ type: String }],
  starships: [{ type: String }],
  vehicles: [{ type: String }],
  species: [{ type: String }],
  url: { type: String, required: true }
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

export const FilmModel = model<IFilmDocument>('Film', filmSchema);

export { default as Film } from '../interfaces/film';