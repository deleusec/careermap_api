import prisma from "../config/client";

export default class RoadmapsService {
  static async getCategories() {
    return await prisma.category.findMany();
  }
}
