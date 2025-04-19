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

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const data = {
        email,
        password,
      };

      const user = await this.userService.create(data);
      return res.status(201).json(user);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      return res.status(400).json({ error: errorMessage });
    }
  }
}
