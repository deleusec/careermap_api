import prisma from "../config/client";

export default class CategoriesService {
  static async getCategories() {
    return await prisma.category.findMany();
  }

  static async getCategory(id: number) {
    return await prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  static async createCategory(data: any) {
    return await prisma.category.create({
      data,
    });
  }

  static async updateCategory(id: number, data: any) {
    return await prisma.category.update({
      where: {
        id,
      },
      data,
    });
  }

  static async deleteCategory(id: number) {
    return await prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
