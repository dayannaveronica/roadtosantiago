// pages/index.tsx
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { getTodayEntry, PHASES, ALL_DAYS, FlatDay } from '../lib/plan'

const MONTHS = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
const DAYS_ES = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
const ICONS: Record<string,string> = { walk:'🥾', bike:'🚴', str:'💪', rest:'—', sun:'✦' }

const MSGS: Record<string, string[]> = {
  walk: ['Hoy toca mover las piernas. Cada paso te acerca más a Santiago.', 'Las piernas que caminarán por Galicia se construyen hoy.', 'Un buen día para caminar. El Camino empieza mucho antes de Baiona.'],
  bike: ['Día de bici — cardio sin castigo articular.', 'Pedalear hoy es invertir en tus rodillas para el Camino.', 'Hoy rueda suave. El corazón agradece, las rodillas también.'],
  str:  ['Hoy fuerza. Las rodillas y la espalda te lo agradecerán en cada etapa.', 'El Camino no se gana solo caminando — el cuerpo se construye hoy.', 'Hoy fortaleces lo que va a sostenerte durante 140 km.'],
  rest: ['El descanso también es entrenamiento. Hoy recuperas.', 'Día de recuperación. Sin culpa, con intención.', 'El cuerpo consolida en reposo.'],
  sun:  ['Domingo de reposo. Sagrado y necesario.', 'Tu descanso dominical es parte del plan. Que sea un buen día.', 'El reposo del domingo nutre más que cualquier entreno.'],
}

const INSPIRATIONS = [
  { quote: 'El Camino se hace al andar.', author: 'Antonio Machado' },
  { quote: 'No es el destino, sino el camino lo que importa.', author: 'Proverbio peregrino' },
  { quote: 'Cada etapa es una versión más fuerte de ti misma.', author: '' },
  { quote: 'Buen Camino es más que un saludo — es una forma de vivir.', author: '' },
  { quote: 'El cuerpo logrará lo que la mente crea posible.', author: '' },
  { quote: 'Un paso a la vez. Siempre hacia adelante.', author: '' },
]

const PHYSICAL_OPTS = ['💪 Muy bien', '😊 Bien', '😐 Regular', '😓 Cansada', '🤕 Mal']
const EMOTIONAL_OPTS = ['✨ Motivada', '😌 Tranquila', '😤 Desafiada', '😔 Baja energía', '🔥 En llamas']

interface CheckIn {
  dayId: string; activityDone: boolean; physical: string; emotional: string; note: string; date: string
}

