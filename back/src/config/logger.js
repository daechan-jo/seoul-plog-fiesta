const winston = require("winston");
const path = require("path");
const fs = require("fs");
const winstonDailyRotate = require("winston-daily-rotate-file");

// 로그를 저장할 디렉토리 생성. 없으면 생성
const logDirectory = path.join(__dirname, "../logs");
if (!fs.existsSync(logDirectory)) {
	fs.mkdirSync(logDirectory);
}
// 로그 레벨 정의
const logLevels = {
	error: 0,
	warn: 1,
	info: 2,
	debug: 3,
};

// 구성 정의
const logger = winston.createLogger({
	levels: logLevels,
	format: winston.format.combine(
		winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
		winston.format.printf(({ level, message, timestamp }) => {
			return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
		}),
	),
	transports: [
		// winston-daily-rotate-file을 사용하여 각 로그 수준에 대한 파일 전송
		new winstonDailyRotate({
			level: "error",
			dirname: path.join(logDirectory, "error"),
			filename: "error-%DATE%.log",
			datePattern: "YYYY-MM-DD",
			zippedArchive: true, // 회전된 로그 파일에 대한 압축 활성화
			maxSize: "20m", // 로그 파일 크기가 20MB를 초과하면 회전
			maxFiles: "30d", // 30일 동안 로그 보관
			format: winston.format.combine(
				winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
				winston.format.printf(({ level, message, timestamp }) => {
					return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
				}),
			),
		}),
		new winstonDailyRotate({
			level: "warn",
			dirname: path.join(logDirectory, "warn"),
			filename: "warning-%DATE%.log",
			datePattern: "YYYY-MM-DD",
			zippedArchive: true,
			maxSize: "20m",
			maxFiles: "30d",
			format: winston.format.combine(
				winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
				winston.format.printf(({ level, message, timestamp }) => {
					return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
				}),
			),
		}),
		new winstonDailyRotate({
			level: "info",
			dirname: path.join(logDirectory, "info"),
			filename: "info-%DATE%.log",
			datePattern: "YYYY-MM-DD",
			zippedArchive: true,
			maxSize: "20m",
			maxFiles: "30d",
			format: winston.format.combine(
				winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
				winston.format.printf(({ level, message, timestamp }) => {
					return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
				}),
			),
		}),
		new winstonDailyRotate({
			level: "debug",
			dirname: path.join(logDirectory, "debug"),
			filename: "debug-%DATE%.log",
			datePattern: "YYYY-MM-DD",
			zippedArchive: true,
			maxSize: "20m",
			maxFiles: "30d",
			format: winston.format.combine(
				winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
				winston.format.printf(({ level, message, timestamp }) => {
					return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
				}),
			),
		}),
	],
	exceptionHandlers: [
		// 캐치되지 않은 (정의되지 않은 레벨) 예외를 기록하는 예외 처리기
		new winstonDailyRotate({
			dirname: path.join(logDirectory, "except"),
			filename: "except-%DATE%.log",
			datePattern: "YYYY-MM-DD",
			zippedArchive: true,
			maxSize: "20m",
			maxFiles: "30d",
			format: winston.format.combine(
				winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
				winston.format.printf(({ level, message, timestamp }) => {
					return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
				}),
			),
		}),
	],
	exitOnError: false, //캐치되지 않은 예외를 기록한 후 애플리케이션 실행을 계속
});

module.exports = logger;
