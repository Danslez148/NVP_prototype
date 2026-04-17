import { useState } from 'react'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import MarketSearch from './pages/MarketSearch'
import ExpertNetwork from './pages/ExpertNetwork'

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [user, setUser] = useState(null)

  const login = (userData) => {
    setUser(userData)
    setScreen('dashboard')
  }

  const navigate = (screen) => setScreen(screen)

  return (
    <>
      {screen === 'landing' && <Landing onLogin={login} />}
      {screen === 'dashboard' && <Dashboard user={user} navigate={navigate} />}
      {screen === 'market' && <MarketSearch user={user} navigate={navigate} />}
      {screen === 'experts' && <ExpertNetwork user={user} navigate={navigate} />}
    </>
  )
}