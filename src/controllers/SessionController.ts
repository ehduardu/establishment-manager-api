import { Request, Response } from 'express';
import { datastore } from '../models/datastore';

export class SessionController {
  async index(request: Request, response: Response) {
    const { googleId, email } = request.params;

    console.log(email, googleId);

    const key = datastore.key(['User', googleId]);

    const [user] = await datastore.get(key);

    if (!user) {
      return response.status(404).json({
        message: 'Usuário não encontrado'
      });
    }

    return response.status(200).json({
      message: 'Login realizado com sucesso',
      user
    });
  }
}