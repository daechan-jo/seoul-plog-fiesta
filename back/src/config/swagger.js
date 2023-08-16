import swaggerJSDoc from "swagger-jsdoc";

//todo ing
const swaggerDefinition = {
	info: {
		title: "Pizza API",
		version: "1.0.0",
		description: "Pizza API with express",
	},
	host: "localhost:3000", //todo 환경변수 추가
	basePath: "/",
};

const options = {
	swaggerDefinition: swaggerDefinition,
	apis: ["../src/routers/*.js"], //todo 경로테스트 필요
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
