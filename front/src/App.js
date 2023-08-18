import { Routes, Route, Navigate } from 'react-router-dom';
import UserPage from './pages/UserPage';
import IntroPage from './pages/IntroPage';
import HomePage from './pages/HomePage';
import MyNetworkPage from './pages/MyNetworkPage';
import NetworkPage from './pages/NetworkPage';
import RankingPage from './pages/RankingPage';
import MyPage from './pages/MyPage';
import PasswordPage from './pages/PasswordPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/intro" element={<IntroPage />} />
      <Route path="/login" element={<UserPage />} />
      <Route path="/register" element={<UserPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mynetwork" element={<MyNetworkPage />} />
      <Route path="/network" element={<NetworkPage />} />
      <Route path="/ranking" element={<RankingPage />} />
      <Route path="/setpassword" element={<PasswordPage />} />
      <Route path="*" element={<IntroPage />} />
    </Routes>
  );
};

export default App;
