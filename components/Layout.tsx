// components/Layout.tsx
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const ROUTES = [
  { href: '/',       label: 'Hoy',       icon: '☀️' },
  { href: '/diario', label: 'Mi Diario', icon: '📖' },
  { href: '/plan',   label: 'Mi Plan',   icon: '📋' },
  { href: '/ruta',   label: 'La Ruta',   icon: '🗺' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.getAttribute('data-theme') === 'dark')
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [router.pathname])

  const toggleTheme = () => {
    const next = dark ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('rts_theme', next)
    setDark(!dark)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── TOP NAV ── */}
      <nav style={{
        background: 'var(--navy)',
        padding: '.75rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 200,
      }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:8, fontWeight:700, fontSize:15, color:'#fff', textDecoration:'none', flexShrink:0 }}>
          <span>🐚</span>
          <span style={{ display:'block' }}>Road to Santiago</span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display:'flex', gap:0, marginLeft:'auto', '@media(max-width:600px)': { display:'none' } } as React.CSSProperties}>
          {ROUTES.map(r => {
            const active = router.pathname === r.href
            return (
              <Link key={r.href} href={r.href} style={{
                padding: '.5rem .875rem',
                fontSize: 12, fontWeight: 500,
                color: active ? '#fff' : 'rgba(255,255,255,.5)',
                background: active ? 'rgba(84,206,209,.2)' : 'none',
                borderRadius: 8, transition: 'all .2s', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 5,
              }}>
                <span style={{ fontSize: 13 }}>{r.icon}</span>
                <span className="nav-label">{r.label}</span>
              </Link>
            )
          })}
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:'.5rem', marginLeft:'auto' }}>
          <button onClick={toggleTheme} style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(255,255,255,.08)',
            border: '1px solid rgba(255,255,255,.1)',
            cursor: 'pointer', fontSize: 15,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {dark ? '☀️' : '🌙'}
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="hamburger"
            style={{
              width: 36, height: 36, borderRadius: 8,
              background: menuOpen ? 'rgba(84,206,209,.2)' : 'rgba(255,255,255,.08)',
              border: '1px solid rgba(255,255,255,.1)',
              cursor: 'pointer', fontSize: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff',
            }}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 56, left: 0, right: 0, bottom: 0,
          background: 'var(--navy)', zIndex: 150,
          display: 'flex', flexDirection: 'column',
          padding: '1.5rem 1.25rem',
          gap: '.5rem',
        }}>
          {ROUTES.map(r => {
            const active = router.pathname === r.href
            return (
              <Link key={r.href} href={r.href} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '1rem 1.25rem', borderRadius: 12, textDecoration: 'none',
                background: active ? 'rgba(84,206,209,.2)' : 'rgba(255,255,255,.05)',
                border: `1px solid ${active ? 'rgba(84,206,209,.3)' : 'rgba(255,255,255,.08)'}`,
                transition: 'all .2s',
              }}>
                <span style={{ fontSize: 22 }}>{r.icon}</span>
                <span style={{ fontSize: 16, fontWeight: 600, color: active ? '#fff' : 'rgba(255,255,255,.65)' }}>
                  {r.label}
                </span>
              </Link>
            )
          })}

          <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.25)', textAlign: 'center', fontWeight: 300 }}>
              Baiona → Santiago · Octubre 2026
            </div>
          </div>
        </div>
      )}

      {/* ── CONTENT ── */}
      <main style={{ paddingBottom: '5rem' }}>{children}</main>

      {/* ── BOTTOM TAB BAR — mobile only ── */}
      <div className="bottom-bar" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'var(--navy)',
        borderTop: '1px solid rgba(255,255,255,.1)',
        display: 'flex',
        zIndex: 100,
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}>
        {ROUTES.map(r => {
          const active = router.pathname === r.href
          return (
            <Link key={r.href} href={r.href} style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: '.6rem .25rem',
              textDecoration: 'none',
              color: active ? 'var(--teal-l)' : 'rgba(255,255,255,.35)',
              transition: 'all .2s',
              gap: 3,
            }}>
              <span style={{ fontSize: 20 }}>{r.icon}</span>
              <span style={{ fontSize: 9, fontWeight: active ? 600 : 400, letterSpacing: '.3px' }}>{r.label}</span>
            </Link>
          )
        })}
      </div>

      <style>{`
        @media (min-width: 640px) {
          .hamburger { display: none !important; }
          .bottom-bar { display: none !important; }
        }
        @media (max-width: 639px) {
          .nav-label { display: none; }
        }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  )
}
