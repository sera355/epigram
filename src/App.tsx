import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import AddEpigram from './pages/AddEpigram';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/addepigram" element={<AddEpigram />} />
          <Route path="/epigrams/:id/edit" element={<AddEpigram />} />
        </Route>
        
        <Route path="/epigramlist" element={<MainPage />} />
        <Route path="/epigrams/:id" element={<DetailPage />} />
      </Routes>
    </>
  );
}

export default App;
