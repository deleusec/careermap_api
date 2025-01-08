import prisma from "../config/client";

export default class RelationsService {
  static async createRelation(data: any) {
    return prisma.entityRelation.create({
      data: {
        parentId: data.parentId,
        childId: data.childId,
        relationType: data.relationType,
      },
    });
  }
}
