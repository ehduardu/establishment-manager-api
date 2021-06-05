import { Request, Response } from 'express';
import { datastore } from '../models/datastore';

export class RegisterController {
  async store(request: Request, response: Response) {
    const { googleId, email, name } = request.body;

    const key = datastore.key(['User', googleId]);

    const [userExist] = await datastore.get(key);

    if (!userExist) {
      const userEntity = {
        key: key,
        data: {
          googleId,
          email,
          name
        }
      };

      try {
        await datastore.save(userEntity);
        return response.status(201).json({
          message: 'Usuário cadastrado com sucesso',
          user: userEntity.data
        });
      } catch (error) {
        return response.status(500).json({
          message: 'Erro ao cadastrar usuário',
        });
      }
    } else {
      return response.status(409).json({
        message: 'Usuário já cadastrado',
      });
    }


  }
}