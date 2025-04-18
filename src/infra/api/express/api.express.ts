import { Api } from '../api';
import express, { Express } from 'express';
import { Route } from './routes/route';

export class ApiExpress implements Api {
  private app: Express;

  private constructor(routes: Route[]) {
    this.app = express();
    this.app.use(express.json());
    this.addRoutes(routes);
  }

  public static create(routes: Route[]): ApiExpress {
    return new ApiExpress(routes);
  }

  private addRoutes(routes: Route[]): void {
    routes.forEach((route) => {
      const path = route.getPath();
      const method = route.getMethod();
      const handler = route.getHandler();

      this.app[method](path, handler);
    });
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      this.listRoutes();
    });
  }

  private listRoutes(): void {
    console.log('Registered routes:');
  }
}
