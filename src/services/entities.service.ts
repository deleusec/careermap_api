import prisma from "../config/client";

export default class EntitiesService {
  static async getEntities() {
    return prisma.entity.findMany({
      include: {
        category: true,
      },
    });
  }

  static async getEntity(categoryId: number) {
    return prisma.entity.findMany({
      where: { categoryId },
      include: {
        category: true,
      },
    });

  }

  static async createEntity(data: any) {
    return prisma.entity.create({
      data: {
        name: data.name,
        type: data.type,
        description: data.description,
        categoryId: data.categoryId,
        additionalInfo: data.additionalInfo,
      },
    });
  }

  static async updateEntity(id: number, data: any) {
    return prisma.entity.updateMany({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
        additionalInfo: data.additionalInfo,
      },
    });
  }

  static async deleteEntity(id: number) {
    return prisma.entity.deleteMany({
      where: { id },
    });
  }
}
