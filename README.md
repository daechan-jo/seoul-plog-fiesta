# **Seoul Plogging Fiesta**

**Seoul Plogging Fiesta**는 서울 시민들의 참여를 통해 환경을 보호하고 건강한 도시를 조성하는 프로젝트입니다. 이 프로젝트는 '플로깅'이라 불리는 쓰레기 수거와 조깅을 결합한 새로운 활동을 통해 환경 보호의 재미있는 방법을 소개하고, 참여한 시민들의 노력을 칭찬하며 장려합니다.

---
## **주요 기능 및 특징**

### **1. 플로깅 인증 웹**

사용자들은 실제 환경 보호 활동을 증명하는 플로깅 인증 웹 페이지를 통해 참여합니다. 사용자는 활동한 지역, 주운 쓰레기의 양, 활동 시간 등을 기록하고 공유할 수 있습니다. 이 인증된 활동 내용은 환경 보호 의식을 공유하는 중요한 자료로 활용됩니다.

### **2. 랭킹 및 친구, 모임 기능**

참여자들의 플로깅 활동은 점수로 계산되어 랭킹에 반영됩니다. 참가자들은 다른 참여자들과 경쟁하며 쓰레기를 더 많이 주워 점수를 획득할 수 있습니다. 랭킹 시스템은 활발한 참여를 장려하고 친목을 도모하며, 친구와 모임 활동을 통해 함께 환경 보호를 즐길 수 있는 기회를 제공합니다.

### **3. 시각화 및 데이터 분석**

플로깅 활동 데이터는 지역별로 수집되어 D3.js를 이용하여 시각화됩니다. 사용자들은 지도 상에서 환경 보호 활동의 집중 지역을 확인하고, 개인 기록을 비교할 수 있습니다. 시각화를 통해 환경 문제에 대한 현실적인 정보를 얻을 수 있으며, 참여 동기 부여에도 도움을 줍니다.

---
### **프로젝트 기간**

- 2023.08.14 ~ 2023.09.01 (3주)

---
## **기술 스택 및 도구**

### 프론트엔드

