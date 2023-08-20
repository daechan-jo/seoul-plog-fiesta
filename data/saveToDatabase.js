//db에 넣어둠

// const { PrismaClient } = require("@prisma/client");
// const fs = require("fs");
// const csvParser = require("csv-parser");
//
// const prisma = new PrismaClient();
//
// const csvFilePath = "new_seoul_plogging.csv";
//
// async function saveDataToDatabase() {
// 	return new Promise((resolve, reject) => {
// 		const rows = [];
//
// 		fs.createReadStream(csvFilePath)
// 			.pipe(csvParser())
// 			.on("data", (record) => {
// 				rows.push(record);
// 			})
// 			.on("end", async () => {
// 				for (const record of rows) {
// 					await prisma.course.create({
// 						data: {
// 							WLK_COURS_FLAG_NM: record.WLK_COURS_FLAG_NM,
// 							WLK_COURS_NM: record.WLK_COURS_NM,
// 							COURS_DC: record.COURS_DC,
// 							SIGNGU_NM: record.SIGNGU_NM,
// 							COURS_LEVEL_NM: record.COURS_LEVEL_NM,
// 							COURS_LT_CN: parseFloat(record.COURS_LT_CN),
// 							COURS_DETAIL_LT_CN: record.COURS_DETAIL_LT_CN,
// 							ADIT_DC: record.ADIT_DC,
// 							COURS_TIME_CN: record.COURS_TIME_CN,
// 							OPTN_DC: record.OPTN_DC,
// 							TOILET_DC: record.TOILET_DC,
// 							CVNTL_NM: record.CVNTL_NM,
// 							LNM_ADDR: record.LNM_ADDR,
// 							COURS_SPOT_LA: parseFloat(record.COURS_SPOT_LA),
// 							COURS_SPOT_LO: parseFloat(record.COURS_SPOT_LO),
// 						},
// 					});
// 				}
// 				resolve();
// 			})
// 			.on("error", (error) => {
// 				reject(error);
// 			});
// 	});
// }
//
// async function main() {
// 	try {
// 		await saveDataToDatabase();
// 		console.log("Data saved to database");
// 	} catch (error) {
// 		console.error("Error:", error);
// 	} finally {
// 		await prisma.$disconnect();
// 	}
// }
//
// main();
