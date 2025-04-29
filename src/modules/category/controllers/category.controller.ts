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
    const response = await this.findCategoryService.execute();

    if (response.err) {
      return res
        .status(response.val.statusCode)
        .json({ error: response.val.message });
    }

    return res.status(200).json(response);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const data = {
      icon_svg: req.body.icon_svg,
      title: req.body.title,
      color: req.body.color,
    };

    const response = await this.createCategoryService.execute(data);

    if (response.err) {
      return res
        .status(response.val.statusCode)
        .json({ error: response.val.message });
    }

    return res.status(201).json({ response });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const data = {
      id: req.params.id,
      icon_svg: req.body.icon_svg,
      title: req.body.title,
      color: req.body.color,
    };

    const response = await this.updateCategoryService.execute(data);

    if (response.err) {
      return res
        .status(response.val.statusCode)
        .json({ error: response.val.message });
    }

    return res.status(200).json({ response });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const data = {
      id: req.params.id,
    };

    const response = await this.deleteCategoryService.execute(data);

    if (response.err) {
      return res
        .status(response.val.statusCode)
        .json({ error: response.val.message });
    }

    return res.status(204).send();
  }
}
