const jwt = require("jsonwebtoken");

function generateToken(payload, secretKey, expiresIn) {
	return jwt.sign(payload, secretKey, {
		expiresIn : '1h',
		issuer: "Pineapple Pizza",
	});
}

module.exports = {
	generateToken,
};