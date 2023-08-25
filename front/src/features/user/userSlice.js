import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { email: '', nickName: '', loginId: '', groups: [], users: [] },
  reducers: {
    login(state, action) {
      //api요청 후 반환값을 state에 넣기
      //const { email, nickName } = action.payload;
      // action의 payload속성에 접근
      const { token, id, email, nickname } = action.payload;

      state.email = email;
      console.log(action.payload);
      state.nickName = nickname;
      state.loginId = id;
      sessionStorage.setItem('userToken', token);
    },
    logout(state, action) {
      //api요청 후 state를 삭제함
      state.email = '';
      state.nickName = '';
      state.loginId = '';
      sessionStorage.removeItem('userToken');
    },
    addInfo(state, action) {
      console.log('addInfo실행');
      const datas = action.payload;
      console.log(datas);
      datas.forEach((data) => {
        state.groups.push(data.groupId);
      });
      console.log(state.groups);
    },
  },
});

export const { login, logout, addInfo } = userSlice.actions;
export default userSlice.reducer;
