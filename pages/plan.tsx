// pages/plan.tsx
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { PHASES, ALL_DAYS, FlatDay, PLAN_START } from '../lib/plan'

const DL  = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom']
const MO  = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
const IC: Record<string,string> = { walk:'🥾', bike:'🚴', str:'💪', rest:'·', sun:'✦' }
const PC  = ['#51c0b7','#1a4279','#ff8c61','#ff808b']

function fmtDate(d: Date) { return `${d.getDate()} ${MO[d.getMonth()]}` }

export default function Plan() {
  const [activePhase, setActivePhase] = useState(0)
  const [log, setLog] = useState<Record<string,boolean>>({})

  useEffect(() => {
    // Load all check-ins to show activity status
    fetch('/api/checkin?limit=200')
      .then(r => r.json())
      .then((data: { dayId:string; activityDone:boolean }[]) => {
        const m: Record<string,boolean> = {}
        data.forEach(e => { m[e.dayId] = e.activityDone })
        setLog(m)
      })
  }, [])

  const today = new Date(); today.setHours(0,0,0,0)

  return (
    <Layout>
      <div style={{ maxWidth: 900, margin:'0 auto', padding:'2rem 2rem 5rem' }}>
        <div style={{ marginBottom:'1.5rem' }}>
          <h1 style={{ fontSize:'1.75rem', fontWeight:700, color:'var(--text)', marginBottom:'.25rem' }}>Mi Plan 📋</h1>
          <p style={{ fontSize:13, color:'var(--muted)', fontWeight:300 }}>26 semanas · 13 abril – 12 octubre 2026</p>
        </div>

        {/* Phase nav */}
        <div style={{ display:'flex', borderBottom:'1px solid var(--border)', marginBottom:'1.5rem', overflowX:'auto' }}>
          {PHASES.map((ph, i) => (
            <button key={i} onClick={() => setActivePhase(i)} style={{
              padding:'.875rem 1rem', fontSize:12, fontWeight:500, border:'none', background:'none', cursor:'pointer',
              color: activePhase === i ? 'var(--navy)' : 'var(--muted)',
              borderBottom: activePhase === i ? `2px solid ${PC[i]}` : '2px solid transparent',
              whiteSpace:'nowrap', transition:'all .2s',
            }}>
              Fase {i+1} — {ph.title.split(' ')[0]} {ph.title.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Active phase */}
        {PHASES.map((phase, pi) => pi !== activePhase ? null : (
          <div key={pi}>
            {/* Phase header */}
            <div style={{ padding:'0 0 1.25rem', borderBottom:'1px solid var(--border)', marginBottom:'1.5rem', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
              <div>
                <div style={{ fontSize:10, letterSpacing:2, textTransform:'uppercase', fontWeight:600, color:PC[pi], marginBottom:'.3rem' }}>Fase {pi+1}</div>
                <div style={{ fontSize:'1.5rem', fontWeight:700, color:'var(--text)', lineHeight:1.2 }}>{phase.title}</div>
                <div style={{ fontSize:12, color:'var(--muted)', fontWeight:300, marginTop:'.3rem' }}>{phase.subtitle}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:13, fontWeight:500, color:'var(--text)' }}>{phase.dates}</div>
                <div style={{ fontSize:11, color:'var(--muted2)', fontWeight:300, marginTop:3 }}>{phase.weeks} semanas</div>
              </div>
            </div>

            {/* Exercises */}
            <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', marginBottom:'1rem', boxShadow:'var(--sh)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, padding:'.875rem 1.25rem', borderBottom:'1px solid var(--border)' }}>
                <div style={{ width:30, height:30, borderRadius:8, background:`${PC[pi]}18`, color:PC[pi], display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>💪</div>
                <div style={{ fontSize:12, fontWeight:500, color:'var(--muted)' }}>Ejercicios de la fase — martes y jueves</div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:1, background:'var(--border)' }}>
                {phase.exercises.map((ex,i) => (
                  <div key={i} style={{ background:'var(--surface)', padding:'.65rem 1.25rem', fontSize:12, color:'var(--text)', lineHeight:1.5, display:'flex', alignItems:'flex-start', gap:9, fontWeight:300 }}>
                    <div style={{ width:5, height:5, borderRadius:'50%', background:PC[pi], flexShrink:0, marginTop:5 }} />
                    {ex}
                  </div>
                ))}
              </div>
            </div>

            {/* Tip */}
            <div style={{ borderLeft:`3px solid ${PC[pi]}`, padding:'.875rem 1.25rem', fontSize:12, fontWeight:300, color:'var(--muted)', lineHeight:1.7, marginBottom:'1.5rem', background:'rgba(81,192,183,.05)', borderRadius:'0 8px 8px 0' }}>
              <strong style={{ color:'var(--text)', fontWeight:600 }}>Nota:</strong> {phase.tip}
            </div>

            {/* Legend */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'1rem', marginBottom:'1.5rem', padding:'.75rem 1rem', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:10, alignItems:'center' }}>
              {[['var(--teal)','Caminar'],['var(--navy)','Bicicleta'],['var(--coral)','Fuerza'],['var(--border)','Descanso'],['var(--yellow)','Domingo']].map(([c,l]) => (
                <div key={l} style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'var(--muted)' }}>
                  <div style={{ width:9, height:9, borderRadius:2, background:c, flexShrink:0, border: c === 'var(--border)' ? '1px solid var(--muted2)' : 'none' }} />
                  {l}
                </div>
              ))}
              <span style={{ marginLeft:'auto', fontSize:10, color:'var(--muted2)', fontWeight:300 }}>Verde = completado · Toca para ver detalle</span>
            </div>

            {/* Weeks */}
            <div style={{ display:'flex', flexDirection:'column', gap:'.75rem' }}>
              {phase.weekData.map((week, wi) => {
                const firstEntry = ALL_DAYS.find(x => x.phaseIndex===pi && x.weekIndex===wi && x.dayIndex===0)
                const firstIdx   = firstEntry ? ALL_DAYS.indexOf(firstEntry) : -1

                return (
                  <div key={wi} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', boxShadow:'var(--sh)' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, padding:'.6rem 1.25rem', borderBottom:'1px solid var(--border)', background:'var(--bg)' }}>
                      <span style={{ fontSize:12, fontWeight:600, color:'var(--text)' }}>{week.n}</span>
                      <span style={{ fontSize:11, color:'var(--muted2)', fontWeight:300 }}>{week.dates}</span>
                      {week.tag && (
                        <span style={{ marginLeft:'auto', fontSize:10, fontWeight:500, padding:'3px 10px', borderRadius:20, background:`${week.tagColor}18`, color:week.tagColor, border:`1px solid ${week.tagColor}40` }}>
                          {week.tag}
                        </span>
                      )}
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)' }}>
                      {week.days.map((day, di) => {
                        const entry = ALL_DAYS.find(x => x.phaseIndex===pi && x.weekIndex===wi && x.dayIndex===di)
                        const cellDate = entry ? new Date(entry.date) : null
                        if (cellDate) cellDate.setHours(0,0,0,0)
                        const isToday = cellDate?.getTime() === today.getTime()
                        const isDone  = entry ? log[entry.id] === true : false
                        const dateStr = cellDate ? fmtDate(cellDate) : ''

                        return (
                          <div key={di} className={`day-${day.type}`} style={{
                            padding:'.65rem .3rem', textAlign:'center',
                            borderRight: di < 6 ? '1px solid var(--border)' : 'none',
                            position:'relative',
                            outline: isToday ? '2.5px solid var(--yellow)' : 'none',
                            outlineOffset: isToday ? '-2.5px' : undefined,
                            borderRadius: isToday ? 3 : 0,
                            opacity: isDone && day.type === 'rest' ? 1 : undefined,
                          }}>
                            {isDone && (
                              <div style={{ position:'absolute', top:4, right:4, width:14, height:14, borderRadius:'50%', background:'var(--teal)', color:'#fff', fontSize:8, fontWeight:700, lineHeight:'14px', textAlign:'center' }}>✓</div>
                            )}
                            <div className="d-lbl" style={{ fontSize:9, fontWeight:600, letterSpacing:'.5px', textTransform:'uppercase', marginBottom:1 }}>{DL[di]}</div>
                            <div style={{ fontSize:9, color:'var(--muted2)', marginBottom:4, fontWeight:300, lineHeight:1 }}>{dateStr}</div>
                            <div style={{ fontSize:15, marginBottom:4, display:'block', lineHeight:1 }}>{IC[day.type]||'·'}</div>
                            <div className="d-main" style={{ fontSize:10, fontWeight:500, lineHeight:1.3 }}>{day.label}</div>
                            {day.detail && <div style={{ fontSize:9, color:'var(--muted2)', marginTop:2, lineHeight:1.3, fontWeight:300 }}>{day.detail}</div>}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Finish banner */}
        <div style={{ marginTop:'2rem', padding:'2.5rem', border:'1px solid rgba(81,192,183,.35)', borderRadius:16, background:'linear-gradient(135deg,rgba(81,192,183,.07) 0%,transparent 60%)', textAlign:'center' }}>
          <span style={{ fontSize:'2.5rem', marginBottom:'.75rem', display:'block' }}>🐚</span>
          <div style={{ fontSize:'1.3rem', fontWeight:700, color:'var(--text)', marginBottom:'.4rem' }}>Camino Portugués de la Costa</div>
          <div style={{ fontSize:12, color:'var(--muted)', fontWeight:300 }}>13 – 20 de octubre 2026 · Baiona → Santiago de Compostela</div>
        </div>
      </div>
    </Layout>
  )
}
