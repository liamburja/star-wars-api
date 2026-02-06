/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, PipelineStage } from 'mongoose';
import { BaseRepository } from './base.repository';

export class BaseUseCase<
  TDocument extends Document,
  TReturn = TDocument,
  TCreateDTO = Partial<TReturn>,
  TUpdateDTO = Partial<TReturn>
> {
  protected repository: BaseRepository<TDocument, TReturn>;
  protected resourceName: string;

  constructor(repository: BaseRepository<TDocument, TReturn>, resourceName = 'resource') {
    this.repository = repository;
    this.resourceName = resourceName;
  }

  async create(data: TCreateDTO): Promise<TReturn> {
    try {
      return await this.repository.create(data as Partial<TReturn>);
    } catch (error: any) {
      throw new Error(`Error creating ${this.resourceName}: ${error.message}`);
    }
  }

  async findById(id: string): Promise<TReturn | null> {
    try {
      const result = await this.repository.findById(id);
      if (!result) {
        throw new Error(`${this.resourceName} not found`);
      }
      return result;
    } catch (error: any) {
      throw new Error(`Error finding ${this.resourceName}: ${error.message}`);
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
      throw new Error(`Error finding ${this.resourceName}: ${error.message}`);
    }
  }

  async update(id: string, data: TUpdateDTO): Promise<TReturn | null> {
    try {
      const result = await this.repository.update(id, data as Partial<TReturn>);
      if (!result) {
        throw new Error(`${this.resourceName} not found`);
      }
      return result;
    } catch (error: any) {
      throw new Error(`Error updating ${this.resourceName}: ${error.message}`);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.repository.delete(id);
      if (!result) {
        throw new Error(`${this.resourceName} not found`);
      }
      return result;
    } catch (error: any) {
      throw new Error(`Error deleting ${this.resourceName}: ${error.message}`);
    }
  }

  async aggregate(pipeline: PipelineStage[]): Promise<any[]> {
    try {
      return await this.repository.aggregate(pipeline);
    } catch (error: any) {
      throw new Error(`Error aggregating ${this.resourceName}: ${error.message}`);
    }
  }
}