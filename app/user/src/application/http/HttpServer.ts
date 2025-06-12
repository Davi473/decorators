export default interface HttpServer {
  registerRoutes(controller: any): Promise<void>;
  register(parametros: string[], method: string, url: string,
      middlewares: Function[], handler: Function): Promise<void>;
  listen(port: number): Promise<void>;
}