import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { datastore } from '../models/datastore';

export class EstablishmentController {
  async index(request: Request, response: Response) {
    const query = datastore.createQuery('Establishment');

    const [allEstablishment] = await datastore.runQuery(query);

    console.log(allEstablishment);

    if (allEstablishment && allEstablishment.length > 0) {
      return response.status(200).json(allEstablishment);
    } else {
      return response.status(404).json({
        message: 'Nenhum estabelecimento encontrado'
      });
    }

  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const key = datastore.key(['Establishment', id]);

    const [establishment] = await datastore.get(key);

    if (establishment) {
      return response.status(200).json(establishment);
    } else {
      return response.status(404).json({
        message: 'Estabelecimento não encontrado'
      });
    }

  }

  async store(request: Request, response: Response) {
    const {
      name,
      address,
      description,
      phone,
      site,
      geolocation,
      userId
    } = request.body;

    const establishmentKey = datastore.key(['Establishment', v4()]);
    const userKey = datastore.key(['User', userId]);

    const entity = {
      key: establishmentKey,
      data: {
        name,
        address,
        description,
        phone,
        site,
        geolocation,
        created_at: new Date(),
        update_at: new Date(),
        modified_by: userKey
      }
    };

    try {
      await datastore.save(entity);

      return response.status(201).json({
        message: 'Estabelecimento criado com sucesso',
        establishment: entity
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Falha ao criar estabelecimento',
        error,
      })
    }

  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
      name,
      address,
      description,
      phone,
      site,
      geolocation,
      userId
    } = request.body;

    const establishmentKey = datastore.key(['Establishment', id]);
    const [establishment] = await datastore.get(establishmentKey);

    if (establishment) {
      const userKey = datastore.key(['User', userId]);

      const entity = {
        key: establishmentKey,
        data: {
          name,
          address,
          description,
          phone,
          site,
          geolocation,
          created_at: establishment.created_at,
          update_at: new Date(),
          modified_by: userKey
        }
      };

      try {
        await datastore.save(entity);

        return response.status(201).json({
          message: 'Estabelecimento atualizado com sucesso',
          establishment: entity
        });
      } catch (error) {
        return response.status(500).json({
          message: 'Falha ao atualizar estabelecimento',
          error,
        })
      }
    } else {
      return response.status(404).json({
        message: 'Estabelecimento não encontrado'
      });
    }
  }

  async destroy(request: Request, response: Response) {
    const { id } = request.params;

    const key = datastore.key(['Establishment', id]);

    const [establishment] = await datastore.get(key);

    if (establishment) {
      try {
        await datastore.delete(key);

        return response.status(201).json({
          message: 'Estabelecimento deletado com sucesso',
        });
      } catch (error) {
        return response.status(500).json({
          message: 'Falha ao deletar estabelecimento',
          error,
        })
      }
    } else {
      return response.status(404).json({
        message: 'Estabelecimento não encontrado'
      })
    }
  }

  async search(request: Request, response: Response) {
    const { name } = request.body;

    const query = datastore.createQuery('Establishment').filter('name', name);

    const establishment = await datastore.runQuery(query);

    if (establishment && establishment.length > 0) {
      return response.status(200).json(establishment);
    } else {
      return response.status(404).json({
        message: 'Estabelecimento não encontrado'
      });
    }

  }
}