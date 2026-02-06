import { Document } from 'mongoose';
import { BaseRepository } from './base.repository';
import { PipelineStage } from 'mongoose';

export class BaseUseCase<
  TDocument extends Document,
  TReturn = TDocument,
  TCreateDTO = Partial<TReturn>,
  TUpdateDTO = Partial<TReturn>
> {
  protected repository: BaseRepository<TDocument, TReturn>;

  constructor(repository: BaseRepository<TDocument, TReturn>) {
    this.repository = repository;
  }

  async create(data: TCreateDTO): Promise<TReturn> {
    try {
      return await this.repository.create(data as Partial<TReturn>);
    } catch (error: any) {
      throw new Error(`Error creating resource: ${error.message}`);
    }
  }

  async findById(id: string): Promise<TReturn | null> {
    try {
      const result = await this.repository.findById(id);
      if (!result) {
        throw new Error('Resource not found');
      }
      return result;
    } catch (error: any) {
      throw new Error(`Error finding resource: ${error.message}`);
    }
  }

  async findAll(
    page = 1,
    limit = 10,
    pipeline?: PipelineStage[]
  ): Promise<{
    data: TReturn[];
    total: number;
    pages: number;
    page: number;
    limit: number;
  }> {
    try {
      const result = await this.repository.findAll(page, limit, pipeline);
      return {
        ...result,
        page,
        limit
      };
    } catch (error: any) {
      throw new Error(`Error finding resources: ${error.message}`);
    }
  }

  async update(id: string, data: TUpdateDTO): Promise<TReturn | null> {
    try {
      const result = await this.repository.update(id, data as Partial<TReturn>);
      if (!result) {
        throw new Error('Resource not found');
      }
      return result;
    } catch (error: any) {
      throw new Error(`Error updating resource: ${error.message}`);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.repository.delete(id);
      if (!result) {
        throw new Error('Resource not found');
      }
      return result;
    } catch (error: any) {
      throw new Error(`Error deleting resource: ${error.message}`);
    }
  }

  async aggregate(pipeline: PipelineStage[]): Promise<any[]> {
    try {
      return await this.repository.aggregate(pipeline);
    } catch (error: any) {
      throw new Error(`Error aggregating resources: ${error.message}`);
    }
  }
}