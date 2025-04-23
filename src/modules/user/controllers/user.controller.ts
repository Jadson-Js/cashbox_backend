import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  public constructor(private userService: UserService) {}

  public async find(req: Request, res: Response): Promise<Response> {
    try {
      const response = await this.userService.find();
      return res.status(200).json(response);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      return res.status(400).json({ error: errorMessage });
    }
  }

  public async signup(req: Request, res: Response): Promise<Response> {
    try {
      const data = {
        email: req.body.email,
        password: req.body.password,
      };

      const response = await this.userService.signup(data);

      return res.status(201).json({ response });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      return res.status(400).json({ error: errorMessage });
    }
  }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const data = {
        email: req.body.email,
        password: req.body.password,
      };

      const response = await this.userService.login(data);

      return res.status(201).json({ response });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      return res.status(400).json({ error: errorMessage });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      await this.userService.delete();
      return res.status(204).send();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      return res.status(400).json({ error: errorMessage });
    }
  }
}
