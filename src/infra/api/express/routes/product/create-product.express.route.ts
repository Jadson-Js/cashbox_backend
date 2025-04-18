import { Request, Response } from 'express';
import {
  CreateProductInputDto,
  CreateProductUsecase,
} from '../../../../../usecases/product/create/create-product';
import { HttpMethod, Route } from '../route';

export type CreateProductResponseDto = {
  id: string;
};

export class CreateProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createProductService: CreateProductUsecase,
  ) {}

  public static create(
    createProductService: CreateProductUsecase,
  ): CreateProductRoute {
    return new CreateProductRoute(
      '/products',
      HttpMethod.post,
      createProductService,
    );
  }

  public getHandler() {
    return async (req: Request, res: Response) => {
      const { name, price } = req.body;

      const input: CreateProductInputDto = {
        name,
        price,
      };

      const output: CreateProductResponseDto =
        await this.createProductService.execute(input);

      const body = this.present(output);

      res.status(201).json(body);
    };
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  private present(input: CreateProductResponseDto): CreateProductResponseDto {
    const response = { id: input.id };

    return response;
  }
}
