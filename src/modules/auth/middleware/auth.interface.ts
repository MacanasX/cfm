import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface MiddlewareResponse extends Response {
  locals: {
    payload: JwtPayload;
  };
}
