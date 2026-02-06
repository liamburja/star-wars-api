import { Request, Response } from 'express';
import { BaseUseCase } from './base.use-case';
import { Document } from 'mongoose';
import {
  sendOk,
  sendCreated,
  sendNotFound,
  sendBadRequest,
  sendInternalServerError
} from '../../utils/responses.utils';

export class BaseController<
  TDocument extends Document,
  TReturn = TDocument,
  TCreateDTO = Partial<TReturn>,
  TUpdateDTO = Partial<TReturn>
> {
  protected useCase: BaseUseCase<TDocument, TReturn, TCreateDTO, TUpdateDTO>;

  constructor(useCase: BaseUseCase<TDocument, TReturn, TCreateDTO, TUpdateDTO>) {
    this.useCase = useCase;
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = req.body as TCreateDTO;
      const result = await this.useCase.create(data);
      return sendCreated(res, result);
    } catch (error: any) {
      console.error('Error creating:', error);
      return sendInternalServerError(res);
    }
  };

  findById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params as { id: string };
      const result = await this.useCase.findById(id);
      
      if (!result) {
        return sendNotFound(res, 'Resource not found');
      }
      
      return sendOk(res, result);
    } catch (error: any) {
      return sendInternalServerError(res);
    }
  };

  findAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await this.useCase.findAll(page, limit);
      return sendOk(res, result);
    } catch (error: any) {
      return sendInternalServerError(res);
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params as { id: string };
      const data = req.body as TUpdateDTO;
      
      const result = await this.useCase.update(id, data);
      
      if (!result) {
        return sendNotFound(res, 'Resource not found');
      }
      
      return sendOk(res, result);
    } catch (error: any) {
      return sendInternalServerError(res);
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params as { id: string };
      const result = await this.useCase.delete(id);
      
      if (!result) {
        return sendNotFound(res, 'Resource not found');
      }
      
      return sendOk(res, { message: 'Resource deleted successfully' });
    } catch (error: any) {
      return sendInternalServerError(res);
    }
  };
}