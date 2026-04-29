# 🚀 Inicio Rápido - GetStartedHub

## Paso 1: Instalar Dependencias

```bash
npm install
```

## Paso 2: Configurar Variables de Entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env con tus credenciales
# - AWS_ACCESS_KEY_ID
# - AWS_SECRET_ACCESS_KEY  
# - S3_BUCKET_NAME
# - NEXT_PUBLIC_ADSENSE_CLIENT_ID
```

## Paso 3: Generar Contenido

```bash
npm run generate:content
```

Esto creará archivos `.md` en `content/posts/` basados en `content/pages.json`.

## Paso 4: Probar Localmente

```bash
npm run dev
```

Abre http://localhost:3000

## Paso 5: Build y Deploy

```bash
# Build estático
npm run build

# Deploy a S3
npm run deploy:s3
```

## 📝 Agregar Más Páginas

1. Edita `content/pages.json`:

```json
{
  "titulo": "Nueva Guía",
  "categoria": "tutoriales",
  "slug": "nueva-guia",
  "generado": false
}
```

2. Ejecuta:

```bash
npm run generate:content
npm run build
npm run deploy:s3
```

## 🤖 Integrar con IA

Edita `scripts/generate-content.ts` en la función `generateContentWithAI()` para conectar con tu API de IA.

## ⚙️ Configurar AdSense

1. Obtén tu ID de cliente de Google AdSense
2. Actualiza `NEXT_PUBLIC_ADSENSE_CLIENT_ID` en `.env`
3. Reemplaza `data-ad-slot` en:
   - `app/page.tsx` (líneas 35, 125)
   - `app/[categoria]/[slug]/page.tsx` (líneas 72, 99, 132, 159)

## 📅 Automatización Diaria

### GitHub Actions (Recomendado)

Crea `.github/workflows/daily-update.yml`:

```yaml
name: Daily Update
on:
  schedule:
    - cron: '0 2 * * *'
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run daily:update
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

Agrega los secrets en GitHub:
- Settings → Secrets → Actions → New repository secret

## 🎨 Personalizar

- **Colores**: Edita `app/globals.css`
- **Componentes**: Usa `npx shadcn@latest add [component]`
- **Logo**: Reemplaza archivos en `public/`

## 📊 Estructura de URLs

- Homepage: `/`
- Artículos: `/{categoria}/{slug}`
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`

## ✅ Checklist de Deploy

- [ ] Dependencias instaladas
- [ ] Variables de entorno configuradas
- [ ] Contenido generado
- [ ] AdSense configurado
- [ ] S3 bucket creado y configurado
- [ ] Build exitoso
- [ ] Deploy a S3 exitoso
- [ ] Verificar sitio en producción
- [ ] Configurar automatización diaria

## 🆘 Problemas Comunes

**Error: Cannot find module 'gray-matter'**
```bash
npm install
```

**Error: S3 Access Denied**
- Verifica credenciales AWS en `.env`
- Verifica permisos del bucket S3

**Páginas no se generan**
- Verifica que `generado: false` en `pages.json`
- Revisa logs de `npm run generate:content`

**AdSense no aparece**
- Verifica `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
- Espera aprobación de Google AdSense
- Verifica que el sitio esté en producción

## 📚 Más Información

Ver `README.md` para documentación completa.
