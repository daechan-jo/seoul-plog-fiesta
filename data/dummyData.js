const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sampleUsers = [
	{
		name: '최범우',
		nickname: '미운 먹감나무',
		email: 'sample1@example.com',
		password: 'hashed_password',
	},
	{
		name: '정도영',
		nickname: '뚱뚱한 동아리명',
		email: 'sample2@example.com',
		password: 'hashed_password',
	},
	{
		name: '성영환',
		nickname: '무서운 우아주의',
		email: 'sample3@example.com',
		password: 'hashed_password',
	},
	{
		name: '노대일',
		nickname: '부정적인 하반천리',
		email: 'sample4@example.com',
		password: 'hashed_password',
	},
	{
		name: '설철호',
		nickname: '더러운 기능학파',
		email: 'sample5@example.com',
		password: 'hashed_password',
	},
	{
		name: '유현희',
		nickname: '놀라운 소나티네',
		email: 'sample6@example.com',
		password: 'hashed_password',
	},
	{
		name: '설시원',
		nickname: '감동적인 사고뭉치',
		email: 'sample7@example.com',
		password: 'hashed_password',
	},
	{
		name: '추세진',
		nickname: '상냥한 라파예트',
		email: 'sample8@example.com',
		password: 'hashed_password',
	},
	{
		name: '허예진',
		nickname: '긴장한 파고파고',
		email: 'sample9@example.com',
		password: 'hashed_password',
	},
	{
		name: '한영지',
		nickname: '낙천적인 복개나물',
		email: 'sample10@example.com',
		password: 'hashed_password',
	},
	{
		name: '하우재',
		nickname: '독창적인 금아말감',
		email: 'sample11@example.com',
		password: 'hashed_password',
	},
	{
		name: '정남희',
		nickname: '당황한 샘플카드',
		email: 'sample12@example.com',
		password: 'hashed_password',
	},
	{
		name: '송세미',
		nickname: '외로운 나물볶음',
		email: 'sample13@example.com',
		password: 'hashed_password',
	},
	{
		name: '권해일',
		nickname: '여유로운 히든카드',
		email: 'sample14@example.com',
		password: 'hashed_password',
	},
	{
		name: '류채영',
		nickname: '지루한 차상위층',
		email: 'sample15@example.com',
		password: 'hashed_password',
	},
	{
		name: '이창근',
		nickname: '만족스러운 하의상달',
		email: 'sample16@example.com',
		password: 'hashed_password',
	},
	{
		name: '이혜빈',
		nickname: '어지러운 나무상감',
		email: 'sample17@example.com',
		password: 'hashed_password',
	},
	{
		name: '최은진',
		nickname: '상냥한 두동사니',
		email: 'sample18@example.com',
		password: 'hashed_password',
	},
	{
		name: '진채영',
		nickname: '예쁜 재차일거',
		email: 'sample19@example.com',
		password: 'hashed_password',
	},
	{
		name: '예시현',
		nickname: '절망적인 마디누에',
		email: 'sample20@example.com',
		password: 'hashed_password',
	},
	{
		name: '홍재영',
		nickname: '내적인 버즘나무',
		email: 'sample21@example.com',
		password: 'hashed_password',
	},
	{
		name: '풍현정',
		nickname: '무모한 메퀴타진',
		email: 'sample22@example.com',
		password: 'hashed_password',
	},
	{
		name: '정준태',
		nickname: '극단적인 계수나무',
		email: 'sample23@example.com',
		password: 'hashed_password',
	},
	{
		name: '안재남',
		nickname: '형편없는 자낭균류',
		email: 'sample24@example.com',
		password: 'hashed_password',
	},
	{
		name: '성상아',
		nickname: '다정한 표범나비',
		email: 'sample25@example.com',
		password: 'hashed_password',
	},
	{
		name: '조하진',
		nickname: '행복한 아이다스',
		email: 'sample26@example.com',
		password: 'hashed_password',
	},
	{
		name: '김석주',
		nickname: '놀라운 만다라공',
		email: 'sample27@example.com',
		password: 'hashed_password',
	},
	{
		name: '양인경',
		nickname: '어이없는 쇠젓가락',
		email: 'sample28@example.com',
		password: 'hashed_password',
	},
	{
		name: '최지연',
		nickname: '후련한 동사모아',
		email: 'sample29@example.com',
		password: 'hashed_password',
	},
	{
		name: '전호영',
		nickname: '상냥한 리어카상',
		email: 'sample30@example.com',
		password: 'hashed_password',
	},
	{
		name: '최정민',
		nickname: '따뜻한 패가망신',
		email: 'sample31@example.com',
		password: 'hashed_password',
	},
	{
		name: '강은재',
		nickname: '친숙한 머위나물',
		email: 'sample32@example.com',
		password: 'hashed_password',
	},
	{
		name: '조나리',
		nickname: '미운 타원체면',
		email: 'sample33@example.com',
		password: 'hashed_password',
	},
	{
		name: '안하늬',
		nickname: '상냥한 홀아빗대',
		email: 'sample34@example.com',
		password: 'hashed_password',
	},
	{
		name: '김단비',
		nickname: '진지한 잘코사니',
		email: 'sample35@example.com',
		password: 'hashed_password',
	},
	{
		name: '윤기쁨',
		nickname: '겸손한 꼭지마리',
		email: 'sample36@example.com',
		password: 'hashed_password',
	},
	{
		name: '한은샘',
		nickname: '찝찝한 베률라허',
		email: 'sample37@example.com',
		password: 'hashed_password',
	},
	{
		name: '장구슬',
		nickname: '미적지근한 두샛바람',
		email: 'sample38@example.com',
		password: 'hashed_password',
	},
	{
		name: '배두리',
		nickname: '예쁜 우다이진',
		email: 'sample39@example.com',
		password: 'hashed_password',
	},
	{
		name: '전가을',
		nickname: '좋은 카리브족',
		email: 'sample40@example.com',
		password: 'hashed_password',
	},
	{
		name: '정보름',
		nickname: '슬픈 본차이나',
		email: 'sample41@example.com',
		password: 'hashed_password',
	},
	{
		name: '노나라',
		nickname: '큰 다리속곳',
		email: 'sample42@example.com',
		password: 'hashed_password',
	},
	{
		name: '성고은',
		nickname: '고운 아수하계',
		email: 'sample43@example.com',
		password: 'hashed_password',
	},
	{
		name: '심바람',
		nickname: '행복한 사차인치',
		email: 'sample44@example.com',
		password: 'hashed_password',
	},
	{
		name: '정한별',
		nickname: '무거운 파련대공',
		email: 'sample45@example.com',
		password: 'hashed_password',
	},
	{
		name: '류한울',
		nickname: '마른 모노카인',
		email: 'sample46@example.com',
		password: 'hashed_password',
	},
	{
		name: '정아리',
		nickname: '걔끗한 가마타기',
		email: 'sample47@example.com',
		password: 'hashed_password',
	},
	{
		name: '권나비',
		nickname: '유명한 폐의파립',
		email: 'sample48@example.com',
		password: 'hashed_password',
	},
	{
		name: '표하나',
		nickname: '싫증나는 씨몸바꿈',
		email: 'sample49@example.com',
		password: 'hashed_password',
	},
	{
		name: '손석구',
		nickname: '모자란 꼬마전구',
		email: 'sample50@example.com',
		password: 'hashed_password',
	},
	{
		name: '손보람',
		nickname: '솔직한 똥바가지',
		email: 'sample51@example.com',
		password: 'hashed_password',
	},
	{
		name: '봉하나',
		nickname: '공허한 카소몰핀',
		email: 'sample52@example.com',
		password: 'hashed_password',
	},
	{
		name: '김은별',
		nickname: '외로운 파파디케',
		email: 'sample53@example.com',
		password: 'hashed_password',
	},
	{
		name: '황보샘',
		nickname: '우울한 파마머리',
		email: 'sample54@example.com',
		password: 'hashed_password',
	},
	{
		name: '정미르',
		nickname: '한가한 지하수은',
		email: 'sample55@example.com',
		password: 'hashed_password',
	},
	{
		name: '하나길',
		nickname: '어색한 카리에르',
		email: 'sample56@example.com',
		password: 'hashed_password',
	},
	{
		name: '문한길',
		nickname: '초조한 다이어뎀',
		email: 'sample57@example.com',
		password: 'hashed_password',
	},
	{
		name: '홍힘찬',
		nickname: '무서운 가당연유',
		email: 'sample58@example.com',
		password: 'hashed_password',
	},
	{
		name: '정한결',
		nickname: '겁먹은 판테스카',
		email: 'sample59@example.com',
		password: 'hashed_password',
	},
	{
		name: '권한길',
		nickname: '젋은 유아독존',
		email: 'sample60@example.com',
		password: 'hashed_password',
	},
	{
		name: '백힘찬',
		nickname: '취한 주엽나무',
		email: 'sample61@example.com',
		password: 'hashed_password',
	},
	{
		name: '장하림',
		nickname: '늙은 시원차림',
		email: 'sample62@example.com',
		password: 'hashed_password',
	},
	{
		name: '이우람',
		nickname: '우울한 소거백마',
		email: 'sample63@example.com',
		password: 'hashed_password',
	},
	{
		name: '안일성',
		nickname: '음침한 공급가액',
		email: 'sample64@example.com',
		password: 'hashed_password',
	},
	{
		name: '양요한',
		nickname: '달콤한 나무가래',
		email: 'sample65@example.com',
		password: 'hashed_password',
	},
	{
		name: '류재섭',
		nickname: '형편없는 장강대하',
		email: 'sample66@example.com',
		password: 'hashed_password',
	},
	{
		name: '장무열',
		nickname: '부지런한 가살쟁이',
		email: 'sample67@example.com',
		password: 'hashed_password',
	},
	{
		name: '백경모',
		nickname: '서운한 그루바꿈',
		email: 'sample68@example.com',
		password: 'hashed_password',
	},
	{
		name: '홍일성',
		nickname: '가난한 기예능자',
		email: 'sample69@example.com',
		password: 'hashed_password',
	},
	{
		name: '이경택',
		nickname: '안전한 다방향성',
		email: 'sample70@example.com',
		password: 'hashed_password',
	},
	{
		name: '노성한',
		nickname: '늙은 할바마마',
		email: 'sample71@example.com',
		password: 'hashed_password',
	},
	{
		name: '신경모',
		nickname: '매력있는 가락꼬치',
		email: 'sample72@example.com',
		password: 'hashed_password',
	},
	{
		name: '강경모',
		nickname: '행복한 가루수프',
		email: 'sample73@example.com',
		password: 'hashed_password',
	},
	{
		name: '추경구',
		nickname: '외로운 회사후소',
		email: 'sample74@example.com',
		password: 'hashed_password',
	},
	{
		name: '남일성',
		nickname: '큰 당사자권',
		email: 'sample75@example.com',
		password: 'hashed_password',
	},
	{
		name: '백동건',
		nickname: '간절한 성향나무',
		email: 'sample76@example.com',
		password: 'hashed_password',
	},
	{
		name: '이경택',
		nickname: '끔찍한 리아스식',
		email: 'sample77@example.com',
		password: 'hashed_password',
	},
	{
		name: '서요한',
		nickname: '낙천적인 자기주의',
		email: 'sample78@example.com',
		password: 'hashed_password',
	},
	{
		name: '남덕수',
		nickname: '쓸쓸한 되돌림파',
		email: 'sample79@example.com',
		password: 'hashed_password',
	},
	{
		name: '류남규',
		nickname: '큰 나비고기',
		email: 'sample80@example.com',
		password: 'hashed_password',
	},
	{
		name: '유오성',
		nickname: '끔찍한 무카페인',
		email: 'sample81@example.com',
		password: 'hashed_password',
	},
	{
		name: '윤무열',
		nickname: '환상적인 경기병파',
		email: 'sample82@example.com',
		password: 'hashed_password',
	},
	{
		name: '한성한',
		nickname: '흐뭇한 말바꿈표',
		email: 'sample83@example.com',
		password: 'hashed_password',
	},
	{
		name: '하덕수',
		nickname: '커다란 무이앙차',
		email: 'sample84@example.com',
		password: 'hashed_password',
	},
	{
		name: '박승현',
		nickname: '불쾌한 바지허리',
		email: 'sample85@example.com',
		password: 'hashed_password',
	},
	{
		name: '안승현',
		nickname: '의기소침한 크라우스',
		email: 'sample86@example.com',
		password: 'hashed_password',
	},
	{
		name: '류강민',
		nickname: '실망한 마스타바',
		email: 'sample87@example.com',
		password: 'hashed_password',
	},
	{
		name: '홍경완',
		nickname: '마른 미트파이',
		email: 'sample88@example.com',
		password: 'hashed_password',
	},
	{
		name: '황숙자',
		nickname: '비참한 하왕등도',
		email: 'sample89@example.com',
		password: 'hashed_password',
	},
	{
		name: '사유리',
		nickname: '좋은 바리스타',
		email: 'sample90@example.com',
		password: 'hashed_password',
	},
	{
		name: '정가영',
		nickname: '유쾌한 가마보코',
		email: 'sample91@example.com',
		password: 'hashed_password',
	},
	{
		name: '강혜린',
		nickname: '흥분한 나들이복',
		email: 'sample92@example.com',
		password: 'hashed_password',
	},
	{
		name: '송혜린',
		nickname: '찝찝한 무라바하',
		email: 'sample93@example.com',
		password: 'hashed_password',
	},
	{
		name: '배자경',
		nickname: '더러운 개암나무',
		email: 'sample94@example.com',
		password: 'hashed_password',
	},
	{
		name: '오경채',
		nickname: '희망찬 아이아르',
		email: 'sample95@example.com',
		password: 'hashed_password',
	},
	{
		name: '하가영',
		nickname: '어색한 생강나무',
		email: 'sample96@example.com',
		password: 'hashed_password',
	},
	{
		name: '유혜림',
		nickname: '흐뭇한 라포르그',
		email: 'sample97@example.com',
		password: 'hashed_password',
	},
	{
		name: '풍은채',
		nickname: '어두운 예찬론자',
		email: 'sample98@example.com',
		password: 'hashed_password',
	},
	{
		name: '류재신',
		nickname: '단단한 스가랴서',
		email: 'sample99@example.com',
		password: 'hashed_password',
	},
	{
		name: '정나영',
		nickname: '놀라운 파슈토어',
		email: 'sample100@example.com',
		password: 'hashed_password',
	},
	{
		name: '이영애',
		nickname: '엉뚱한 사다리망',
		email: 'sample101@example.com',
		password: 'hashed_password',
	},
];

const newPassword = '1234';
const dummyUsers = [];
for (let i = 0; i < sampleUsers.length; i++) {
	const dummyUser = { ...sampleUsers[i] };
	dummyUser.password = newPassword;
	dummyUsers.push(dummyUser);
}

async function hashAndInsertUsers() {
	for (const user of dummyUsers) {
		const hashedPassword = await bcrypt.hash(user.password, 10);

		try {
			await prisma.user.create({
				data: {
					name: user.name,
					nickname: user.nickname,
					email: user.email,
					password: hashedPassword,
				},
			});

			console.log(`User ${user.name} inserted.`);
		} catch (error) {
			console.error(`Error inserting user ${user.name}:`, error);
		}
	}

	prisma.$disconnect();
}

hashAndInsertUsers();
