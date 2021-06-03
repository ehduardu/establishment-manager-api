import { Router } from 'express';
import { EstablishmentController } from '../controllers/EstablishmentController';

const establishmentController = new EstablishmentController();

const establishment = Router();

establishment.get('/establishments', establishmentController.index);
establishment.get('/establishments/:id', establishmentController.show);
establishment.post('/establishments', establishmentController.store);
establishment.put('/establishments/:id', establishmentController.update);
establishment.delete('/establishments/:id', establishmentController.destroy);

export { establishment }