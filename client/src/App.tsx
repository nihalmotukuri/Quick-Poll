import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from './redux/userThunk'
import { getLatestPolls } from './redux/pollsThunk'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Poll from './pages/Poll'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
        dispatch(getUser())
    }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoute />} >
          <Route path='/polls/:pollId' element={<Poll />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
