import './styles/App.css'
import AdminHomePage from './pages/AdminHomePage'
import LoginPage from './pages/LoginPage'
import { Routes, Route } from 'react-router'
import RootPage from './pages/RootPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adminHomePage" element={<AdminHomePage />} />
        <Route path="/agentHomePage" element={<h1>סוכן, דף הבית</h1>} />
      </Routes>
    </>
  )
}

export default App
