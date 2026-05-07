import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Join from './pages/SignUp/SignUp';
import LogIn from './pages/LogIn';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </>
  );
}

export default App;
