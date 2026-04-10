// lib/plan.ts
// Full 26-week training plan for Camino Portugués

export type ActivityType = 'walk' | 'bike' | 'str' | 'rest' | 'sun'

export interface DayActivity {
  type: ActivityType
  label: string
  detail: string
}

export interface Week {
  n: string
  dates: string
  tag?: string
  tagColor?: string
  days: DayActivity[]
}

export interface Phase {
  index: number
  title: string
  subtitle: string
  dates: string
  weeks: number
  color: string
  exercises: string[]
  tip: string
  weekData: Week[]
}

export const PLAN_START = new Date(2026, 3, 13) // 13 Apr 2026

export const PHASES: Phase[] = [
  {
    index: 0,
    title: 'Base y activación',
    subtitle: 'Crear hábito · fortalecer articulaciones · sin sobrecarga',
    dates: '13 abr – 24 may',
    weeks: 6,
    color: '#51c0b7',
    exercises: [
      'Sentadilla suave con apoyo — 3 × 12',
      'Puente de glúteos — 3 × 15',
      'Elevación de talón de pie — 3 × 20',
      'Abdominal bajo (dead bug) — 3 × 10',
      'Cuádriceps en pared isométrico — 3 × 30 seg',
      'Rotación de cadera tumbada — 2 × 10 cada lado',
    ],
    tip: 'Si sientes molestia en rodillas, piernas o espalda, para y anota. Antes de la sem 7 ve al fisio.',
    weekData: [
      { n:'Sem 1', dates:'13–19 abr', days:[{type:'walk',label:'Caminar',detail:'30 min'},{type:'str',label:'Fuerza',detail:'30 min'},{type:'walk',label:'Caminar',detail:'35 min'},{type:'str',label:'Fuerza',detail:'30 min'},{type:'bike',label:'Bici',detail:'30 min'},{type:'walk',label:'Caminar',detail:'45 min'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 2', dates:'20–26 abr', days:[{type:'walk',label:'Caminar',detail:'35 min'},{type:'str',label:'Fuerza',detail:'30 min'},{type:'bike',label:'Bici',detail:'35 min'},{type:'str',label:'Fuerza',detail:'30 min'},{type:'rest',label:'Descanso',detail:''},{type:'walk',label:'Salida',detail:'5 km'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 3', dates:'27 abr – 3 may', days:[{type:'walk',label:'Caminar',detail:'40 min'},{type:'str',label:'Fuerza',detail:'35 min'},{type:'bike',label:'Bici',detail:'40 min'},{type:'str',label:'Fuerza',detail:'35 min'},{type:'walk',label:'Caminar',detail:'40 min'},{type:'walk',label:'Salida',detail:'6 km'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 4', dates:'4–10 may', tag:'Descanso activo', tagColor:'#ffde59', days:[{type:'rest',label:'Descanso',detail:''},{type:'bike',label:'Bici suave',detail:'30 min'},{type:'rest',label:'Descanso',detail:''},{type:'bike',label:'Bici suave',detail:'30 min'},{type:'rest',label:'Descanso',detail:''},{type:'walk',label:'Caminar',detail:'4 km'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 5', dates:'11–17 may', days:[{type:'walk',label:'Caminar',detail:'45 min'},{type:'str',label:'Fuerza',detail:'35 min'},{type:'bike',label:'Bici',detail:'45 min'},{type:'str',label:'Fuerza',detail:'35 min'},{type:'walk',label:'Caminar',detail:'45 min'},{type:'walk',label:'Salida',detail:'8 km'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 6', dates:'18–24 may', days:[{type:'walk',label:'Caminar',detail:'50 min'},{type:'str',label:'Fuerza',detail:'35 min'},{type:'bike',label:'Bici',detail:'50 min'},{type:'str',label:'Fuerza',detail:'35 min'},{type:'walk',label:'Caminar',detail:'50 min'},{type:'walk',label:'Salida',detail:'9 km'},{type:'sun',label:'Reposo',detail:''}] },
    ],
  },
  {
    index: 1,
    title: 'Volumen progresivo',
    subtitle: 'Distancias crecientes · mochila · calzado definitivo',
    dates: '25 may – 19 jul',
    weeks: 8,
    color: '#1a4279',
    exercises: [
      'Sentadilla completa sin apoyo — 3 × 15',
      'Zancada estática (lunge) — 3 × 10 cada pierna',
      'Peso muerto rumano con mancuerna ligera — 3 × 12',
      'Plancha frontal — 3 × 40 seg',
      'Bird-dog equilibrio y espalda — 3 × 10 cada lado',
      'Elevación lateral de pierna tumbada — 2 × 15',
    ],
    tip: 'Calzado del Camino desde ya. Mochila: 2 kg en sem 9, sube a 5 kg en sem 13.',
    weekData: [
      { n:'Sem 7',  dates:'25–31 may', days:[{type:'bike',label:'Bici',detail:'45 min'},{type:'str',label:'Fuerza',detail:'40 min'},{type:'walk',label:'Caminar',detail:'8 km'},{type:'str',label:'Fuerza',detail:'40 min'},{type:'bike',label:'Bici',detail:'45 min'},{type:'walk',label:'Salida',detail:'10 km'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 8',  dates:'1–7 jun',   days:[{type:'bike',label:'Bici',detail:'50 min'},{type:'str',label:'Fuerza',detail:'40 min'},{type:'walk',label:'Caminar',detail:'9 km'},{type:'str',label:'Fuerza',detail:'40 min'},{type:'bike',label:'Bici',detail:'50 min'},{type:'walk',label:'Salida',detail:'11 km'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 9',  dates:'8–14 jun',  days:[{type:'bike',label:'Bici',detail:'55 min'},{type:'str',label:'Fuerza',detail:'40 min'},{type:'walk',label:'Caminar',detail:'10 km'},{type:'str',label:'Fuerza',detail:'40 min'},{type:'bike',label:'Bici',detail:'55 min'},{type:'walk',label:'Salida',detail:'12 km · 2 kg'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 10', dates:'15–21 jun', days:[{type:'bike',label:'Bici',detail:'60 min'},{type:'str',label:'Fuerza',detail:'40 min'},{type:'walk',label:'Caminar',detail:'10 km'},{type:'str',label:'Fuerza',detail:'40 min'},{type:'rest',label:'Descanso',detail:''},{type:'walk',label:'Salida',detail:'13 km · 3 kg'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 11', dates:'22–28 jun', days:[{type:'bike',label:'Bici',detail:'60 min'},{type:'str',label:'Fuerza',detail:'40 min'},{type:'walk',label:'Caminar',detail:'11 km'},{type:'str',label:'Fuerza',detail:'40 min'},{type:'bike',label:'Bici',detail:'60 min'},{type:'walk',label:'Salida',detail:'15 km · 4 kg'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 12', dates:'29 jun – 5 jul', days:[{type:'bike',label:'Bici',detail:'60 min'},{type:'str',label:'Fuerza',detail:'40 min'},{type:'walk',label:'Caminar',detail:'12 km'},{type:'str',label:'Fuerza',detail:'40 min'},{type:'bike',label:'Bici',detail:'60 min'},{type:'walk',label:'Salida',detail:'16 km · 4 kg'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 13', dates:'6–12 jul',  days:[{type:'bike',label:'Bici',detail:'60 min'},{type:'str',label:'Fuerza',detail:'40 min'},{type:'walk',label:'Caminar',detail:'13 km'},{type:'str',label:'Fuerza',detail:'40 min'},{type:'bike',label:'Bici',detail:'60 min'},{type:'walk',label:'Salida',detail:'17 km · 5 kg'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 14', dates:'13–19 jul', tag:'Descanso activo', tagColor:'#ffde59', days:[{type:'rest',label:'Descanso',detail:''},{type:'bike',label:'Bici suave',detail:'35 min'},{type:'rest',label:'Descanso',detail:''},{type:'bike',label:'Bici suave',detail:'35 min'},{type:'rest',label:'Descanso',detail:''},{type:'walk',label:'Caminar',detail:'5 km'},{type:'sun',label:'Reposo',detail:''}] },
    ],
  },
  {
    index: 2,
    title: 'Simulación real',
    subtitle: 'Distancias de Camino · días consecutivos · peso completo',
    dates: '20 jul – 13 sep',
    weeks: 8,
    color: '#ff8c61',
    exercises: [
      'Sentadilla búlgara — 2 × 10 cada pierna',
      'Peso muerto con mochila cargada — 2 × 12',
      'Plancha lateral — 2 × 30 seg cada lado',
      'Extensión de cadera en cuadrupedia — 2 × 15',
      'Estiramiento banda iliotibial — diario, 60 seg',
    ],
    tip: 'Los fines de semana de 2 días seguidos simulan el Camino real.',
    weekData: [
      { n:'Sem 15', dates:'20–26 jul', days:[{type:'bike',label:'Recup.',detail:'60 min'},{type:'str',label:'Fuerza',detail:'30 min'},{type:'walk',label:'Caminar',detail:'12 km'},{type:'bike',label:'Bici',detail:'50 min'},{type:'rest',label:'Descanso',detail:''},{type:'walk',label:'Salida',detail:'18 km'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 16', dates:'27 jul – 2 ago', days:[{type:'bike',label:'Recup.',detail:'45 min'},{type:'str',label:'Fuerza',detail:'30 min'},{type:'walk',label:'Caminar',detail:'13 km'},{type:'bike',label:'Bici',detail:'55 min'},{type:'rest',label:'Descanso',detail:''},{type:'walk',label:'Salida',detail:'20 km'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 17', dates:'3–9 ago', tag:'2 días →', tagColor:'#51c0b7', days:[{type:'bike',label:'Recup.',detail:'45 min'},{type:'str',label:'Fuerza',detail:'30 min'},{type:'walk',label:'Caminar',detail:'14 km'},{type:'bike',label:'Bici',detail:'60 min'},{type:'walk',label:'Caminar',detail:'10 km'},{type:'walk',label:'Día 1',detail:'20 km →'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 18', dates:'10–16 ago', tag:'← cont.', tagColor:'#51c0b7', days:[{type:'walk',label:'← Día 2',detail:'15 km'},{type:'bike',label:'Recup.',detail:'40 min'},{type:'str',label:'Fuerza',detail:'30 min'},{type:'bike',label:'Bici',detail:'60 min'},{type:'rest',label:'Descanso',detail:''},{type:'walk',label:'Salida',detail:'21 km'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 19', dates:'17–23 ago', tag:'2 días →', tagColor:'#51c0b7', days:[{type:'bike',label:'Recup.',detail:'45 min'},{type:'str',label:'Fuerza',detail:'30 min'},{type:'walk',label:'Caminar',detail:'14 km'},{type:'bike',label:'Bici',detail:'60 min'},{type:'walk',label:'Caminar',detail:'12 km'},{type:'walk',label:'Día 1',detail:'22 km →'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 20', dates:'24–30 ago', tag:'← cont.', tagColor:'#51c0b7', days:[{type:'walk',label:'← Día 2',detail:'17 km'},{type:'bike',label:'Recup.',detail:'40 min'},{type:'str',label:'Fuerza',detail:'30 min'},{type:'bike',label:'Bici',detail:'60 min'},{type:'rest',label:'Descanso',detail:''},{type:'walk',label:'Salida',detail:'23 km'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 21', dates:'31 ago – 6 sep', tag:'2 días →', tagColor:'#51c0b7', days:[{type:'bike',label:'Recup.',detail:'45 min'},{type:'str',label:'Fuerza',detail:'30 min'},{type:'walk',label:'Caminar',detail:'15 km'},{type:'bike',label:'Bici',detail:'60 min'},{type:'walk',label:'Caminar',detail:'12 km'},{type:'walk',label:'Día 1',detail:'24 km →'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 22', dates:'7–13 sep', tag:'← cont.', tagColor:'#51c0b7', days:[{type:'walk',label:'← Día 2',detail:'18 km'},{type:'bike',label:'Recup.',detail:'40 min'},{type:'str',label:'Fuerza',detail:'30 min'},{type:'bike',label:'Bici',detail:'50 min'},{type:'rest',label:'Descanso',detail:''},{type:'walk',label:'Salida',detail:'25 km'},{type:'sun',label:'Reposo',detail:''}] },
    ],
  },
  {
    index: 3,
    title: 'Reducción y llegada fresca',
    subtitle: 'Bajar volumen · dejar consolidar · preparar equipo',
    dates: '14 sep – 12 oct',
    weeks: 4,
    color: '#ff808b',
    exercises: [
      'Estiramiento de cuádriceps — 60 seg cada pierna',
      'Estiramiento de isquiotibiales sentada — 60 seg',
      'Cadera: figura 4 tumbada — 90 seg cada lado',
      'Rotaciones de tobillo — 20 círculos cada pie',
      'Espalda: gato-vaca — 2 × 10',
    ],
    tip: 'Semana del 6 al 12 oct: solo caminatas de 20 min. Nada nuevo. El descanso es parte del entrenamiento.',
    weekData: [
      { n:'Sem 23', dates:'14–20 sep', days:[{type:'bike',label:'Bici',detail:'45 min'},{type:'rest',label:'Estiram.',detail:'15 min'},{type:'walk',label:'Caminar',detail:'12 km'},{type:'bike',label:'Bici',detail:'40 min'},{type:'rest',label:'Estiram.',detail:'15 min'},{type:'walk',label:'Salida',detail:'15 km'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 24', dates:'21–27 sep', days:[{type:'bike',label:'Bici',detail:'35 min'},{type:'rest',label:'Estiram.',detail:'15 min'},{type:'walk',label:'Caminar',detail:'8 km'},{type:'rest',label:'Estiram.',detail:'15 min'},{type:'bike',label:'Bici',detail:'30 min'},{type:'walk',label:'Caminar',detail:'10 km'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 25', dates:'28 sep – 4 oct', days:[{type:'walk',label:'Caminar',detail:'5 km'},{type:'rest',label:'Estiram.',detail:'15 min'},{type:'bike',label:'Bici',detail:'25 min'},{type:'rest',label:'Estiram.',detail:'15 min'},{type:'walk',label:'Caminar',detail:'4 km'},{type:'rest',label:'Mochila',detail:'check'},{type:'sun',label:'Reposo',detail:''}] },
      { n:'Sem 26', dates:'5–12 oct', tag:'¡Nos vamos!', tagColor:'#51c0b7', days:[{type:'walk',label:'Caminar',detail:'20 min'},{type:'rest',label:'Estiram.',detail:'15 min'},{type:'walk',label:'Caminar',detail:'20 min'},{type:'rest',label:'Descanso',detail:'total'},{type:'rest',label:'Descanso',detail:'total'},{type:'rest',label:'Viaje',detail:'a Baiona'},{type:'sun',label:'Reposo',detail:''}] },
    ],
  },
]

// Flat index of all days
export interface FlatDay {
  phaseIndex: number
  weekIndex: number
  dayIndex: number
  type: ActivityType
  label: string
  detail: string
  id: string
  date: Date
}

export function buildFlatDays(): FlatDay[] {
  const days: FlatDay[] = []
  let offset = 0
  PHASES.forEach((phase, pi) => {
    phase.weekData.forEach((week, wi) => {
      week.days.forEach((day, di) => {
        const date = new Date(PLAN_START)
        date.setDate(date.getDate() + offset)
        days.push({
          phaseIndex: pi, weekIndex: wi, dayIndex: di,
          type: day.type, label: day.label, detail: day.detail,
          id: `d_${pi}_${wi}_${di}`,
          date,
        })
        offset++
      })
    })
  })
  return days
}

export const ALL_DAYS = buildFlatDays()

export function getTodayEntry(): FlatDay | null {
  const today = new Date()
  today.setHours(0,0,0,0)
  return ALL_DAYS.find(d => {
    const dd = new Date(d.date)
    dd.setHours(0,0,0,0)
    return dd.getTime() === today.getTime()
  }) || null
}
