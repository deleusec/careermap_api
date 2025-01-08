import prisma from "../config/client";

export default class EntitiesService {
  static async getEntities() {
    return prisma.entity.findMany({
      include: {
        category: true,
      },
    });
  }

  static async getEntity(type: string, id: number) {
    return prisma.entity.findFirst({
      where: { id, type },
      include: {
        category: true,
        parents: { include: { parent: true } },
        children: { include: { child: true } },
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

  static async updateEntity(type: string, id: number, data: any) {
    return prisma.entity.updateMany({
      where: { id, type },
      data: {
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
        additionalInfo: data.additionalInfo,
      },
    });
  }

  static async deleteEntity(type: string, id: number) {
    return prisma.entity.deleteMany({
      where: { id, type },
    });
  }
}
