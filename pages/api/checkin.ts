// pages/api/checkin.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { neon } from '@neondatabase/serverless'

async function getDb() {
  const sql = neon(process.env.DATABASE_URL!)

  // Create table if it doesn't exist
  await sql`
    CREATE TABLE IF NOT EXISTS checkins (
      id        SERIAL PRIMARY KEY,
      date      DATE UNIQUE NOT NULL,
      day_id    TEXT NOT NULL,
      activity_done BOOLEAN DEFAULT false,
      physical  TEXT DEFAULT '',
      emotional TEXT DEFAULT '',
      note      TEXT DEFAULT '',
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
  return sql
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // ── CORS ────────────────────────────────────────────────────
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-write-key')
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    const sql = await getDb()

    // ── POST: write a check-in (requires secret key) ──────────
    if (req.method === 'POST') {
      const writeKey = req.headers['x-write-key']
      if (!writeKey || writeKey !== process.env.WRITE_KEY) {
        return res.status(401).json({ error: 'No autorizado' })
      }

      const { dayId, activityDone, physical, emotional, note, date } = req.body
      if (!dayId || !date) {
        return res.status(400).json({ error: 'Faltan campos: dayId y date' })
      }

      await sql`
        INSERT INTO checkins (date, day_id, activity_done, physical, emotional, note, updated_at)
        VALUES (
          ${String(date).slice(0,10)},
          ${String(dayId).slice(0,50)},
          ${Boolean(activityDone)},
          ${String(physical  || '').slice(0,100)},
          ${String(emotional || '').slice(0,100)},
          ${String(note      || '').slice(0,1000)},
          NOW()
        )
        ON CONFLICT (date) DO UPDATE SET
          day_id        = EXCLUDED.day_id,
          activity_done = EXCLUDED.activity_done,
          physical      = EXCLUDED.physical,
          emotional     = EXCLUDED.emotional,
          note          = EXCLUDED.note,
          updated_at    = NOW()
      `
      return res.status(200).json({ ok: true })
    }

    // ── GET: read check-ins (public) ───────────────────────────
    if (req.method === 'GET') {
      const { date, limit = '200' } = req.query

      if (date) {
        const rows = await sql`
          SELECT * FROM checkins WHERE date = ${String(date).slice(0,10)}
        `
        if (!rows.length) return res.status(200).json(null)
        const r = rows[0]
        return res.status(200).json({
          date:         r.date,
          dayId:        r.day_id,
          activityDone: r.activity_done,
          physical:     r.physical,
          emotional:    r.emotional,
          note:         r.note,
        })
      }

      const rows = await sql`
        SELECT * FROM checkins
        ORDER BY date DESC
        LIMIT ${parseInt(limit as string)}
      `
      return res.status(200).json(rows.map(r => ({
        date:         r.date,
        dayId:        r.day_id,
        activityDone: r.activity_done,
        physical:     r.physical,
        emotional:    r.emotional,
        note:         r.note,
      })))
    }

    res.status(405).json({ error: 'Método no permitido' })

  } catch (err: any) {
    console.error('DB error:', err)
    res.status(500).json({ error: 'Error de base de datos', detail: err.message })
  }
}
