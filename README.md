# GetStartedHub - Sistema de Generación Automática de Contenido

Sistema automatizado para generar y publicar páginas de contenido optimizadas para AdSense, construido con Next.js 16, shadcn/ui y deploy automático a S3.

## 🚀 Características

- ✅ Generación automática de contenido desde JSON
- ✅ Páginas estáticas optimizadas para SEO
- ✅ Integración completa con Google AdSense
- ✅ Deploy automático a AWS S3
- ✅ Sitemap.xml y robots.txt automáticos
- ✅ UI moderna con shadcn/ui
- ✅ Rutas dinámicas por categoría

## 📋 Requisitos

- Node.js 20+
- npm o yarn
- Cuenta de AWS (para deploy a S3)
- Cuenta de Google AdSense

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Copiar archivo de configuración
cp .env.example .env

# Editar .env con tus credenciales
```

## ⚙️ Configuración

### 1. Variables de Entorno

Edita `.env` con tus credenciales:

```env
AWS_ACCESS_KEY_ID=tu_access_key
AWS_SECRET_ACCESS_KEY=tu_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=getstartedhub

NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXX
```

### 2. Configurar Google AdSense

1. Obtén tu ID de cliente de AdSense
2. Actualiza `NEXT_PUBLIC_ADSENSE_CLIENT_ID` en `.env`
3. Reemplaza los `data-ad-slot` en:
   - `app/page.tsx`
   - `app/[categoria]/[slug]/page.tsx`

### 3. Agregar Páginas

Edita `content/pages.json`:

```json
[
  {
    "titulo": "Tu título aquí",
    "categoria": "nombre-categoria",
    "slug": "url-amigable",
    "generado": false
  }
]
```

## 📝 Uso

### Generar Contenido

```bash
# Generar archivos MD de páginas no generadas
npm run generate:content
```

Esto:

- Lee `content/pages.json`
- Genera archivos `.md` en `content/posts/{categoria}/{slug}.md`
- Marca las páginas como generadas
- Usa IA para crear contenido (actualmente placeholder, integra tu API de IA)

### Desarrollo Local

```bash
npm run dev
```

Visita `http://localhost:3000`

### Build y Deploy

```bash
# Build estático
npm run build

# Deploy a S3
npm run deploy:s3

# O todo junto
npm run daily:update
```

## 🏗️ Estructura del Proyecto

```
getstartedhub/
├── app/
│   ├── [categoria]/
│   │   └── [slug]/
│   │       └── page.tsx          # Página dinámica de artículos
│   ├── layout.tsx                # Layout principal con AdSense
│   ├── page.tsx                  # Homepage
│   ├── sitemap.ts                # Sitemap automático
│   └── robots.ts                 # Robots.txt
├── components/
│   └── ui/                       # Componentes shadcn/ui
├── content/
│   ├── pages.json                # Configuración de páginas
│   └── posts/                    # Archivos MD generados
│       └── {categoria}/
│           └── {slug}.md
├── lib/
│   ├── markdown.ts               # Utilidades para leer MD
│   └── utils.ts                  # Utilidades shadcn
├── scripts/
│   ├── generate-content.ts       # Script de generación
│   └── deploy-s3.ts              # Script de deploy
└── .env.example                  # Variables de entorno
```

## 🤖 Integración con IA

El script `scripts/generate-content.ts` tiene una función `generateContentWithAI()` que actualmente genera contenido placeholder.

Para integrar con tu sistema de agentes IA:

```typescript
async function generateContentWithAI(
  titulo: string,
  categoria: string,
): Promise<string> {
  // Aquí integra tu API de IA
  const response = await fetch("https://tu-api-ia.com/generate", {
    method: "POST",
    body: JSON.stringify({ titulo, categoria }),
  });

  return await response.text();
}
```

## 📊 SEO y AdSense

### Ubicación de Anuncios

Cada página de artículo tiene **4 bloques de AdSense**:

1. Antes del contenido (header)
2. Después del título (mid-content)
3. Después del contenido principal
4. Al final de la página (footer)

La homepage tiene **2 bloques**:

1. Después del header
2. Al final del contenido

### SEO Automático

- ✅ Meta tags dinámicos por página
- ✅ Open Graph tags
- ✅ Sitemap.xml generado automáticamente
- ✅ Robots.txt optimizado
- ✅ URLs amigables por categoría

## 🚀 Deploy a S3

El script `deploy-s3.ts`:

1. Limpia el bucket S3
2. Sube todos los archivos de `out/`
3. Configura cache headers apropiados
4. Muestra la URL final

### Configurar S3 Bucket

1. Crea un bucket en AWS S3
2. Habilita "Static website hosting"
3. Configura permisos públicos
4. Opcional: Configura CloudFront para CDN

## 📅 Automatización Diaria

Para ejecutar automáticamente cada día:

### Con Cron (Linux/Mac)

```bash
crontab -e

# Agregar:
0 2 * * * cd /ruta/a/getstartedhub && npm run daily:update
```

### Con Task Scheduler (Windows)

1. Abre Task Scheduler
2. Crea nueva tarea
3. Trigger: Diario a las 2 AM
4. Action: `npm run daily:update`

### Con GitHub Actions

Crea `.github/workflows/daily-update.yml`:

```yaml
name: Daily Content Update
on:
  schedule:
    - cron: "0 2 * * *"
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "20"
      - run: npm install
      - run: npm run daily:update
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

## 🎨 Personalización

### Cambiar Tema

Edita `app/globals.css` para modificar colores:

```css
:root {
  --primary: 0 0% 9%;
  --secondary: 0 0% 96.1%;
  /* etc... */
}
```

### Agregar Componentes shadcn/ui

```bash
npx shadcn@latest add [component-name]
```

## 📄 Licencia

MIT

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor abre un issue primero para discutir cambios mayores.
