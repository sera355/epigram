import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Join from './pages/Join';
import LogIn from './pages/LogIn';
import AddEpigram from './pages/AddEpigram';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/join" element={<Join />} />
        <Route path="/add" element={<AddEpigram />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/detail" element={<DetailPage />} />
      </Routes>
    </>
  );
}

export default App;
