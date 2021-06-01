import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.json({ msg: 'dale' }).send();
});

export { router }