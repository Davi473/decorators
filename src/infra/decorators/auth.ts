import { tokenAuth } from '../middlewares/tokenAuth';

export function Auth(): MethodDecorator {
  return function (target: any, propertyKey: string | symbol) {
    const constructor = target.constructor;
    constructor.routes.map((valor: any) => {
      if (valor.name === propertyKey)
        valor.middlewares = [tokenAuth]
    });
  };
}