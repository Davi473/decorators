// app.ts
import express from 'express';

const app: any = express();
import { ControllerDefinition } from '../../types';
export const controllers: ControllerDefinition[] = [];

// Registrar as rotas no Express
export default function createServer() {
    return { listen: (port: number) => {
        app.listen(port, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${port}`);
        });
    }}
}

function register(
  app: any,
  method: string,
  url: string,
  middlewares: Function[] = [],
  handler: Function
) {
  app[method](url, ...middlewares, async (req: any, res: any, next: any) => {
    try {
      const result = await handler(req, res);
      if (!res.headersSent) res.json(result);
    } catch (err) {
      next(err);
    }
  });
  console.log(`✅ [${method.toUpperCase()}] ${url}`);
}

const controllerRegistry: ControllerDefinition[] = [];
export function Controller(prefix: string): ClassDecorator {
    return (target: any) => {
        // Guarda os dados no próprio construtor da classe
        if (!target.routes) {
            target.routes = [];
        }

        controllerRegistry.push({
            prefix,
            controllerClass: target,
            routes: target.routes
        });
    };
}

interface RouteDefinition {
  method: string;
  path: string;
  name: string | symbol;
  middlewares: Function[];
}

function Get(path: string): MethodDecorator {
    return (target: any, propertyKey: any) => {
        const constructor = target.constructor;
        if (!constructor.routes) {
            constructor.routes = [];
        }

        constructor.routes.push({
            method: 'get',
            path,
            handlerName: propertyKey as string
        });
    };
}

// export function Get(path: string = ""): MethodDecorator {
//     return function (target: any, propertyKey: string | symbol) {
//         const constructor = target.constructor;
//         // Garante array para as rotas
//         if (!constructor.__routes) {
//             constructor.__routes = [] as RouteDefinition[];
//         }

//         // Pega middlewares pendentes ou vazio
//         const pendingMiddlewares = (constructor._pendingMiddlewares || {})[propertyKey] || [];
//         // Adiciona a rota na metadata da classe
//         constructor.__routes.push({
//             method: "get",
//             path,
//             name: propertyKey,
//             middlewares: pendingMiddlewares,
//         });

//         console.log(constructor)

//     };
// }

export function registerRoutes(valor: any) {
  const controllerInstance = new valor();
  const constructor = controllerInstance.constructor;
  const prefix = constructor.__prefix || "";

  if (!constructor.routes) return;
  console.log(constructor, "oie")

  constructor.__routes.forEach((route: RouteDefinition) => {
    const fullPath = prefix + route.path;
    const handler = controllerInstance[route.name].bind(controllerInstance);
    register(app, route.method, fullPath, route.middlewares, handler);
  });
}

import { tokenAuth } from '../middlewares/tokenAuth';

export function Auth(): MethodDecorator {
    return function (target: any, propertyKey: string | symbol) {
        const constructor = target.constructor;
        constructor._pendingMiddlewares = constructor._pendingMiddlewares || {};

        constructor._pendingMiddlewares[propertyKey] = constructor._pendingMiddlewares[propertyKey] || [];
        constructor._pendingMiddlewares[propertyKey].push(tokenAuth);
    };
}

// export function Body(): any {
//     return (target: any, propertyKey: string | symbol, parameterIndex: any) => {
//         Object.defineProperty(target, propertyKey, {
//             get: () => "Oie"
//         })
//     }
// }

// export function Params(valor: string): any {
//     return (target: any, propertyKey: string | symbol, parameterIndex: any) => {
//         // console.log("oiee");
//         // console.log('Método:', propertyKey);
//         // console.log('Parâmetro na posição:', parameterIndex);
//         Object.defineProperty(target, propertyKey, {
//             get: () => "Oie"
//         });
//     }
// }