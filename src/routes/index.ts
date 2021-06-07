import { Router } from 'express';

import { SessionController } from '../controllers/SessionController';
import { RegisterController } from '../controllers/RegisterController';
import { establishment } from './EstablishmentRoutes';

const session = new SessionController();
const register = new RegisterController();

const router = Router();

router.get('/', (req, res) => {
  return res.json({ msg: 'Hello World' }).send();
});

router.get('/login/:googleId/:email', session.index);
router.post('/register', register.store);

router.use(establishment);


export { router }