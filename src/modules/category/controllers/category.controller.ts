import { Request, Response } from 'express';
/* import { FindCategoryService } from '../services/find-category.service'; */
import { CreateCategoryService } from '../services/create-category.service';
/* import { LoginCategoryService } from '../services/login-category.service';
import { DeleteCategoryService } from '../services/delete-category.service'; */

export class CategoryController {
  public constructor(
    //private readonly findCategoryService: FindCategoryService,
    private readonly createCategoryService: CreateCategoryService,
    // private readonly loginCategoryService: LoginCategoryService,
    // private readonly deleteCategoryService: DeleteCategoryService,
  ) {}

  /*  public async find(req: Request, res: Response): Promise<Response> {
    try {
      const response = await this.findCategoryService.execute();
      return res.status(200).json(response);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      return res.status(400).json({ error: errorMessage });
    }
  } */

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = {
        icon_svg: req.body.icon_svg,
        title: req.body.title,
        color: req.body.color,
      };

      const response = await this.createCategoryService.execute(data);

      return res.status(201).json({ response });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      return res.status(400).json({ error: errorMessage });
    }
  }

  /* public async login(req: Request, res: Response): Promise<Response> {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const response = await this.loginCategoryService.execute(data);

      if (response.isFailure()) {
        const err = response.error!;
        return res.status(err.statusCode).json({ error: err.message });
      }

      return res.status(201).json({ response });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      return res.status(400).json({ error: errorMessage });
    }
  } */

  /* public async delete(req: Request, res: Response): Promise<Response> {
    try {
      await this.deleteCategoryService.execute();
      return res.status(204).send();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      return res.status(400).json({ error: errorMessage });
    }
  } */
}
