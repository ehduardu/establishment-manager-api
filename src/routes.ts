import { Router } from 'express';

import { SessionController } from './controllers/SessionController';
import { RegisterController } from './controllers/RegisterController';

const session = new SessionController();
const register = new RegisterController();

const router = Router();

router.get('/', (req, res) => {
  return res.json({ msg: 'dale' }).send();
});

router.get('/login/:googleId/:email', session.index);
router.post('/register', register.store);

export { router }