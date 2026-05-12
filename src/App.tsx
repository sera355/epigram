import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import AddEpigram from './pages/AddEpigram';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/addepigram" element={<AddEpigram />} />
        <Route path="/epigramlist" element={<MainPage />} />
        <Route path="/epigrams/1" element={<DetailPage />} />
      </Routes>
    </>
  );
}

export default App;
