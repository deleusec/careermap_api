import { Request, Response } from "express";
import EntitiesService from "../services/entities.service";

export default class EntitiesController {
  static async getEntities(req: Request, res: Response) {
    try {
      const entities = await EntitiesService.getEntities();
      res.status(200).json(entities);
    } catch (error : any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getEntity(req: Request, res: Response) {
    const { type, id } = req.params;
    try {
      const entity = await EntitiesService.getEntity(type, parseInt(id));
      if (!entity) return res.status(404).json({ message: "Entity not found" });
      res.status(200).json(entity);
    } catch (error : any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createEntity(req: Request, res: Response) {
    const data = req.body;
    try {
      const newEntity = await EntitiesService.createEntity(data);
      res.status(201).json(newEntity);
    } catch (error : any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateEntity(req: Request, res: Response) {
    const { type, id } = req.params;
    const data = req.body;
    try {
      const updatedEntity = await EntitiesService.updateEntity(type, parseInt(id), data);
      if (!updatedEntity) return res.status(404).json({ message: "Entity not found" });
      res.status(200).json(updatedEntity);
    } catch (error : any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteEntity(req: Request, res: Response) {
    const { type, id } = req.params;
    try {
      const deleted = await EntitiesService.deleteEntity(type, parseInt(id));
      if (!deleted) return res.status(404).json({ message: "Entity not found" });
      res.status(200).json({ message: "Entity deleted successfully" });
    } catch (error : any) {
      res.status(500).json({ error: error.message });
    }
  }
}
