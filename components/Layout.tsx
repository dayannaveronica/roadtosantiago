// components/Layout.tsx
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const ROUTES = [
  { href: '/',       label: 'Hoy' },
  { href: '/diario', label: 'Mi Diario' },
  { href: '/plan',   label: 'Mi Plan' },
  { href: '/ruta',   label: 'La Ruta' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.getAttribute('data-theme') === 'dark')
  }, [])

  const toggleTheme = () => {
    const next = dark ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('rts_theme', next)
    setDark(!dark)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{
        background: 'var(--navy)',
        padding: '.75rem 2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:8, fontWeight:700, fontSize:16, color:'#fff', textDecoration:'none' }}>
          <span>🐚</span> Road to Santiago
        </Link>
        <div style={{ display:'flex', gap:0, marginLeft:'auto' }}>
          {ROUTES.map(r => {
            const active = router.pathname === r.href
            return (
              <Link key={r.href} href={r.href} style={{
                padding: '.5rem 1rem',
                fontSize: 12,
                fontWeight: 500,
                color: active ? '#fff' : 'rgba(255,255,255,.5)',
                background: active ? 'rgba(84,206,209,.2)' : 'none',
                borderRadius: 8,
                transition: 'all .2s',
                textDecoration: 'none',
              }}>{r.label}</Link>
            )
          })}
        </div>
        <button onClick={toggleTheme} style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'rgba(255,255,255,.08)',
          border: '1px solid rgba(255,255,255,.1)',
          cursor: 'pointer', fontSize: 15,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginLeft: '.5rem',
        }}>
          {dark ? '☀️' : '🌙'}
        </button>
      </nav>
      <main>{children}</main>
    </div>
  )
}
