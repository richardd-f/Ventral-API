import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    "Music",
    "Technology",
    "Education",
    "Sports",
    "Business",
    "Art & Culture",
    "Community",
    "Health",
    "Workshop",
    "Entertainment",
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { category },
      update: {},
      create: { category },
    });
  }

  console.log("✅ Categories seeded successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
