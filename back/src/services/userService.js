const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); // rt Prisma client instance

/** @description 프리즈마 예제 */
async function getAllUsers() {
	const allUsers = await prisma.user.findMany();
	return allUsers;
}

module.exports = {
	getAllUsers,
};
