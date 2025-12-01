
import './App.css'
import {Route, Routes} from 'react-router';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import MainPage from './pages/MainPage';

export default function App() {
  return (
<Routes>
  <Route> path ='/' element ={<MainPage/>}</Route>
  <Route> path = '/login' element={<LoginPage/>}</Route>
  <Route> path = '/register' element ={<RegisterPage/>}</Route>
  <Route> path = '*' element={<NotFoundPage/>}</Route>
</Routes>
  )
}