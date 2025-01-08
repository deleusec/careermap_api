import { Router } from "express";
import EntitiesController from "../controllers/entities.controller";

const router = Router()

router.get('/', EntitiesController.getEntities)
router.get('/:type/:id', EntitiesController.getEntity)
router.post('/', EntitiesController.createEntity)
router.put('/:type/:id', EntitiesController.updateEntity)
router.delete('/:type/:id', EntitiesController.deleteEntity)

export default router;
