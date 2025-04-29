import { Request, Response } from 'express';
import { FindUserService } from '../services/find-user.service';
import { SignupUserService } from '../services/signup-user.service';
import { LoginUserService } from '../services/login-user.service';
import { DeleteUserService } from '../services/delete-user.service';

export class UserController {
  public constructor(
    private readonly findUserService: FindUserService,
    private readonly signupUserService: SignupUserService,
    private readonly loginUserService: LoginUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  // DESATUALIZADO
  public async find(req: Request, res: Response): Promise<Response> {
    try {
      const response = await this.findUserService.execute();
      return res.status(200).json(response);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      return res.status(400).json({ error: errorMessage });
    }
  }

  public async signup(req: Request, res: Response): Promise<Response> {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };

    const response = await this.signupUserService.execute(data);

    if (response.err) {
      return res
        .status(response.val.statusCode)
        .json({ error: response.val.message });
    }

    return res.status(201).json({ response });
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };

    const response = await this.loginUserService.execute(data);

    if (response.err) {
      return res
        .status(response.val.statusCode)
        .json({ error: response.val.message });
    }

    return res.status(201).json({ response });
  }

  // DESATUALIZADO
  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      await this.deleteUserService.execute();
      return res.status(204).send();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      return res.status(400).json({ error: errorMessage });
    }
  }
}
