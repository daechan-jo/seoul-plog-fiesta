import { Routes, Route } from 'react-router-dom';
import IntroPage from './pages/IntroPage';
import HomePage from './pages/HomePage';
import NetworkPage from './pages/NetworkPage';
import RankingPage from './pages/RankingPage';
import MyPage from './pages/MyPage';
import PasswordPage from './pages/PasswordPage';
import GroupIdPage from './pages/GroupIdPage';
import UserIdPage from './pages/UserIdPage';
import LoginPage from './pages/LoginPage';
import RegistePage from './pages/RegisterPage';
import RecommendPage from './pages/RecommendPage';
import NotFoundPage from './pages/NotPage';
import PasswordEmailSuccessPage from './pages/ChangePWPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/intro" element={<IntroPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistePage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/network" element={<NetworkPage />} />
      <Route path="/ranking" element={<RankingPage />} />
      <Route path="/recommend" element={<RecommendPage />} />
      <Route path="/setpassword" element={<PasswordPage />} />
      <Route path="/changepassword" element={<PasswordEmailSuccessPage />} />
      <Route path="/groups/:groupId" element={<GroupIdPage />} />
      <Route path="/users/:userId" element={<UserIdPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
