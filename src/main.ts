import { ApiExpress } from './infra/api/express/api.express';
import { CreateProductRoute } from './infra/api/express/routes/product/create-product.express.route';
import { ListProductRoute } from './infra/api/express/routes/product/list-product.express.route';
import { ProductRepositoryPrisma } from './infra/repositories/product/prisma/product.repository.prisma';
import { prisma } from './package/prisma/prisma';
import { CreateProductUsecase } from './usecases/product/create/create-product';
import { ListProductUsecase } from './usecases/product/list/list-product';

function main() {
  const aRepository = ProductRepositoryPrisma.create(prisma);

  const createProductUsecase = CreateProductUsecase.create(aRepository);
  const listProductUsecase = ListProductUsecase.create(aRepository);

  const createRoute = CreateProductRoute.create(createProductUsecase);
  const listRoute = ListProductRoute.create(listProductUsecase);

  const api = ApiExpress.create([createRoute, listRoute]);
  const port = 3000;
  api.start(port);
}

main();
