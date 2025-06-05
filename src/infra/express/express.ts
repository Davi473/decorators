// app.ts
import express from 'express';


export default function createServer() {
  const app: any = express();
  app.use(express.json());
  return { 
    listen: (port: number) => {
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    })}, 

    registerRoutes(controllerInstance: any) {
      const constructor = controllerInstance.constructor;
      const prefix = constructor.prefix || "";
      if (!constructor.routes) return;
      console.log(`\n------${prefix}------`)
      constructor.routes.forEach((route: any) => {
        if (!route.middlewares) route.middlewares = [];
        const fullPath = prefix + route.path;
        const handler: Function = controllerInstance[route.name].bind(controllerInstance);
        this.register(route.method, fullPath, route.middlewares, handler);
    })},

    register(
      method: string, url: string,
      middlewares: Function[] = [], handler: Function
    ) {
      app[method](url, ...middlewares, async (req: any, res: any) => {
        try {
          const result = await handler(req, res);
          if (result) res.json(result);
        } catch (e: any) {
          console.log(e.message);
          res.status(422).json({ message: e.message });
        }
      });
      console.log(`✅ [${method.toUpperCase()}] ${url}`);
    }
  }
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