![React](https://img.shields.io/badge/-React-222222?style=for-the-badge&logo=react)
![SCSS](https://img.shields.io/badge/-SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=ffffff)
![Redux Toolkit](https://img.shields.io/badge/-Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=ffffff)
![recoil](https://img.shields.io/badge/-recoil-40A9FF?style=for-the-badge&logo=recoil&logoColor=ffffff)
![D3.js](https://img.shields.io/badge/-D3.js-F9A03C?style=for-the-badge&logo=d3.js&logoColor=ffffff)
![axios](https://img.shields.io/badge/-axios-007ACC?style=for-the-badge&logo=axios&logoColor=ffffff)

### 백엔드

![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Prisma](https://img.shields.io/badge/-Prisma-1B222D?style=for-the-badge&logo=prisma&logoColor=white)
![Passport](https://img.shields.io/badge/-Passport-34E27A?style=for-the-badge&logo=passport&logoColor=white)
![JWT](https://img.shields.io/badge/-JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Nodemailer](https://img.shields.io/badge/-Nodemailer-339933?style=for-the-badge&logo=nodemailer&logoColor=white)
![Multer](https://img.shields.io/badge/-Multer-FF6600?style=for-the-badge&logo=multer&logoColor=white)

### 데이터분석

![Pandas](https://img.shields.io/badge/-pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)
![Folium](https://img.shields.io/badge/-folium-77B829?style=for-the-badge&logo=folium&logoColor=white)



### 기획 및 배포

![Ubuntu](https://img.shields.io/badge/-ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
![nginx](https://img.shields.io/badge/-nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Figma](https://img.shields.io/badge/-Figma-A259FF?style=for-the-badge&logo=figma&logoColor=white)
![GitLab](https://img.shields.io/badge/-GitLab-FCA121?style=for-the-badge&logo=gitlab&logoColor=white)
![Vercel](https://img.shields.io/badge/-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![VM](https://img.shields.io/badge/-VM-00B0FF?style=for-the-badge&logo=virtualbox&logoColor=white)
![PM2](https://img.shields.io/badge/-PM2-2B037A?style=for-the-badge&logo=pm2&logoColor=white)


---
## **활용 데이터셋**

- 서울특별시_강남구_쓰레기통설치현황 : https://www.data.go.kr/data/15038054/fileData.do
- 2022년 쓰레기 무단투기 단속실적(자치구별) : https://opengov.seoul.go.kr/public/28298027
---
## **프로젝트 실행 방법**
### back 루트경로에 dotenv 생성 / 설정
	DATABASE_URL="SQL URL"
	SERVER_URL="SERVER URL"
	FRONT_URL="FRONT URL"
	SERVER_PORT="SERVER PROT NUMBER"
	JWT_SECRET_KEY="YOUR SECRET KEY"
	JWT_TOKEN_EXPIRES="EXPIRE TIME"
	GOOGLE_CLIENT_ID="GOOGLE CLIENT ID"
	GOOGLE_SECRET="GOOGLE SECRET"
	NODE_MAILER_USER="YOUR EMAIL ADDRESS"
	NODE_MAILER_PASS="YOUR EMAIL PASSWORD"

### front/src/api/instance.js
	baseURL 을 설정한 서버 주소로 변경 

### 서버 실행
back 루트경로로 이동
- `yarn install`
- `yarn start`

[nodemon] clean exit - waiting for changes before restart 에러 발생시 /back/src/logs/except 에서 로그 확인

### 클라이언트 실행
front 루트경로로 이동
- `yarn install`
- `yarn start`

---
## **ERD**

![SeoulPlogFiestaERD2](https://github.com/JoDaeChan/SeoulPlogFiesta/assets/103374153/cf769414-edf6-4452-8eeb-148bd5bdc7e3)

---
## **사용자 플로우**

![flow](https://github.com/JoDaeChan/SeoulPlogFiesta/assets/103374153/3d314ae3-1200-42e9-997e-376b0c027d83)

---

## **프로젝트 기능 / API 명세서**
- 기능명세서 : [Seoul Plog Fiesta.pdf](https://github.com/JoDaeChan/SeoulPlogFiesta/files/12505349/Seoul.Plog.Fiesta.pdf)
- API명세서 : https://ringed-latency-ddb.notion.site/dceae3a5b16142dab919fab232178cec?v=05e20e809fee496a864634c311779d9d&pvs=4
---
## **프로젝트 팀원 및 역할 분담**

|  이름  |             역할              |
| :----: | :---------------------------: |
| 정아현 | 팀장/ 프론트엔드 / 데이터분석 |
| 조대찬 |      백엔드/ 데이터분석       |
| 정현수 |      백엔드/ 데이터분석       |
| 최은진 |      백엔드/ 데이터분석       |

- **팀장**: 환경 보호 활동 기획 및 프로젝트 관리 담당
- **프론트엔드**: 사용자 인터페이스 디자인 및 구현 담당
- **백엔드**: 서버와 데이터베이스 구축 및 관리 담당

---

## **기여도**
### 정아현
- 프로젝트 기획 및 관리
- 피그마 작성
- 프론트엔드 전담 개발
- 사용자 인터페이스 디자인 및 구현 담당
- 프로젝트 문서화

### 조대찬
- 백엔드 구조 확립
- 데이터베이스 연결 및 관리
- 데이터베이스 구조 설계 및 ERD 작성
- 인증, 인가 미들웨어 구현
- 그룹 관련 API 구현
- 플로깅 인증 관련 API 구현
- 랭킹 관련 API 구현
- 이미지 업 / 로드 API 구현
- 게시판 API 구현
- 댓글 API 구현
- 사용자 플로우 작성
- 기능 명세서 작성
- API 명세서 작성
- 서버 자동 배포

### 정현수
- 회원 관련 API 구현

### 최은진
- 친구 관련 API 구현
- 샘플 데이터 작업 및 관리

---
## **버전**

- 0.0.1
