// import Sequelize from "sequelize";
import User from "./User";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);
db.sequelize = sequelize;
db.users = User;

User.init(sequelize);

// User.associate(db);

sequelize
    // force = true: 기존 테이블 삭제 후 재생성, false: 기존 테이블 유지
    // alter = true: 기존 테이블과 비교하여 변경된 사항만 반영, false: 기존 테이블 유지
    .sync({ force: true })
    .then(() => {
        console.log("🚀::database connection success");
    })
    .catch((err) => {
        console.error(err);
    });

module.exports = db;
