/** @description 프리즈마 예제 */
const userService = require("../services/userService");

async function getAllUsers(req, res) {
	try {
		const allUsers = await userService.getAllUsers();
		console.log(allUsers);
		res.json(allUsers);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred" });
	}
}

module.exports = {
	getAllUsers,
};
