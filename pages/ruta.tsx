// pages/ruta.tsx
import { useState } from 'react'
import Layout from '../components/Layout'

const ETAPAS = [
  {
    n:1, fecha:'13 oct', name:'Llegada a Baiona', desde:'Madrid', hasta:'Baiona',
    km:'—', desnivel:'—', tiempo:'—', tipo:'Traslado',
    nota:'Día de llegada. Descansa, recoge la credencial de peregrino y da el primer sello. Aclimatación al Atlántico galego.',
    mapSrc:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11870.8!2d-8.8524!3d42.1201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd02b3e6c44d71f5%3A0x72d94e7062b1d86d!2sBaiona!5e0!3m2!1ses!2ses!4v1'
  },
  {
    n:2, fecha:'14 oct', name:'Baiona → Vigo', desde:'Baiona', hasta:'Vigo',
    km:'25 km', desnivel:'+380 m', tiempo:'6–7 h', tipo:'Caminar',
    nota:'Etapa costera por la ría de Vigo. Perfil suave con vistas continuas al Atlántico. Entrada a Vigo por el barrio marinero de Bouzas.',
    mapSrc:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47000!2d-8.78!3d42.175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd254ebf6dc3dfab%3A0x5d18d38db0de8a5d!2sVigo!5e0!3m2!1ses!2ses!4v1'
  },
  {
    n:3, fecha:'15 oct', name:'Vigo → Redondela', desde:'Vigo', hasta:'Redondela',
    km:'20 km', desnivel:'+290 m', tiempo:'5–6 h', tipo:'Caminar',
    nota:'Las vistas del Puente de Rande son de las más impresionantes del Camino. Descenso suave por bosque gallego hasta Redondela, conocida por sus viaductos.',
    mapSrc:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23500!2d-8.655!3d42.265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd25abe6d93b4931%3A0x5b1cde1b73ddda2e!2sRedondela!5e0!3m2!1ses!2ses!4v1'
  },
  {
    n:4, fecha:'16 oct', name:'Redondela → Pontevedra', desde:'Redondela', hasta:'Pontevedra',
    km:'20 km', desnivel:'+310 m', tiempo:'5–6 h', tipo:'Caminar',
    nota:'Una de las etapas más bonitas del recorrido. La entrada al casco histórico de Pontevedra, completamente peatonal, es un regalo. Merece quedarse a explorar.',
    mapSrc:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23500!2d-8.618!3d42.366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2f8620a6f73a03%3A0x4b8d7e7e1b9d37a9!2sPontevedra!5e0!3m2!1ses!2ses!4v1'
  },
  {
    n:5, fecha:'17 oct', name:'Pontevedra → Caldas de Reis', desde:'Pontevedra', hasta:'Caldas de Reis',
    km:'22 km', desnivel:'+240 m', tiempo:'5–6 h', tipo:'Caminar',
    nota:'Etapa interior entre viñedos de albariño. Terreno suave y bucólico. Caldas de Reis tiene fuentes termales donde puedes remojar los pies después de la jornada.',
    mapSrc:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23500!2d-8.644!3d42.517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2f70d26f3c4efb%3A0x85c64e5a3e5f9b2a!2sCaldas%20de%20Reis!5e0!3m2!1ses!2ses!4v1'
  },
  {
    n:6, fecha:'18 oct', name:'Caldas de Reis → Padrón', desde:'Caldas de Reis', hasta:'Padrón',
    km:'19 km', desnivel:'+180 m', tiempo:'4–5 h', tipo:'Caminar',
    nota:'Tierra de Rosalía de Castro. Padrón es el lugar donde según la tradición llegó el barco con el cuerpo de Santiago. El río Sar ya huele a meta.',
    mapSrc:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23500!2d-8.654!3d42.676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2f639a38e3d6c3%3A0x7a6a3c2c0e8e9a1e!2sPadr%C3%B3n!5e0!3m2!1ses!2ses!4v1'
  },
  {
    n:7, fecha:'19 oct', name:'Padrón → Santiago', desde:'Padrón', hasta:'Santiago de Compostela',
    km:'25 km', desnivel:'+370 m', tiempo:'6–7 h', tipo:'Caminar',
    nota:'La llegada. Sale temprano para llegar a la Plaza del Obradoiro con luz de tarde — la catedral brilla más con el sol de octubre. Cada paso de estos 25 km es el Camino resumido.',
    mapSrc:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23500!2d-8.599!3d42.815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2efe44e9b84bab%3A0x9b4af0c72eb9d7a5!2sSantiago%20de%20Compostela!5e0!3m2!1ses!2ses!4v1'
  },
  {
    n:8, fecha:'20 oct', name:'Cierre · Santiago', desde:'Santiago', hasta:'Madrid',
    km:'—', desnivel:'—', tiempo:'—', tipo:'Celebración 🐚',
    nota:'Misa del Peregrino a las 12:00 — anuncian las nacionalidades de los peregrinos que llegaron ese día. Recoge la Compostela en la Oficina del Peregrino. Abraza al Apóstol. Luego, a Madrid.',
    mapSrc:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-8.5444!3d42.8807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2efe6bdc02c7a7%3A0x5b0e87a6d6e3e3c7!2sCatedral%20de%20Santiago%20de%20Compostela!5e0!3m2!1ses!2ses!4v1'
  },
]

