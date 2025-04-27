import { Request, Response } from 'express';
import { FindCategoryService } from '../services/find-category.service';
import { CreateCategoryService } from '../services/create-category.service';
import { UpdateCategoryService } from '../services/update-category.service';
import { DeleteCategoryService } from '../services/delete-category.service';

export class CategoryController {
  public constructor(
    private readonly findCategoryService: FindCategoryService,
    private readonly createCategoryService: CreateCategoryService,
    private readonly updateCategoryService: UpdateCategoryService,
    private readonly deleteCategoryService: DeleteCategoryService,
  ) {}

  public async find(req: Request, res: Response): Promise<Response> {
    try {
      const response = await this.findCategoryService.execute();
      return res.status(200).json(response);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      return res.status(400).json({ error: errorMessage });
    }
  }

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

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const data = {
        id: req.params.id,
        icon_svg: req.body.icon_svg,
        title: req.body.title,
        color: req.body.color,
      };

      const response = await this.updateCategoryService.execute(data);

      return res.status(200).json({ response });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      return res.status(400).json({ error: errorMessage });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const data = {
        id: req.params.id,
      };

      await this.deleteCategoryService.execute(data);
      return res.status(204).send();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      return res.status(400).json({ error: errorMessage });
    }
  }
}
