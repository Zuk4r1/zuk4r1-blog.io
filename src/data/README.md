# Directorio de Datos

Este directorio contiene los datos y la lógica de acceso a datos para el blog.

## Estructura

- `posts.ts`: Contiene la definición de tipos y funciones para manejar las publicaciones del blog.
  - Interface `Post`: Define la estructura de una publicación
  - Array `allPosts`: Lista de todas las publicaciones
  - Funciones de utilidad:
    - `getPostById`: Obtiene una publicación por su ID
    - `getAllPosts`: Obtiene todas las publicaciones ordenadas por fecha
    - `getPublishedPosts`: Obtiene solo las publicaciones publicadas
    - `getPostsByTag`: Filtra publicaciones por etiqueta

## Uso

```typescript
import { getAllPosts, getPostById, getPostsByTag } from './posts';

// Obtener todas las publicaciones
const posts = await getAllPosts();

// Obtener una publicación específica
const post = await getPostById('introduccion-hacking-etico');

// Obtener publicaciones por etiqueta
const securityPosts = await getPostsByTag('seguridad');
```

## Notas

- Las fechas deben estar en formato ISO (YYYY-MM-DD)
- Las etiquetas deben estar en minúsculas
- El campo `published` determina si la publicación es visible públicamente