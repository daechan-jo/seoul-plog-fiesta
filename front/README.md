# my-boilarplate

## 디렉토리 구조

```
┠─ node_modules
┠─ public
src
 ┣ api
 ┃ ┗ index.js
 ┣ assets
 ┃ ┗ seoul_municipalities_geo_simple.json
 ┣ common
 ┃ ┣ components
 ┃ ┃ ┣ common
 ┃ ┃ ┃ ┣ ErrorModal.js
 ┃ ┃ ┃ ┣ index.module.scss
 ┃ ┃ ┃ ┣ Map.js
 ┃ ┃ ┃ ┣ PageNav.js
 ┃ ┃ ┃ ┣ Plogging.js
 ┃ ┃ ┃ ┗ PloggingForm.js
 ┃ ┃ ┣ home
 ┃ ┃ ┃ ┣ Map.js
 ┃ ┃ ┃ ┣ MyGroup.js
 ┃ ┃ ┃ ┗ MyUser.js
 ┃ ┃ ┣ intro
 ┃ ┃ ┃ ┣ Intro.js
 ┃ ┃ ┃ ┗ intro.module.scss
 ┃ ┃ ┣ layout
 ┃ ┃ ┃ ┣ Header.js
 ┃ ┃ ┃ ┣ layout.module.scss
 ┃ ┃ ┃ ┗ Nav.js
 ┃ ┃ ┣ my
 ┃ ┃ ┃ ┣ index.module.scss
 ┃ ┃ ┃ ┣ MyGroups.js
 ┃ ┃ ┃ ┣ MyInfo.js
 ┃ ┃ ┃ ┗ MyUsers.js
 ┃ ┃ ┣ myNetwork
 ┃ ┃ ┃ ┣ ItemList.js
 ┃ ┃ ┃ ┣ Pagenation.js
 ┃ ┃ ┃ ┗ search.js
 ┃ ┃ ┣ network
 ┃ ┃ ┃ ┗ ItemList.js
 ┃ ┃ ┣ ranking
 ┃ ┃ ┃ ┣ Map.js
 ┃ ┃ ┃ ┣ TopGroup.js
 ┃ ┃ ┃ ┗ TopUser.js
 ┃ ┃ ┗ user
 ┃ ┃ ┃ ┣ Login.js
 ┃ ┃ ┃ ┣ PasswordChange.js
 ┃ ┃ ┃ ┣ Register.js
 ┃ ┃ ┃ ┗ user.module.scss
 ┃ ┗ containers
 ┃ ┃ ┣ home
 ┃ ┃ ┃ ┗ index.js
 ┃ ┃ ┣ intro
 ┃ ┃ ┃ ┗ index.js
 ┃ ┃ ┣ my
 ┃ ┃ ┃ ┣ index.js
 ┃ ┃ ┃ ┗ index.module.scss
 ┃ ┃ ┣ myNetwork
 ┃ ┃ ┃ ┗ index.js
 ┃ ┃ ┣ network
 ┃ ┃ ┃ ┗ index.js
 ┃ ┃ ┣ password
 ┃ ┃ ┃ ┗ index.js
 ┃ ┃ ┣ ranking
 ┃ ┃ ┃ ┗ index.js
 ┃ ┃ ┗ user
 ┃ ┃ ┃ ┗ index.js
 ┣ features
 ┃ ┗ user
 ┃ ┃ ┗ userSlice.js
 ┣ pages
 ┃ ┣ HomePage.js
 ┃ ┣ IntroPage.js
 ┃ ┣ Layout.js
 ┃ ┣ MyNetworkPage.js
 ┃ ┣ MyPage.js
 ┃ ┣ NetworkPage.js
 ┃ ┣ PasswordPage.js
 ┃ ┣ RankingPage.js
 ┃ ┗ UserPage.js
 ┣ styles
 ┃ ┣ global.scss
 ┃ ┣ mystyle.css
 ┃ ┣ reset.css
 ┃ ┗ variables.scss
 ┣ utils
 ┃ ┗ index.js
 ┣ App.js
 ┣ index.js
 ┗ store.js
```
- api 폴더
- assets폴더
- common폴더:componets와 containers를 state랑 분리하려고 common으로 묶
    - components 폴더 -스타일링 중심,view를 그리는 컴포넌트가 포함되어있습니다.
        - common -ErrorModal/Map/PageNav/Plogging/PloggingForm
        - home -Map/MyGroup/MyUser
        - intro-Intro
        - layout-Header/Nav , layout.module.scss
        - my -MyGroups/MyInfo/MyUsers
        - myNetwork -ItemList/Pagenation/search
        - network -ItemList
        - ranking -Map/TopGroup/TopUser
        - user -Login/PasswordChange/Register,user.module.scss
    - containers 폴더 -요청 중심 로직, 각 index.js에 view를 나타내는 컴포넌트가 포함되어있습니다.
        - home: 메인 페이지
        - intro: 인트로페이지(로그인정보 없을 경우 표시)
        - my: 사용자 페이지
        - myNetwork: 사용자의 모임,친구 표시
        - network: 전체 모임 표시
        - ranking: 유저/전체 사용자 랭킹 표시
        - user:로그인 표시
- features 폴더 -액션, 리듀서 등 상태관리. Redux Toolkit의 createSlice.reducer함수를 사용합니다.
- pages-react router등을 이용하여 라우팅을 적용하는 페이지 컴포넌트, 컨테이너를 레이아웃으로 감싸 스타일을 적용시킴
    - HomePage
    - IntroPage
    - Layout
    - MyNetworkPage
    - PasswordPage
    - RankingPage
    - UserPage
- styles폴더
    - global.scss
    - mystyle.css
    - reset.css
    - variable.scss
- utils 폴더
- App.js - 라우팅 코드
- index.js- 리덕스를 사용하는 리액트 렌더링 코드
- store.js - 리덕스 Toolkit의 configureStorage함수를 사용해 스토어를 생성합니다.
<br>

---

© 2023 AHoney. All rights reserved.
