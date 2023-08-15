import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import UserPage from "./pages/UserPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" exact element={<MainPage />} />
      <Route path="/login" element={<UserPage />} />
      <Route path="/register" element={<UserPage />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  );
};

export default App;
