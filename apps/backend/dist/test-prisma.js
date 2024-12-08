"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    // Create a new user
    const user = await prisma.user.create({
        data: {
            email: "test@example.com",
            name: "Test User",
        },
    });
    console.log("Created user:", user);
    // Retrieve all users
    const users = await prisma.user.findMany();
    console.log("All users:", users);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
