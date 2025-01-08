import { Router } from "express";
import RelationsController from "../controllers/relations.controller";

const router = Router()

router.post('/', RelationsController.createRelation)

export default router;
