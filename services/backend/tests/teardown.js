afterAll(() => {
  global.prisma.$disconnect();
});