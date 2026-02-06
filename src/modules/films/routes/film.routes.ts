import { Router, Request, Response } from 'express';
import { Container } from 'typedi';
import { FilmController } from '../controllers/film.controller';

const router = Router();

const controller = Container.get(FilmController);
router.get('/', (req: Request, res: Response) => {
	const page = Number(req.query.page);
	const limit = Number(req.query.limit);
	return controller.findAll(page, limit, res);
});

router.get('/:id', (req: Request, res: Response) => controller.findById(req.params.id as string, res));

router.post('/', (req: Request, res: Response) => controller.create(req.body, res));

router.patch('/:id', (req: Request, res: Response) => controller.update(req.params.id as string, req.body, res));

router.delete('/:id', (req: Request, res: Response) => controller.delete(req.params.id as string, res));

export default router;