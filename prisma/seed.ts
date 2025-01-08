import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with defined relation types...');

  // 1. Ajouter des catégories
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Informatique', description: 'Métiers et formations liés au développement, à la cybersécurité, et aux technologies.' },
      { name: 'Santé', description: 'Métiers et formations dans les domaines médicaux, paramédicaux, et de la biotechnologie.' },
      { name: 'Commerce et Management', description: 'Domaines liés à la gestion, au marketing, et aux ventes.' },
      { name: 'Arts et Culture', description: 'Secteur artistique et créatif.' },
    ],
  });

  console.log('Categories seeded:', categories);

  // 2. Ajouter des entités avec `additionalInfo`
  const entities = await prisma.entity.createMany({
    data: [
      // Entities pour Informatique
      {
        type: 'bac',
        name: 'Bac Informatique',
        description: 'Baccalauréat spécialisé en sciences informatiques.',
        categoryId: 1,
        additionalInfo: {
          specialities: ['Mathématiques', 'Informatique', 'Sciences Physiques'],
        },
      },
      {
        type: 'formation',
        name: 'Licence Informatique',
        description: 'Formation universitaire en informatique.',
        categoryId: 1,
        additionalInfo: {
          duration: '3 ans',
          prerequisites: ['Bac Informatique'],
        },
      },
      {
        type: 'formation',
        name: 'Bootcamp Développement Web',
        description: 'Formation accélérée pour devenir développeur web.',
        categoryId: 1,
        additionalInfo: {
          duration: '6 mois',
          recommended_background: ['Bac Informatique', 'Licence Informatique'],
        },
      },
      {
        type: 'career',
        name: 'Développeur Web',
        description: 'Profession de création et de gestion de sites web.',
        categoryId: 1,
        additionalInfo: {
          average_salary: '35 000€ - 45 000€',
          required_skills: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
        },
      },
      {
        type: 'career',
        name: 'Développeur Fullstack',
        description: 'Profession combinant frontend et backend.',
        categoryId: 1,
        additionalInfo: {
          average_salary: '45 000€ - 60 000€',
          required_skills: ['Frontend', 'Backend', 'Database Management'],
        },
      },

      // Entities pour Santé
      {
        type: 'bac',
        name: 'Bac Santé',
        description: 'Baccalauréat spécialisé en sciences médicales.',
        categoryId: 2,
        additionalInfo: {
          specialities: ['Biologie', 'Physique-Chimie', 'Mathématiques'],
        },
      },
      {
        type: 'formation',
        name: 'Licence Biologie',
        description: 'Formation universitaire en biologie.',
        categoryId: 2,
        additionalInfo: {
          duration: '3 ans',
          prerequisites: ['Bac Santé'],
        },
      },
      {
        type: 'formation',
        name: 'Licence Biomédicale',
        description: 'Formation spécialisée en sciences biomédicales.',
        categoryId: 2,
        additionalInfo: {
          duration: '3 ans',
          recommended_background: ['Bac Santé'],
        },
      },
      {
        type: 'career',
        name: 'Médecin Généraliste',
        description: 'Profession médicale généraliste.',
        categoryId: 2,
        additionalInfo: {
          average_salary: '80 000€ - 120 000€',
          required_skills: ['Diagnostic', 'Prise en charge des patients', 'Connaissances médicales générales'],
        },
      },
    ],
  });

  console.log('Entities with additional info seeded:', entities);

  // 3. Ajouter des relations entre les entités avec les types de relations définis
  const entityRelations = await prisma.entityRelation.createMany({
    data: [
      // Relations pour Informatique
      { parentId: 1, childId: 2, relationType: 'prerequisite' },     // Bac Informatique → Licence Informatique
      { parentId: 1, childId: 3, relationType: 'alternative' },      // Bac Informatique → Bootcamp Développement Web
      { parentId: 2, childId: 4, relationType: 'recommended' },      // Licence Informatique → Développeur Web
      { parentId: 3, childId: 4, relationType: 'alternative' },      // Bootcamp Développement Web → Développeur Web
      { parentId: 4, childId: 5, relationType: 'specialization' },   // Développeur Web → Développeur Fullstack

      // Relations pour Santé
      { parentId: 6, childId: 7, relationType: 'prerequisite' },     // Bac Santé → Licence Biologie
      { parentId: 6, childId: 8, relationType: 'optional' },         // Bac Santé → Licence Biomédicale
      { parentId: 7, childId: 9, relationType: 'recommended' },      // Licence Biologie → Médecin Généraliste
      { parentId: 8, childId: 9, relationType: 'alternative' },      // Licence Biomédicale → Médecin Généraliste
    ],
  });

  console.log('Entity relations seeded with defined relation types:', entityRelations);

  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
