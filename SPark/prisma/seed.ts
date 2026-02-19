import { PrismaClient, MemberRole, ContentType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create default admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.member.upsert({
    where: { email: 'admin@spark.com' },
    update: {},
    create: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@spark.com',
      password: adminPassword,
      role: MemberRole.EDITOR,
      biography: 'SPark Committee Administrator',
      specialties: 'Content Management, Administration',
      isActive: true,
      isAdmin: true,
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Create sample members
  const members = await Promise.all([
    prisma.member.upsert({
      where: { email: 'photographer@spark.com' },
      update: {},
      create: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'photographer@spark.com',
        role: MemberRole.PHOTOGRAPHER,
        biography: 'Passionate about capturing moments that tell stories. Specializing in event photography and candid shots.',
        specialties: 'Event Photography, Portrait Photography, Candid Photography',
        portfolioLinks: 'https://example.com/johndoe',
        isActive: true,
      },
    }),
    prisma.member.upsert({
      where: { email: 'reporter@spark.com' },
      update: {},
      create: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'reporter@spark.com',
        role: MemberRole.REPORTER,
        biography: 'Dedicated journalist covering college events with accuracy and detail.',
        specialties: 'Event Reporting, Investigative Journalism, Feature Writing',
        portfolioLinks: 'https://example.com/janesmith',
        isActive: true,
      },
    }),
    prisma.member.upsert({
      where: { email: 'writer@spark.com' },
      update: {},
      create: {
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'writer@spark.com',
        role: MemberRole.WRITER,
        biography: 'Creative writer crafting compelling narratives from campus events.',
        specialties: 'Creative Writing, Feature Articles, Column Writing',
        portfolioLinks: 'https://example.com/mikejohnson',
        isActive: true,
      },
    }),
  ]);
  console.log(`✅ Created ${members.length} sample members`);

  // Create event categories
  const categories = await Promise.all([
    prisma.eventCategory.upsert({
      where: { categorySlug: 'tech' },
      update: {},
      create: {
        categoryName: 'Technology',
        categorySlug: 'tech',
        description: 'Tech events, hackathons, and workshops',
      },
    }),
    prisma.eventCategory.upsert({
      where: { categorySlug: 'cultural' },
      update: {},
      create: {
        categoryName: 'Cultural',
        categorySlug: 'cultural',
        description: 'Cultural festivals and performances',
      },
    }),
    prisma.eventCategory.upsert({
      where: { categorySlug: 'sports' },
      update: {},
      create: {
        categoryName: 'Sports',
        categorySlug: 'sports',
        description: 'Sports events and tournaments',
      },
    }),
    prisma.eventCategory.upsert({
      where: { categorySlug: 'seminar' },
      update: {},
      create: {
        categoryName: 'Seminar',
        categorySlug: 'seminar',
        description: 'Educational seminars and talks',
      },
    }),
    prisma.eventCategory.upsert({
      where: { categorySlug: 'workshop' },
      update: {},
      create: {
        categoryName: 'Workshop',
        categorySlug: 'workshop',
        description: 'Hands-on workshops and training sessions',
      },
    }),
  ]);
  console.log(`✅ Created ${categories.length} event categories`);

  // Create sample events
  const event1 = await prisma.event.create({
    data: {
      eventName: 'Annual Tech Fest 2024',
      slug: 'annual-tech-fest-2024',
      eventDate: new Date('2024-03-15'),
      startDate: new Date('2024-03-15'),
      endDate: new Date('2024-03-17'),
      venue: 'Main Auditorium',
      description: 'The biggest tech event of the year featuring hackathons, workshops, and tech talks.',
      isPublished: true,
      createdById: admin.id,
    },
  });

  await prisma.eventCategoryMap.create({
    data: {
      eventId: event1.id,
      categoryId: categories[0].id, // Tech category
    },
  });

  const event2 = await prisma.event.create({
    data: {
      eventName: 'Cultural Night 2024',
      slug: 'cultural-night-2024',
      eventDate: new Date('2024-02-20'),
      venue: 'College Grounds',
      description: 'An evening celebrating diverse cultures with performances, music, and dance.',
      isPublished: true,
      createdById: admin.id,
    },
  });

  await prisma.eventCategoryMap.create({
    data: {
      eventId: event2.id,
      categoryId: categories[1].id, // Cultural category
    },
  });
  
  console.log('✅ Created sample events');

  // Create sample content items
  await prisma.contentItem.createMany({
    data: [
      {
        eventId: event1.id,
        memberId: members[0].id,
        contentType: ContentType.PHOTO,
        title: 'Tech Fest Opening Ceremony',
        contentPath: '/placeholder/tech-fest-opening.jpg',
        coverageStage: 'Inauguration',
      },
      {
        eventId: event1.id,
        memberId: members[1].id,
        contentType: ContentType.REPORT,
        title: 'Tech Fest 2024 Coverage Report',
        contentPath: '/reports/tech-fest-2024-report.pdf',
        coverageStage: 'Full Coverage',
      },
      {
        eventId: event2.id,
        memberId: members[0].id,
        contentType: ContentType.PHOTO,
        title: 'Cultural Night Performances',
        contentPath: '/placeholder/cultural-night.jpg',
        coverageStage: 'Performance',
      },
    ],
  });
  
  console.log('✅ Created sample content items');
  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
