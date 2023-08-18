module.exports = {
	secret: process.env.JWT_SECRETKEY,
	expiresIn: "1h",
	// refreshSecret: "refreshSecretKey", // 다음 기회에..
	// refreshExpiresIn: "7d",
};
