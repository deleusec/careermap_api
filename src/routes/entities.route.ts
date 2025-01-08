import { Router } from "express";
import EntitiesController from "../controllers/entities.controller";

const router = Router()

router.get('/', EntitiesController.getEntities)
router.get('/:id', EntitiesController.getEntity)
router.post('/', EntitiesController.createEntity)
router.put('/:id', EntitiesController.updateEntity)
router.delete('/:id', EntitiesController.deleteEntity)

export default router;
