import fs from 'fs';
import path from 'path';

interface PageConfig {
  titulo: string;
  categoria: string;
  slug: string;
  generado: boolean;
}

const CONTENT_DIR = path.join(process.cwd(), 'content');
const PAGES_JSON_PATH = path.join(CONTENT_DIR, 'pages.json');
const POSTS_DIR = path.join(CONTENT_DIR, 'posts');

async function generateContentWithAI(titulo: string, categoria: string): Promise<string> {
  console.log(`🤖 Generando contenido para: "${titulo}" en categoría "${categoria}"`);
  
  const content = `
# ${titulo}

## Introducción

Este artículo te guiará a través de todo lo que necesitas saber sobre ${titulo.toLowerCase()}.

## ¿Qué es ${titulo.split(' ').slice(-1)[0]}?

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Características principales

- **Característica 1**: Descripción detallada de la primera característica importante.
- **Característica 2**: Explicación de la segunda característica clave.
- **Característica 3**: Detalles sobre la tercera característica esencial.

## Cómo empezar

1. **Paso 1**: Primer paso para comenzar
2. **Paso 2**: Segundo paso importante
3. **Paso 3**: Tercer paso fundamental

## Mejores prácticas

### Práctica 1
Descripción detallada de la primera mejor práctica que debes seguir.

### Práctica 2
Explicación de la segunda mejor práctica recomendada.

### Práctica 3
Detalles sobre la tercera mejor práctica esencial.

## Ejemplos prácticos

\`\`\`javascript
// Ejemplo de código
const ejemplo = {
  nombre: "${titulo}",
  categoria: "${categoria}",
  activo: true
};

console.log(ejemplo);
\`\`\`

## Errores comunes a evitar

- **Error 1**: Descripción del primer error común
- **Error 2**: Explicación del segundo error frecuente
- **Error 3**: Detalles del tercer error típico

## Recursos adicionales

- Recurso 1: Enlace o descripción
- Recurso 2: Enlace o descripción
- Recurso 3: Enlace o descripción

## Conclusión

En resumen, ${titulo.toLowerCase()} es una herramienta/concepto fundamental en ${categoria}. Siguiendo las mejores prácticas y evitando los errores comunes, podrás aprovechar al máximo sus capacidades.

---

*Última actualización: ${new Date().toLocaleDateString('es-ES')}*
`;

  return content.trim();
}

async function generateMarkdownFiles() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  const pagesData: PageConfig[] = JSON.parse(
    fs.readFileSync(PAGES_JSON_PATH, 'utf-8')
  );

  let generatedCount = 0;

  for (const page of pagesData) {
    if (page.generado) {
      console.log(`⏭️  Saltando "${page.titulo}" - ya generado`);
      continue;
    }

    const categoryDir = path.join(POSTS_DIR, page.categoria);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    const filePath = path.join(categoryDir, `${page.slug}.md`);

    const content = await generateContentWithAI(page.titulo, page.categoria);

    const frontmatter = `---
title: "${page.titulo}"
categoria: "${page.categoria}"
slug: "${page.slug}"
fecha: "${new Date().toISOString()}"
descripcion: "Guía completa sobre ${page.titulo}"
keywords: "${page.categoria}, ${page.slug.split('-').join(', ')}"
---

${content}`;

    fs.writeFileSync(filePath, frontmatter, 'utf-8');
    console.log(`✅ Generado: ${page.categoria}/${page.slug}.md`);

    page.generado = true;
    generatedCount++;
  }

  fs.writeFileSync(PAGES_JSON_PATH, JSON.stringify(pagesData, null, 2), 'utf-8');

  console.log(`\n🎉 Proceso completado: ${generatedCount} páginas generadas`);
}

generateMarkdownFiles().catch(console.error);
