/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { Document } from 'mongoose';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  QueryParam,
  Res
} from 'routing-controllers';
import {
  sendOk,
  sendCreated,
  sendNotFound,
  sendInternalServerError
} from '../../utils/responses.utils';
import { BaseUseCase } from './base.use-case';

export class BaseController<
  TDocument extends Document,
  TReturn = TDocument,
  TCreateDTO = Partial<TReturn>,
  TUpdateDTO = Partial<TReturn>
> {
  protected useCase: BaseUseCase<TDocument, TReturn, TCreateDTO, TUpdateDTO>;
  private resourceName: string;

  constructor(
    useCase: BaseUseCase<TDocument, TReturn, TCreateDTO, TUpdateDTO>,
    resourceName = 'resource'
  ) {
    this.useCase = useCase;
    this.resourceName = resourceName;
  }

  @Post()
  async create(
    @Body() data: TCreateDTO,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const result = await this.useCase.create(data);
      return sendCreated(res, result);
    } catch (error: any) {
      console.error('Error creating:', error);
      return sendInternalServerError(res);
    }
  }

  @Get('/:id')
  async findById(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const result = await this.useCase.findById(id);
      
      if (!result) {
        return sendNotFound(res, `${this.resourceName} not found`);
      }
      
      return sendOk(res, result);
    } catch (error: any) {
      return sendInternalServerError(res);
    }
  }

  @Get()
  async findAll(
    @QueryParam('page') page: number,
    @QueryParam('limit') limit: number,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const safePage = Number.isFinite(page) && page > 0 ? page : 1;
      const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;
      
      const result = await this.useCase.findAll(safePage, safeLimit);
      return sendOk(res, result);
    } catch (error: any) {
      return sendInternalServerError(res);
    }
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() data: TUpdateDTO,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const result = await this.useCase.update(id, data);
      
      if (!result) {
        return sendNotFound(res, `${this.resourceName} not found`);
      }
      
      return sendOk(res, result);
    } catch (error: any) {
      return sendInternalServerError(res);
    }
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const result = await this.useCase.delete(id);
      
      if (!result) {
        return sendNotFound(res, `${this.resourceName} not found`);
      }
      
      return sendOk(res, { message: `${this.resourceName} deleted successfully` });
    } catch (error: any) {
      return sendInternalServerError(res);
    }
  }
}