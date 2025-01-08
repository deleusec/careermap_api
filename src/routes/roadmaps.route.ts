import { Router } from "express";
import RoadmapsController from "../controllers/roadmaps.controller";

const router = Router()

router.get('/', RoadmapsController.getCategories);

export default router;
