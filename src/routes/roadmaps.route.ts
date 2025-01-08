import { Router } from "express";
import RoadmapsController from "../controllers/roadmaps.controller";

const router = Router();

router.get("/:id", RoadmapsController.getRoadmap);

export default router;
