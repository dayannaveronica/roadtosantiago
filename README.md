# 🐚 Road to Santiago — roadtosantiago.dayannaveronica.com

Tu diario personal de preparación para el Camino Portugués de la Costa.

## Stack
- **Next.js 14** (Pages Router)
- **Vercel KV** — base de datos para guardar tus check-ins (gratis)
- **Poppins** — tu tipografía de marca
- Paleta de marca: coral `#ff8c61` · teal `#51c0b7` · navy `#1a4279`

---

## 🚀 Despliegue en Vercel (paso a paso)

### 1. Sube el código a GitHub

```bash
cd roadtosantiago
git init
git add .
git commit -m "init: Road to Santiago"
```

Crea un repo en github.com y luego:
```bash
git remote add origin https://github.com/TU_USUARIO/roadtosantiago.git
git push -u origin main
```

### 2. Despliega en Vercel

1. Ve a [vercel.com](https://vercel.com) → New Project
2. Importa tu repositorio de GitHub
3. Framework preset: **Next.js** (se detecta automáticamente)
4. Haz clic en **Deploy**

### 3. Crea la base de datos KV

1. En tu proyecto de Vercel → pestaña **Storage**
2. **Create Database** → elige **KV**
3. Nombre: `roadtosantiago-db`
4. Haz clic en **Connect to Project**
5. Vercel añade automáticamente las variables de entorno de KV

### 3b. Clave secreta de escritura (protección del diario)

Esto evita que cualquier persona pueda escribir en tu diario.

1. En Vercel → **Settings** → **Environment Variables**
2. Añade estas dos variables:

| Variable | Valor de ejemplo |
|---|---|
| `WRITE_KEY` | `tucontraseña!` (elige la tuya) |
| `NEXT_PUBLIC_WRITE_KEY` | La misma que arriba |

3. Haz clic en **Save** y luego **Redeploy**

> Cualquiera puede **leer** tu progreso (eso es lo que quieres).
> Solo tú puedes **escribir** check-ins con esa clave.

### 4. Conecta tu subdominio

1. En Vercel → Settings → **Domains**
2. Añade: `roadtosantiago.dayannaveronica.com`
3. Ve al panel DNS de tu dominio (donde registraste `dayannaveronica.com`)
4. Añade un registro **CNAME**:
   - **Name:** `roadtosantiago`
   - **Value:** `cname.vercel-dns.com`
5. Espera 5-10 minutos para que propague

### 5. Variables de entorno (ya las pone Vercel al conectar KV)

Vercel conecta automáticamente:
- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

---

## 💻 Desarrollo local

```bash
npm install
```

Para KV en local, crea un archivo `.env.local`:
```
KV_URL=...
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
KV_REST_API_READ_ONLY_TOKEN=...
```

(Copia estos valores desde Vercel → Storage → tu DB → `.env.local` tab)

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## 📁 Estructura del proyecto

```
roadtosantiago/
├── pages/
│   ├── index.tsx      → Hoy: saludo, actividad del día, check-in
│   ├── diario.tsx     → Mi Diario: historial de entradas
│   ├── plan.tsx       → Mi Plan: calendario 26 semanas
│   ├── ruta.tsx       → La Ruta: mapa interactivo por etapa
│   ├── _app.tsx       → App wrapper con tema
│   └── api/
│       └── checkin.ts → API para guardar/leer check-ins
├── components/
│   └── Layout.tsx     → Barra de navegación y layout
├── lib/
│   └── plan.ts        → Datos del plan de entrenamiento
├── styles/
│   └── globals.css    → Estilos globales y variables de marca
└── README.md
```

---

## 🔁 Para adaptar a otra persona

1. En `lib/plan.ts` → cambia `PLAN_START` y el plan si es diferente
2. En `pages/index.tsx` → cambia el nombre "Daya" por el de la persona
3. En `pages/ruta.tsx` → edita las etapas si el Camino es diferente
4. En `styles/globals.css` → cambia los colores de la paleta
5. Despliega como nuevo proyecto en Vercel

---

## 🐚 El Camino
**13 – 20 octubre 2026**  
Baiona → Vigo → Redondela → Pontevedra → Caldas de Reis → Padrón → Santiago de Compostela  
~140 km · 6 etapas · ¡Buen Camino!
