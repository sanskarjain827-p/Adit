import { useState, useCallback } from 'react'
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import Showcase from './components/Showcase.jsx'
import Work from './components/Work.jsx'
import Contact from './components/Contact.jsx'
import MenuOverlay from './components/MenuOverlay.jsx'
import Preloader from './components/Preloader.jsx'
import Cursor from './components/Cursor.jsx'

const PRELOAD_KEY = 'insyd-preloaded'

export default function App() {
  const [view, setView] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [showPreloader, setShowPreloader] = useState(
    () => typeof window !== 'undefined' && !sessionStorage.getItem(PRELOAD_KEY),
  )

  const dismissPreloader = useCallback(() => {
    sessionStorage.setItem(PRELOAD_KEY, '1')
    setShowPreloader(false)
  }, [])

  const navigate = useCallback(
    (next) => {
      if (next === view) {
        setMenuOpen(false)
        return
      }
      setLeaving(true)
      setMenuOpen(false)
      setTimeout(() => {
        window.scrollTo(0, 0)
        setView(next)
        setLeaving(false)
      }, 350)
    },
    [view],
  )

  return (
    <>
      <Cursor />
      {showPreloader && <Preloader onDone={dismissPreloader} />}
      <Header
        onMenu={() => setMenuOpen(true)}
        onLogo={() => navigate('home')}
        onContact={() => navigate('contact')}
        floating={view !== 'showcase'}
      />
      <div className={`view ${leaving ? 'view-leaving' : 'view-entering'}`}>
        {view === 'home' && (
          <Home
            onTalk={() => navigate('contact')}
            onWork={() => navigate('showcase')}
          />
        )}
        {view === 'showcase' && <Showcase onAllWork={() => navigate('work')} />}
        {view === 'work' && <Work />}
        {view === 'contact' && <Contact />}
      </div>
      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={navigate}
      />
    </>
  )
}
