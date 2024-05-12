import { Request } from "express"
import { JwtPayload } from 'jsonwebtoken';

export interface IGetUserAuthInfoRequest extends Request {
    user?: JwtPayload // or any other type
  }