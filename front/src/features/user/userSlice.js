import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { email: '', nickName: '' },
  reducers: {
    login(state, action) {
      //api요청 후 반환값을 state에 넣기
      //const { email, nickName } = action.payload;
      // action의 payload속성에 접근
      const { token, email, nickName } = action.payload;
      state.email = email;
      state.nickName = nickName;
      sessionStorage.setItem('userToken', token);
    },
    register(state, action) {
      //api요청 후 반환값을 state에 넣기 => 회원가입하면 자동 로그인됨
      //const { email, nickName } = action.payload;
      const email = 'hi';
      const nickName = 'hi';
      state.email = email;
      state.nickName = nickName;
    },
    logout(state, action) {
      //api요청 후 state를 삭제함
      state.email = '';
      state.nickName = '';
    },
  },
});

export const { login, register, logout } = userSlice.actions;
export default userSlice.reducer;
