import { Request, Response } from 'express';
import { FindCategoriesService } from '../services/findCategories.service';
import { CreateCategoryService } from '../services/createCategory.service';
import { UpdateCategoryByIdService } from '../services/updateCategoryById.service';
import { DeleteCategoryByIdService } from '../services/deleteCategoryById.service';

export class CategoryController {
  public constructor(
    private readonly findCategoriesService: FindCategoriesService,
    private readonly createCategoryService: CreateCategoryService,
    private readonly updateCategoryByIdService: UpdateCategoryByIdService,
    private readonly deleteCategoryByIdService: DeleteCategoryByIdService,
  ) {}

  public async find(req: Request, res: Response): Promise<Response> {
    const response = await this.findCategoriesService.execute();

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

    return res.status(201).json(response);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const data = {
      id: req.params.id,
      icon_svg: req.body.icon_svg,
      title: req.body.title,
      color: req.body.color,
    };

    const response = await this.updateCategoryByIdService.execute(data);

    if (response.err) {
      return res
        .status(response.val.statusCode)
        .json({ error: response.val.message });
    }

    return res.status(200).json(response);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const data = {
      id: req.params.id,
    };

    const response = await this.deleteCategoryByIdService.execute(data);

    if (response.err) {
      return res
        .status(response.val.statusCode)
        .json({ error: response.val.message });
    }

    return res.status(204).send();
  }
}
