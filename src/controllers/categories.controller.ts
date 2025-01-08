import { Request, Response } from "express";
import CategoriesService from "../services/categories.service";
import { createCategory, updateCategory } from "../schemas/categories.schema";

export default class CategoriesController {

  static async getCategories(req: Request, res: Response) {
    try {
      const entities = await CategoriesService.getCategories();
      res.status(200).json(entities);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCategory(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      const entity = await CategoriesService.getCategory(id);
      res.status(200).json(entity);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createCategory(req: Request, res: Response) {
    const data = createCategory.parse(req.body);

    try {
      const entity = await CategoriesService.createCategory(data);
      res.status(201).json(entity);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateCategory(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const data = updateCategory.parse(req.body);

    try {
      const entity = await CategoriesService.updateCategory(id, data);
      res.status(200).json(entity);
    } catch (error: any) {
      res.status(500).json({
        error: error.message
      });
    }
  }

  static async deleteCategory(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      const entity = await CategoriesService.deleteCategory(id);
      res.status(200).json({
        message: "Category deleted",
        entity
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

}
