import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { email: '', nickName: '', loginId: '', groups: [], users: [] },
  reducers: {
    login(state, action) {
      //api요청 후 반환값을 state에 넣기
      //const { email, nickName } = action.payload;
      // action의 payload속성에 접근
      const { token, id, email, nickname, groups, friendshipA } =
        action.payload;

      state.email = email;
      state.nickName = nickname;
      state.loginId = id;
      localStorage.setItem('userToken', token);
      if (!groups) {
        state.groups = [];
      } else {
        state.groups = groups;
      }
      if (!friendshipA) {
        state.users = [];
      } else {
        state.users = friendshipA;
      }
      console.log(state);
    },
    logout(state, action) {
      //api요청 후 state를 삭제함
      state.email = '';
      state.nickName = '';
      state.loginId = '';
      localStorage.removeItem('userToken');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
