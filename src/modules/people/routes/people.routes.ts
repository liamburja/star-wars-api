import { Router, Request, Response } from "express";
import { Container } from "typedi";
import { PeopleController } from "../controllers/people.controller";

const router = Router();

const controller = Container.get(PeopleController);

router.get('/', (req: Request, res: Response) => controller.findAll(req, res));

router.get('/:id', (req: Request, res: Response) => controller.findById(req, res));

router.post('/', (req: Request, res: Response) => controller.create(req, res));

router.patch('/:id', (req: Request, res: Response) => controller.update(req, res));

router.delete('/:id', (req: Request, res: Response) => controller.delete(req, res));

export default router;