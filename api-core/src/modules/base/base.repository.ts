/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, Model, PipelineStage } from 'mongoose';

export class BaseRepository<TDocument extends Document, TReturn = TDocument> {
  protected model: Model<TDocument>;

  constructor(model: Model<TDocument>) {
    this.model = model;
  }

  // Método para transformar documento a tipo de retorno
  protected transform(document: TDocument): TReturn {
    return document.toJSON() as unknown as TReturn;
  }

  async create(data: Partial<TReturn>): Promise<TReturn> {
    try {
      const document = new this.model(data);
      const savedDocument = await document.save();
      return this.transform(savedDocument);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findById(id: string): Promise<TReturn | null> {
    try {
      const document = await this.model.findById(id);
      return document ? this.transform(document) : null;
    } catch (error: any) {
      throw new Error(error.message);
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
  }> {
    try {
      const skip = (page - 1) * limit;
      
      if (pipeline && pipeline.length > 0) {
        const aggregationPipeline = [
          ...pipeline,
          { $skip: skip },
          { $limit: limit },
          {$addFields: {id: '$_id'}}
        ];
        
        const countPipeline = [
          ...pipeline,
          { $count: 'total' }
        ];
        
        const [documents, countResult] = await Promise.all([
          this.model.aggregate(aggregationPipeline),
          this.model.aggregate(countPipeline)
        ]);
        
        const total = countResult.length > 0 ? countResult[0].total : 0;
        const pages = Math.ceil(total / limit);
        
        return {
          data: documents as TReturn[],
          total,
          pages
        };
      } else {
        //  use standard find when pipeline is not provided
        const [documents, total] = await Promise.all([
          this.model.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
          this.model.countDocuments()
        ]);

        const pages = Math.ceil(total / limit);

        return {
          data: documents.map(doc => this.transform(doc)),
          total,
          pages
        };
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async aggregate(pipeline: PipelineStage[]): Promise<any[]> {
    try {
      return await this.model.aggregate(pipeline);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.model.findByIdAndDelete(id); 
      return result ? true : false;
    } catch (error: any) {
      throw new Error(`Error delete: ${error.message}`);
    }
  }

  async update(id: string, data: Partial<TReturn>): Promise<TReturn | null> {
    try {

      const findDocument = await this.model.findById(id);
      if (!findDocument) {
        return null;
      }

      const updatedDocument = await this.model.findByIdAndUpdate(
        id,
        data as any,
        { new: true, runValidators: true }
      );
      return updatedDocument ? this.transform(updatedDocument) : null;
    } catch (error: any) {

      throw new Error(`Error update: ${error.message}`);
    }
  }
    
}