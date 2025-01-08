import { Request, Response } from "express";
import RoadmapsService from "../services/roadmaps.service";

export default class RoadmapsController {

  static async getCategories(req: Request, res: Response) {
    try {
      const entities = await RoadmapsService.getCategories();
      res.status(200).json(entities);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getTypesByCategory(req: Request, res: Response) {
    // Your code here
  }

  static async getRoadmap(req: Request, res: Response) {
    // Your code here
  }

}
