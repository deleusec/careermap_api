import { Request, Response } from "express";
import RoadmapsService from "../services/roadmaps.service";

export default class RoadmapsController {
  static async getRoadmap(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const roadmap = await RoadmapsService.getRoadmap(parseInt(id));
      if (!roadmap) {
        return res.status(404).json({ message: "Entity not found" });
      }
      res.status(200).json(roadmap);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
