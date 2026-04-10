// pages/_app.tsx
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const saved = localStorage.getItem('rts_theme') || 'light'
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  return <Component {...pageProps} />
}
