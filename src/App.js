import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useUser } from './context/user';
import useCheckIfLoggedIn from './hooks/useCheckedIfLoggedIn';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import DiseasePage from './pages/Disease';
import MedicationPage from './pages/Medicine';
import { CircularProgress } from '@mui/material';
import ReportPage from './pages/Report';

function App() {
  const { user, isUserLoading } = useUser();
  useCheckIfLoggedIn();
  let routes = <>
    <Route path='/login' element={<LoginPage />} />
    <Route path='/register' element={<RegisterPage />} />
    <Route path='*' element={<Navigate to='/login' replace />} />
  </>
  if (user) {
    routes = <>
      <Route path='/diseases' element={<DiseasePage />} />
      <Route path='/medications' element={<MedicationPage />} />
      <Route path='/generateReport' element={<ReportPage />} />
      <Route path='*' element={<Navigate to='/diseases' replace />} />
    </>
  }

  return isUserLoading ? <CircularProgress /> : <Routes>{routes}</Routes>
}

export default App;
