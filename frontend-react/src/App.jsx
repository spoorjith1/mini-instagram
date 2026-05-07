import React, { useContext } from 'react';
import './styles/global.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider, { AuthContext } from './AuthProvider';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import CreatePost from './pages/CreatePost';
import UsersPage from './pages/UsersPage';
import OthersProfile from './pages/OthersProfile';

function AppRoutes() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
    {isLoggedIn && <Navbar />}
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
      <Route path="/register" element={ <PublicRoute><Register /></PublicRoute> } />
      <Route path="/login" element={ <PublicRoute><Login /></PublicRoute>} />
      <Route path="/home" element={ <PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/profile" element={ <PrivateRoute><ProfilePage /></PrivateRoute> } />
      <Route path='/create_post' element={ <PrivateRoute><CreatePost /></PrivateRoute> } />
      <Route path='/users' element={ <PrivateRoute><UsersPage /></PrivateRoute> } />
      <Route path='/users/:id' element={ <PrivateRoute><OthersProfile /></PrivateRoute> } />
    </Routes>
    <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;