export default function Home() {
  const [now] = useState(new Date())
  const [entry, setEntry] = useState<FlatDay | null>(null)
  const [checkin, setCheckin] = useState<CheckIn | null>(null)
  const [form, setForm] = useState({ activityDone: false, physical: '', emotional: '', note: '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [stats, setStats] = useState({ done: 0, streak: 0 })
  const [inspiration] = useState(() => INSPIRATIONS[Math.floor(Math.random() * INSPIRATIONS.length)])
  const [msg] = useState<string>('')

  const dateKey = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`
  const sal = now.getHours() < 12 ? 'Buenos días' : now.getHours() < 19 ? 'Buenas tardes' : 'Buenas noches'

  useEffect(() => {
    setEntry(getTodayEntry())
    // load today's checkin
    fetch(`/api/checkin?date=${dateKey}`)
      .then(r => r.json())
      .then(data => { if (data) { setCheckin(data); setSaved(true) }})
    // load stats
    fetch('/api/checkin?limit=200')
      .then(r => r.json())
      .then((all: CheckIn[]) => {
        const done = all.filter(c => c.activityDone).length
        // streak: consecutive days with activityDone from today backwards
        let streak = 0
        const sorted = all.filter(c => c.activityDone).sort((a,b) => b.date.localeCompare(a.date))
        for (let i = 0; i < sorted.length; i++) {
          const expected = new Date(now)
          expected.setDate(expected.getDate() - i)
          const exp = `${expected.getFullYear()}-${String(expected.getMonth()+1).padStart(2,'0')}-${String(expected.getDate()).padStart(2,'0')}`
          if (sorted[i]?.date === exp) streak++
          else break
        }
        setStats({ done, streak })
      })
  }, [])

  const randomMsg = (type: string) => {
    const arr = MSGS[type] || ['Hoy toca '+type]
    return arr[Math.floor(Math.random() * arr.length)]
  }

  const save = async () => {
    if (!entry || saving) return
    setSaving(true)
    await fetch('/api/checkin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-write-key': process.env.NEXT_PUBLIC_WRITE_KEY || '',
      },
      body: JSON.stringify({ ...form, dayId: entry.id, date: dateKey }),
    })
    setSaving(false)
    setSaved(true)
    setCheckin({ ...form, dayId: entry.id, date: dateKey })
    setStats(s => ({ ...s, done: s.done + (form.activityDone ? 1 : 0) }))
  }

  const totalNonSun = ALL_DAYS.filter(d => d.type !== 'sun').length
  const pct = Math.round((stats.done / totalNonSun) * 100)
  const daysToSantiago = Math.ceil((new Date(2026,9,13).getTime() - now.getTime()) / 86400000)

  const phase = entry ? PHASES[entry.phaseIndex] : null
  const week  = entry ? phase?.weekData[entry.weekIndex] : null

  return (
    <Layout>
      {/* HERO */}
      <div style={{ background: 'var(--navy)', padding: '2.5rem 2rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position:'absolute', top:-80, right:-80, width:240, height:240, borderRadius:'50%', background:'rgba(84,206,209,.12)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-50, left:'25%', width:180, height:180, borderRadius:'50%', background:'rgba(255,140,97,.08)', pointerEvents:'none' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          <div style={{ fontSize: 10, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--teal-l)', fontWeight: 500, marginBottom: '.5rem' }}>
            {DAYS_ES[now.getDay()]}, {now.getDate()} de {MONTHS[now.getMonth()]} de {now.getFullYear()}
          </div>

          <h1 style={{ fontSize: 'clamp(1.4rem,3.5vw,2rem)', fontWeight: 700, color: '#fff', lineHeight: 1.25, marginBottom: '1.25rem' }}>
            {sal}, <em style={{ color: 'var(--teal-l)', fontStyle: 'italic', fontWeight: 400 }}>Daya</em> 🌿<br />
            <span style={{ fontWeight: 400, fontSize: '90%' }}>{entry ? randomMsg(entry.type) : daysToSantiago > 0 ? `El Camino empieza en ${daysToSantiago} días` : '¡Buen Camino!'}</span>
          </h1>

          {entry && (
            <div style={{ background:'rgba(255,255,255,.07)', border:'1px solid rgba(255,255,255,.1)', borderRadius:14, padding:'1.1rem 1.4rem', marginBottom:'1rem' }}>
              <div style={{ fontSize:9, letterSpacing:2, textTransform:'uppercase', color:'rgba(255,255,255,.3)', fontWeight:500, marginBottom:'.4rem' }}>Actividad de hoy</div>
              <div style={{ fontSize:'1rem', fontWeight:600, color:'#fff', marginBottom:'.2rem' }}>
                {ICONS[entry.type]} {entry.label}{entry.detail ? ` — ${entry.detail}` : ''}
              </div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,.4)', fontWeight:300 }}>
                {week?.n} · {week?.dates} · {phase?.title}
              </div>
              {entry.type !== 'sun' && phase && (
                <div style={{ display:'flex', gap:'.5rem', flexWrap:'wrap', marginTop:'.65rem' }}>
                  {[phase.title, entry.detail].filter(Boolean).map(t => (
                    <span key={t} style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'4px 12px', borderRadius:20, fontSize:11, background:'rgba(84,206,209,.15)', color:'var(--teal-l)', border:'1px solid rgba(84,206,209,.2)' }}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* progress */}
          <div style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'.6rem 0', borderTop:'1px solid rgba(255,255,255,.1)', marginTop:'.5rem' }}>
            <span style={{ fontSize:10, color:'rgba(255,255,255,.3)', letterSpacing:1, textTransform:'uppercase' }}>Progreso</span>
            <div style={{ flex:1, height:3, background:'rgba(255,255,255,.08)', borderRadius:2 }}>
              <div style={{ height:'100%', borderRadius:2, background:'var(--teal-l)', width:`${pct}%`, transition:'width .6s ease' }} />
            </div>
            <span style={{ fontSize:12, fontWeight:600, color:'var(--teal-l)' }}>{pct}%</span>
            <span style={{ fontSize:11, color:'rgba(255,255,255,.25)', fontWeight:300 }}>{stats.done} días</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '2rem 2rem 5rem' }}>

        {/* CHECK-IN CARD */}
        {entry && entry.type !== 'sun' && (
          <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, padding:'1.75rem', marginBottom:'1rem', boxShadow:'var(--sh)' }}>
            <div style={{ fontSize:10, letterSpacing:2, textTransform:'uppercase', fontWeight:600, color:'var(--teal)', marginBottom:'.75rem' }}>
              Check-in de hoy
            </div>

            {saved && checkin ? (
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:'.75rem' }}>
                  <span style={{ fontSize:20 }}>✅</span>
                  <span style={{ fontSize:14, fontWeight:500, color:'var(--text)' }}>Registrado</span>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.5rem', marginBottom:'.75rem' }}>
                  <div style={{ padding:'.5rem .75rem', background:'var(--bg)', borderRadius:8, fontSize:12 }}>
                    <span style={{ color:'var(--muted)', fontWeight:300 }}>Físico: </span>
                    <span style={{ fontWeight:500 }}>{checkin.physical || '—'}</span>
                  </div>
                  <div style={{ padding:'.5rem .75rem', background:'var(--bg)', borderRadius:8, fontSize:12 }}>
                    <span style={{ color:'var(--muted)', fontWeight:300 }}>Emocional: </span>
                    <span style={{ fontWeight:500 }}>{checkin.emotional || '—'}</span>
                  </div>
                </div>
                {checkin.note && (
                  <div style={{ fontSize:13, color:'var(--muted)', fontStyle:'italic', lineHeight:1.6, padding:'.75rem 1rem', background:'var(--bg)', borderRadius:8 }}>
                    "{checkin.note}"
                  </div>
                )}
                <button onClick={() => { setSaved(false); setCheckin(null) }} style={{ marginTop:'1rem', fontSize:11, color:'var(--muted)', background:'none', border:'none', cursor:'pointer', textDecoration:'underline' }}>
                  Editar
                </button>
              </div>
            ) : (
              <div>
                {/* Activity done? */}
                <div style={{ marginBottom:'1rem' }}>
                  <div style={{ fontSize:12, fontWeight:500, color:'var(--text)', marginBottom:'.5rem' }}>¿Hiciste la actividad?</div>
                  <div style={{ display:'flex', gap:'.5rem' }}>
                    {[true, false].map(v => (
                      <button key={String(v)} onClick={() => setForm(f => ({ ...f, activityDone: v }))} style={{
                        padding:'.5rem 1.25rem', borderRadius:40, fontSize:12, fontWeight:500, cursor:'pointer',
                        background: form.activityDone === v ? (v ? 'var(--teal)' : 'var(--coral)') : 'var(--bg)',
                        color: form.activityDone === v ? '#fff' : 'var(--muted)',
                        border: `1px solid ${form.activityDone === v ? 'transparent' : 'var(--border)'}`,
                        transition: 'all .2s',
                      }}>
                        {v ? '✓ Sí, lo hice' : 'Lo salté'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Physical */}
                <div style={{ marginBottom:'1rem' }}>
                  <div style={{ fontSize:12, fontWeight:500, color:'var(--text)', marginBottom:'.5rem' }}>¿Cómo estás físicamente?</div>
                  <div style={{ display:'flex', gap:'.4rem', flexWrap:'wrap' }}>
                    {PHYSICAL_OPTS.map(o => (
                      <button key={o} onClick={() => setForm(f => ({ ...f, physical: o }))} style={{
                        padding:'.4rem .85rem', borderRadius:40, fontSize:12, cursor:'pointer',
                        background: form.physical === o ? 'var(--navy)' : 'var(--bg)',
                        color: form.physical === o ? '#fff' : 'var(--muted)',
                        border: `1px solid ${form.physical === o ? 'var(--navy)' : 'var(--border)'}`,
                        transition: 'all .2s',
                      }}>{o}</button>
                    ))}
                  </div>
                </div>

                {/* Emotional */}
                <div style={{ marginBottom:'1rem' }}>
                  <div style={{ fontSize:12, fontWeight:500, color:'var(--text)', marginBottom:'.5rem' }}>¿Cómo estás emocionalmente?</div>
                  <div style={{ display:'flex', gap:'.4rem', flexWrap:'wrap' }}>
                    {EMOTIONAL_OPTS.map(o => (
                      <button key={o} onClick={() => setForm(f => ({ ...f, emotional: o }))} style={{
                        padding:'.4rem .85rem', borderRadius:40, fontSize:12, cursor:'pointer',
                        background: form.emotional === o ? 'var(--navy)' : 'var(--bg)',
                        color: form.emotional === o ? '#fff' : 'var(--muted)',
                        border: `1px solid ${form.emotional === o ? 'var(--navy)' : 'var(--border)'}`,
                        transition: 'all .2s',
                      }}>{o}</button>
                    ))}
                  </div>
                </div>

                {/* Note */}
                <div style={{ marginBottom:'1.25rem' }}>
                  <div style={{ fontSize:12, fontWeight:500, color:'var(--text)', marginBottom:'.5rem' }}>Nota del día (opcional)</div>
                  <textarea value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                    placeholder="¿Cómo fue? ¿Qué sentiste? ¿Algo a destacar..."
                    rows={3} style={{
                      width:'100%', padding:'.75rem 1rem', borderRadius:10,
                      border:'1px solid var(--border)', background:'var(--bg)',
                      color:'var(--text)', fontSize:13, fontFamily:'Poppins, sans-serif',
                      resize:'vertical', outline:'none', lineHeight:1.6,
                    }} />
                </div>

                <button onClick={save} disabled={saving} style={{
                  padding:'.7rem 2rem', borderRadius:40, fontSize:13, fontWeight:600,
                  background:'var(--teal)', color:'#fff', border:'none', cursor:'pointer',
                  opacity: saving ? .6 : 1, transition:'all .2s',
                }}>
                  {saving ? 'Guardando...' : 'Guardar check-in'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* STATS */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'1rem' }}>
          {[
            { n: stats.done, label:'Días completados', color:'var(--teal)' },
            { n: stats.streak, label:'Racha actual', color:'var(--coral)' },
            { n: totalNonSun - stats.done, label:'Días restantes', color:'var(--navy)' },
            { n: Math.max(0,daysToSantiago), label:'Días para Santiago', color:'#b8950a' },
          ].map(s => (
            <div key={s.label} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'1.25rem 1rem', textAlign:'center', boxShadow:'var(--sh)' }}>
              <div style={{ fontSize:'1.75rem', fontWeight:700, color:s.color, lineHeight:1, marginBottom:'.25rem' }}>{s.n}</div>
              <div style={{ fontSize:10, color:'var(--muted)', letterSpacing:1, textTransform:'uppercase', fontWeight:500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* INSPIRATION */}
        <div style={{ background:'var(--navy)', borderRadius:16, padding:'1.75rem', position:'relative', overflow:'hidden', marginBottom:'1rem' }}>
          <div style={{ position:'absolute', top:-40, right:-40, width:140, height:140, borderRadius:'50%', background:'rgba(84,206,209,.1)' }} />
          <div style={{ fontSize:10, letterSpacing:2, textTransform:'uppercase', fontWeight:600, color:'var(--teal-l)', marginBottom:'.75rem', position:'relative', zIndex:1 }}>Inspiración del día</div>
          <div style={{ fontSize:'1rem', fontWeight:400, color:'rgba(255,255,255,.85)', lineHeight:1.7, fontStyle:'italic', marginBottom:'.5rem', position:'relative', zIndex:1 }}>
            "{inspiration.quote}"
          </div>
          {inspiration.author && (
            <div style={{ fontSize:11, color:'var(--teal-l)', fontWeight:500, letterSpacing:1, position:'relative', zIndex:1 }}>
              — {inspiration.author}
            </div>
          )}
        </div>

        {/* CAMINO INFO */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
          <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:'1.5rem', boxShadow:'var(--sh)' }}>
            <div style={{ fontSize:10, letterSpacing:1.5, textTransform:'uppercase', fontWeight:600, color:'var(--teal)', marginBottom:'.75rem' }}>Esta semana</div>
            <div style={{ fontSize:'1rem', fontWeight:600, color:'var(--text)', marginBottom:'.3rem' }}>{week?.n || '—'} · {week?.dates || '—'}</div>
            <div style={{ fontSize:12, color:'var(--muted)', fontWeight:300, lineHeight:1.6 }}>{phase?.subtitle || 'El entrenamiento comienza el 13 de abril.'}</div>
          </div>
          <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:'1.5rem', boxShadow:'var(--sh)' }}>
            <div style={{ fontSize:10, letterSpacing:1.5, textTransform:'uppercase', fontWeight:600, color:'var(--coral)', marginBottom:'.75rem' }}>El Camino</div>
            <div style={{ fontSize:'1rem', fontWeight:600, color:'var(--text)', marginBottom:'.3rem' }}>13 oct · Baiona → Santiago</div>
            <div style={{ fontSize:12, color:'var(--muted)', fontWeight:300, lineHeight:1.6 }}>6 etapas · ~140 km · Llegada el 20 de octubre.</div>
          </div>
        </div>

      </div>
    </Layout>
  )
}
