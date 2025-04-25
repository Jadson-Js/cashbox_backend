export class Result<T, E> {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly value?: T,
    public readonly error?: E,
  ) {}

  static ok<T>(value: T): Result<T, never> {
    return new Result(true, value);
  }

  static fail<E>(error: E): Result<never, E> {
    if (!error) {
      throw new Error('Error must be provided for a failed result.');
    }
    return new Result<never, E>(false, undefined, error);
  }

  isFailure(): this is { isSuccess: false; error: E } {
    return !this.isSuccess;
  }

  isSuccessResult(): this is { isSuccess: true; value: T } {
    return this.isSuccess;
  }
}

export class AppError extends Error {
  protected constructor(
    public readonly message: string,
    public readonly statusCode: number = 400,
  ) {
    super(message);
    this.name = this.constructor.name;
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
