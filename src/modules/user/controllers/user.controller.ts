import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  public constructor(private userService: UserService) {}

  public async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.find();
      return res.status(200).json(user);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      return res.status(400).json({ error: errorMessage });
    }
  }
}
