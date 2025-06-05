export function Controller(prefix: string): ClassDecorator {
  return (target: any) => {
    if (!target.prefix) {
      target.prefix = prefix;
    }
  };
}

export function Get(path: string = ""): MethodDecorator {
  return (target: any, propertyKey: any) => {
    const constructor = target.constructor;
    if (!constructor.routes) constructor.routes = [];
    constructor.routes.push({
      method: 'get',
      path,
      name: propertyKey as string
    });
  };
}

export function Post(path: string = ""): MethodDecorator {
  return (target: any, propertyKey: any) => {
    const constructor = target.constructor;
    if (!constructor.routes) constructor.routes = [];
    constructor.routes.push({
      method: 'post',
      path,
      name: propertyKey as string
    });
  };
}

export function Put(path: string = ""): MethodDecorator {
  return (target: any, propertyKey: any) => {
    const constructor = target.constructor;
    if (!constructor.routes) constructor.routes = [];
    constructor.routes.push({
      method: 'put',
      path,
      name: propertyKey as string
    });
  };
}

export function Delete(path: string = ""): MethodDecorator {
  return (target: any, propertyKey: any) => {
    const constructor = target.constructor;
    if (!constructor.routes) constructor.routes = [];
    constructor.routes.push({
      method: 'delete',
      path,
      name: propertyKey as string
    });
  };
}