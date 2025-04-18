import { Product } from '../../../domain/product/entity/product';
import { ProductGateway } from '../../../domain/product/gateway/product.gateway';
import { UseCase } from '../../useCase';

export type ListProductInputDto = void;

export type ListProductOutputDto = {
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

export class ListProductUsecase
  implements UseCase<ListProductInputDto, ListProductOutputDto>
{
  private constructor(private readonly productGateway: ProductGateway) {}

  public static create(productGateway: ProductGateway): ListProductUsecase {
    return new ListProductUsecase(productGateway);
  }

  public async execute(): Promise<ListProductOutputDto> {
    const aProducts = await this.productGateway.list();

    const output = this.presentOutput(aProducts);

    return output;
  }

  private presentOutput(products: Product[]): ListProductOutputDto {
    return {
      products: products.map((item) => {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        };
      }),
    };
  }
}
