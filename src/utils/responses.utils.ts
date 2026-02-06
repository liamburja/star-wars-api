import { Response } from "express";
import status from 'http-status';

export const sendNotFound = (res: Response, message: string = 'Not found') => {
  return res.status(status.NOT_FOUND).json({
    message
  });
}

export const sendBadRequest = (res: Response, message: string = 'Bad request') => {
  return res.status(status.BAD_REQUEST).json({
    message
  });
}
 
export const sendOk = (res: Response, data: any) => {
  return res.status(status.OK).json(data);
}

export const sendOkNoData = (res: Response) => {
  return res.status(status.OK).send();
}

export const sendCreated = (res: Response, data: any) => {
  return res.status(status.CREATED).json(data);
}

export const sendInternalServerError = (res: Response) => {
  return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
}

export const getErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : String(error);
}