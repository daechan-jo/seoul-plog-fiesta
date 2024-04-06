import { Request as ExpressRequest } from 'express';

declare global {
  namespace Express {
    export interface User {
      id: string;
      username: string;
      email?: string;
      nickname?: string;
      name?: string;
      about?: string;
      activity?: string;
    }

    export interface Request {
      user?: User;
      token?: string;
    }
  }
}
