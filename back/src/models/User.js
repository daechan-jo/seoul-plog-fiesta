import Sequelize from "sequelize";

// const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                // 시퀄라이즈는 id 자동 생성 (auto_increament)
                email: {
                    type: Sequelize.STRING(40),
                    allowNull: true, // null 허용
                    unique: true, // 중복 비허용
                },

                password: {
                    type: Sequelize.STRING(255), // 해시암호화를 할때 문자가 길어지니, 여유있게 용량을 잡아준다.
                    allowNull: true, // 카카오 같은 api로 로그인할때, 직접 회원가입해서 비밀번호 설정한게 아니니 비번은 null일수도 있다.
                },
                provider: {
                    //? 어디로부터 로그인 했는지 정보
                    type: Sequelize.STRING(10),
                    allowNull: false,
                    defaultValue: "local", // 로컬 / 카카오 / 네이버 / 구글 로그인 을 구분하기 위한 필드
                },
                snsId: {
                    //? sns으로 로그인할경우 sns아이디 저장 필드
                    type: Sequelize.STRING(30),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true, // createdAt, udaptedAt 자동 생성
                underscored: false,
                modelName: "User", // 모델명
                tableName: "users", // 테이블명
                paranoid: true, // deletedAt 자동 생성
                charset: "utf8", // 한글 입력 설정
                collate: "utf8_general_ci",
            }
        );
    }
};

//     static associate(db) {
//         /*
//          * 따로 외래키를 지정하지않으면, 모델명+기본키 컬럼이 생성되서 자동으로 연결된다.
//          * 즉, User와 id가 합쳐져서 Userid라는 필드가 생겨서 자동연결해준다.
//          * db.User.hasMany(db.Post, { foreignKey: 'Userid', targetKey: 'id' })
//          */
//         db.User.hasMany(db.Post);
//
//         /*
//          * 팔로워 와 팔로잉 관계
//          * 잘 생각해보자. 팔로워,팔로잉 정보는 모두 User모델에서 가져오는 정보들이다. 따라서 자기자신을 참조하는 관계가 생겨난다.
//          * Follow라는 중간테이블을 만들어서 M:N관계를 형성한다.
//          */
//         db.User.belongsToMany(db.User, {
//             foreignKey: "followingId", // 팔로잉 당한 사람. 주체 (즉, 유명한 사람. 연예인, 유튜버)
//             as: "Followers", // 모델쿼리에서 사용될 필드 별명. sql문의 필드명 as 별명 과 같다.
//             through: "Follow",
//         });
//         db.User.belongsToMany(db.User, {
//             foreignKey: "followerId", // 그 사람을 팔로워 한 사람들
//             as: "Followings",
//             through: "Follow",
//         });
//     }
// };

// class User extends Sequelize.Model {
//     static initiate(sequelize) {
//         User.init(
//             {
//                 // 시퀄라이즈는 id를 자동으로 생성해준다함
//                 name: {
//                     type: Sequelize.STRING(255),
//                     allowNull: false, // null 비허용
//                     unique: false, // 중복 허용
//                 },
//                 email: {
//                     type: Sequelize.STRING(255),
//                     allowNull: false,
//                     unique: true,
//                 },
//                 password: {
//                     type: Sequelize.STRING(255),
//                     allowNull: true, // OAuth 로그인을 위해 null 허용
//                 },
//                 provider: {
//                     type: Sequelize.STRING(30), // 로그인 방식 정보
//                     allowNull: false,
//                     defaultValue: "local", // 로컬, 카카오, 네이버 등 로그인 구분을 위한 필드
//                 },
//                 snsId: {
//                     type: Sequelize.STRING(30),
//                     allowNull: true,
//                 },
//             },
//             {
//                 sequelize,
//                 timestamps: true,
//                 underscored: false,
//                 modelName: "User",
//                 tableName: "users",
//                 paranoid: true,
//                 charset: "utf8",
//                 collate: "utf8_general_ci",
//             }
//         );
//     }
//     static associate(db) {
//         /* 외래키 지정하는곳
//          * 따로 외래키를 지정하지 않으면, 모델명+기본키 컬럼이 생성되서 자동 연결
//          * 즉 User와 id가 합쳐져서 Userid라는 필드가 생겨서 자동 연결됨*/
//     }
// }

// module.exports = User;
