// types.ts

import { Request, Response, NextFunction } from 'express';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export interface RouteDefinition {
    method: HttpMethod;
    path: string;
    handlerName: string;
    middlewares?: Array<(req: Request, res: Response, next: NextFunction) => void>;
}

export interface ControllerDefinition {
    prefix: string;
    controllerClass: any;
    routes: RouteDefinition[];
}
