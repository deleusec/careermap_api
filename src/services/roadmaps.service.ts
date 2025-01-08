import prisma from "../config/client";

export default class RoadmapsService {
  static async getRoadmap(id: number) {
    // Fonction récursive pour construire la hiérarchie complète
    const buildHierarchy: any = async (
      entityId: number,
      visited: Set<number> = new Set() // Ensemble des IDs déjà visités
    ) => {
      // Si l'entité a déjà été visitée, on stoppe la récursion
      if (visited.has(entityId)) {
        return null;
      }

      // Marquer l'entité comme visitée
      visited.add(entityId);

      // Récupérer l'entité courante
      const entity = await prisma.entity.findUnique({
        where: { id: entityId },
        include: {
          category: true,
        },
      });

      if (!entity) return null;

      // Récupérer les parents
      const parentRelations = await prisma.entityRelation.findMany({
        where: { childId: entityId },
        include: {
          parent: {
            include: {
              category: true,
            },
          },
        },
      });

      // Récupérer les enfants
      const childRelations = await prisma.entityRelation.findMany({
        where: { parentId: entityId },
        include: {
          child: {
            include: {
              category: true,
            },
          },
        },
      });

      // Construire les relations parents de manière récursive
      const parents = await Promise.all(
        parentRelations.map(async (relation) => {
          return await buildHierarchy(relation.parent.id, visited);
        })
      );

      // Construire les relations enfants de manière récursive
      const children = await Promise.all(
        childRelations.map(async (relation) => {
          return await buildHierarchy(relation.child.id, visited);
        })
      );

      // Retourner la structure hiérarchique
      return {
        id: entity.id,
        type: entity.type,
        name: entity.name,
        description: entity.description,
        additionalInfo: entity.additionalInfo || {},
        category: entity.category
          ? { id: entity.category.id, name: entity.category.name }
          : null,
        parents: parents.filter(Boolean), // Supprimer les null éventuels
        children: children.filter(Boolean), // Supprimer les null éventuels
      };
    };

    // Construire la roadmap complète pour l'élément cible
    const roadmap = await buildHierarchy(id);

    return roadmap;
  }
}
