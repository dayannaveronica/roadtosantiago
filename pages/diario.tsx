// pages/diario.tsx
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'

const MONTHS = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
const DAYS_ES = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']

interface Entry {
  date: string; activityDone: boolean; physical: string; emotional: string; note: string; dayId: string
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00')
  return `${DAYS_ES[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`
}

function physicalEmoji(p: string) {
  if (p.includes('Muy bien')) return '💪'
  if (p.includes('Bien')) return '😊'
  if (p.includes('Regular')) return '😐'
  if (p.includes('Cansada')) return '😓'
  if (p.includes('Mal')) return '🤕'
  return '—'
}

function emotionalEmoji(e: string) {
  if (e.includes('Motivada')) return '✨'
  if (e.includes('Tranquila')) return '😌'
  if (e.includes('Desafiada')) return '😤'
  if (e.includes('Baja')) return '😔'
  if (e.includes('llamas')) return '🔥'
  return '—'
}

export default function Diario() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/checkin?limit=200')
      .then(r => r.json())
      .then(data => { setEntries(data || []); setLoading(false) })
  }, [])

  const done  = entries.filter(e => e.activityDone).length
  const total = entries.length
  const streak = (() => {
    let s = 0
    const sorted = entries.filter(e => e.activityDone).sort((a,b) => b.date.localeCompare(a.date))
    const now = new Date()
    for (let i = 0; i < sorted.length; i++) {
      const exp = new Date(now); exp.setDate(exp.getDate() - i)
      const expStr = `${exp.getFullYear()}-${String(exp.getMonth()+1).padStart(2,'0')}-${String(exp.getDate()).padStart(2,'0')}`
      if (sorted[i]?.date === expStr) s++; else break
    }
    return s
  })()

  return (
    <Layout>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(1rem, 4vw, 2rem) clamp(1rem, 4vw, 2rem) 6rem' }}>

        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text)', marginBottom: '.25rem' }}>Mi Diario 📖</h1>
          <p style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 300 }}>Tu historia hacia Santiago, día a día.</p>
        </div>

        {/* Summary stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem', marginBottom:'2rem' }}>
          {[
            { n: total,  label:'Días registrados', color:'var(--teal)' },
            { n: done,   label:'Actividades hechas', color:'var(--navy)' },
            { n: streak, label:'Racha actual', color:'var(--coral)' },
          ].map(s => (
            <div key={s.label} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'1.25rem', textAlign:'center', boxShadow:'var(--sh)' }}>
              <div style={{ fontSize:'2rem', fontWeight:700, color:s.color, lineHeight:1, marginBottom:'.25rem' }}>{s.n}</div>
              <div style={{ fontSize:10, color:'var(--muted)', letterSpacing:1, textTransform:'uppercase', fontWeight:500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {loading && (
          <div style={{ textAlign:'center', padding:'3rem', color:'var(--muted)', fontSize:13 }}>Cargando tu diario...</div>
        )}

        {!loading && entries.length === 0 && (
          <div style={{ textAlign:'center', padding:'3rem', background:'var(--surface)', borderRadius:16, border:'1px solid var(--border)' }}>
            <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>🌱</div>
            <div style={{ fontSize:14, fontWeight:500, color:'var(--text)', marginBottom:'.5rem' }}>Tu diario está vacío</div>
            <div style={{ fontSize:12, color:'var(--muted)', fontWeight:300 }}>Haz tu primer check-in hoy desde la página de inicio.</div>
          </div>
        )}

        <div style={{ display:'flex', flexDirection:'column', gap:'.75rem' }}>
          {entries.map(entry => (
            <div key={entry.date} style={{
              background:'var(--surface)', border:'1px solid var(--border)',
              borderRadius:14, padding:'1.25rem 1.5rem',
              boxShadow:'var(--sh)',
              borderLeft: `4px solid ${entry.activityDone ? 'var(--teal)' : 'var(--coral)'}`,
            }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'1rem', marginBottom:'.75rem' }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:'var(--text)' }}>{formatDate(entry.date)}</div>
                  <div style={{ fontSize:11, color:'var(--muted)', fontWeight:300, marginTop:2 }}>{entry.date}</div>
                </div>
                <div style={{
                  fontSize:11, fontWeight:600, padding:'3px 12px', borderRadius:20,
                  background: entry.activityDone ? 'rgba(81,192,183,.12)' : 'rgba(255,140,97,.12)',
                  color: entry.activityDone ? 'var(--teal)' : 'var(--coral)',
                  border: `1px solid ${entry.activityDone ? 'rgba(81,192,183,.3)' : 'rgba(255,140,97,.3)'}`,
                  whiteSpace: 'nowrap',
                }}>
                  {entry.activityDone ? '✓ Hecho' : 'Saltado'}
                </div>
              </div>

              <div style={{ display:'flex', gap:'.5rem', flexWrap:'wrap', marginBottom: entry.note ? '.75rem' : 0 }}>
                {entry.physical && (
                  <span style={{ fontSize:12, padding:'3px 10px', borderRadius:20, background:'var(--bg)', color:'var(--text)', border:'1px solid var(--border)' }}>
                    {physicalEmoji(entry.physical)} {entry.physical.replace(/^[^\s]+\s/,'')}
                  </span>
                )}
                {entry.emotional && (
                  <span style={{ fontSize:12, padding:'3px 10px', borderRadius:20, background:'var(--bg)', color:'var(--text)', border:'1px solid var(--border)' }}>
                    {emotionalEmoji(entry.emotional)} {entry.emotional.replace(/^[^\s]+\s/,'')}
                  </span>
                )}
              </div>

              {entry.note && (
                <div style={{ fontSize:13, color:'var(--muted)', fontStyle:'italic', lineHeight:1.7, paddingTop:'.75rem', borderTop:'1px solid var(--border)' }}>
                  "{entry.note}"
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
