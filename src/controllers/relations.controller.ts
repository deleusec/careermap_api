import { Request, Response } from "express";
import RelationsService from "../services/relations.service";
import { createRelation } from "../schemas/relations.schema";

export default class RelationsController {
  static async createRelation(req: Request, res: Response) {
    const data = createRelation.parse(req.body);

    try {
      const relation = await RelationsService.createRelation(data);
      res.status(201).json(relation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
