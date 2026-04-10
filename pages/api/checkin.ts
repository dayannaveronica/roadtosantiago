// pages/api/checkin.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // ── CORS: allow public read, protected write ────────────────
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-write-key')

  if (req.method === 'OPTIONS') return res.status(200).end()

  // ── POST: write a check-in (requires secret key) ────────────
  if (req.method === 'POST') {
    const writeKey = req.headers['x-write-key']

    if (!writeKey || writeKey !== process.env.WRITE_KEY) {
      return res.status(401).json({ error: 'No autorizado' })
    }

    const { dayId, activityDone, physical, emotional, note, date } = req.body

    if (!dayId || !date) {
      return res.status(400).json({ error: 'Faltan campos requeridos: dayId y date' })
    }

    // Basic sanitization
    const entry = {
      dayId:        String(dayId).slice(0, 50),
      activityDone: Boolean(activityDone),
      physical:     String(physical  || '').slice(0, 100),
      emotional:    String(emotional || '').slice(0, 100),
      note:         String(note      || '').slice(0, 1000),
      date:         String(date).slice(0, 10),
      updatedAt:    new Date().toISOString(),
    }

    await kv.set(`checkin:${entry.date}`, JSON.stringify(entry))
    await kv.zadd('checkins:index', { score: new Date(entry.date).getTime(), member: entry.date })

    return res.status(200).json({ ok: true })
  }

  // ── GET: read check-ins (public — anyone can see progress) ──
  if (req.method === 'GET') {
    const { date, limit = '200' } = req.query

    if (date) {
      const raw = await kv.get(`checkin:${date}`)
      return res.status(200).json(raw ? JSON.parse(raw as string) : null)
    }

    // Get last N check-ins
    const dates = await kv.zrange(
      'checkins:index', 0, parseInt(limit as string) - 1, { rev: true }
    )

    const entries = await Promise.all(
      (dates as string[]).map(async d => {
        const raw = await kv.get(`checkin:${d}`)
        return raw ? JSON.parse(raw as string) : null
      })
    )

    return res.status(200).json(entries.filter(Boolean))
  }

  res.status(405).json({ error: 'Método no permitido' })
}