export default function Ruta() {
  const [active, setActive] = useState(0)
  const e = ETAPAS[active]

  return (
    <Layout>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(1rem, 4vw, 2rem) clamp(1rem, 4vw, 2rem) 6rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text)', marginBottom: '.25rem' }}>La Ruta 🗺</h1>
          <p style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 300 }}>Camino Portugués de la Costa · Baiona → Santiago de Compostela</p>
        </div>

        {/* Stage selector */}
        <div style={{ display:'flex', gap:'.5rem', flexWrap:'wrap', marginBottom:'1.5rem' }}>
          {ETAPAS.map((et, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              padding:'.5rem 1rem', borderRadius:40, fontSize:12, fontWeight:500, cursor:'pointer',
              background: active === i ? 'var(--navy)' : 'var(--surface)',
              color: active === i ? '#fff' : 'var(--muted)',
              border: `1px solid ${active === i ? 'var(--navy)' : 'var(--border)'}`,
              transition: 'all .2s',
            }}>
              Día {et.n}
            </button>
          ))}
        </div>

        {/* Layout: map + detail */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'1.5rem' }}>

          {/* Map */}
          <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', height:420, position:'relative', boxShadow:'var(--sh)' }}>
            <iframe key={e.mapSrc} src={e.mapSrc} style={{ width:'100%', height:'100%', border:'none' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <div style={{ position:'absolute', top:'1rem', left:'1rem', background:'rgba(26,66,121,.9)', color:'#fff', padding:'.5rem 1rem', borderRadius:20, fontSize:12, fontWeight:500, backdropFilter:'blur(8px)' }}>
              {e.fecha} · {e.name}
            </div>
          </div>

          {/* Detail */}
          <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:'1.5rem', boxShadow:'var(--sh)' }}>
            <div style={{ fontSize:10, letterSpacing:2, textTransform:'uppercase', fontWeight:600, color:'var(--teal)', marginBottom:'.5rem' }}>
              Día {e.n} · {e.fecha}
            </div>
            <div style={{ fontSize:'1.2rem', fontWeight:700, color:'var(--text)', marginBottom:'.25rem', lineHeight:1.2 }}>{e.name}</div>
            <div style={{ fontSize:12, color:'var(--muted)', fontWeight:300, marginBottom:'1.25rem' }}>
              {e.desde} → {e.hasta}
            </div>

            {[
              { label:'Distancia', value:e.km },
              { label:'Desnivel', value:e.desnivel },
              { label:'Tiempo est.', value:e.tiempo },
              { label:'Tipo', value:e.tipo },
            ].map(row => (
              <div key={row.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'.55rem 0', borderBottom:'1px solid var(--border)' }}>
                <span style={{ fontSize:11, color:'var(--muted)', fontWeight:400 }}>{row.label}</span>
                <span style={{ fontSize:12, fontWeight:600, color:'var(--text)' }}>{row.value}</span>
              </div>
            ))}

            <div style={{ marginTop:'1rem', padding:'.75rem 1rem', background:'rgba(81,192,183,.07)', borderLeft:'3px solid var(--teal)', borderRadius:'0 8px 8px 0', fontSize:12, color:'var(--muted)', lineHeight:1.7, fontWeight:300 }}>
              {e.nota}
            </div>
          </div>
        </div>

        {/* Route overview */}
        <div style={{ marginTop:'1.5rem', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:'1.5rem', boxShadow:'var(--sh)' }}>
          <div style={{ fontSize:10, letterSpacing:2, textTransform:'uppercase', fontWeight:600, color:'var(--navy)', marginBottom:'1rem' }}>Resumen de la ruta</div>
          <div style={{ display:'flex', alignItems:'center', gap:0, overflowX:'auto', paddingBottom:'.5rem' }}>
            {ETAPAS.map((et, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', flexShrink:0 }}>
                <button onClick={() => setActive(i)} style={{
                  display:'flex', flexDirection:'column', alignItems:'center', gap:4,
                  padding:'.5rem .75rem', borderRadius:10, cursor:'pointer',
                  background: active === i ? 'var(--navy)' : 'transparent',
                  border: active === i ? '1px solid var(--navy)' : '1px solid transparent',
                  transition:'all .2s',
                }}>
                  <span style={{ fontSize:11, fontWeight:600, color: active === i ? '#fff' : 'var(--text)' }}>D{et.n}</span>
                  <span style={{ fontSize:9, color: active === i ? 'rgba(255,255,255,.6)' : 'var(--muted)', fontWeight:300, whiteSpace:'nowrap', maxWidth:80, overflow:'hidden', textOverflow:'ellipsis' }}>{et.hasta}</span>
                </button>
                {i < ETAPAS.length - 1 && (
                  <div style={{ width:24, height:1, background:'var(--border)', flexShrink:0 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
