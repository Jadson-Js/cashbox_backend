export class AppError extends Error {
  protected constructor(
    public readonly message: string,
    public readonly statusCode: number = 400,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InternalServerError extends AppError {
  public constructor() {
    super('Internal server error', 500);
  }
}

export class NotFoundError extends AppError {
  public constructor(message: string) {
    super(message, 404);
  }
}

export class UnauthorizedError extends AppError {
  public constructor() {
    super('Unauthorized', 401);
  }
}

export class ForbiddenError extends AppError {
  public constructor() {
    super('Forbidden', 403);
  }
}
