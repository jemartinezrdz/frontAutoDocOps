# frontAutoDocOps

Frontend unificado para AutoDocOps - Interfaz web + iOS + Android

## Descripción

Interfaz unificada que permite a los equipos de desarrollo:
1. Conectar su repositorio y ver la documentación generada
2. Navegar diagramas ER y especificaciones
3. Consultar la API mediante un chat semántico
4. Gestionar proyectos, equipos y ajustes desde cualquier dispositivo

## Stack Tecnológico

- **Expo + React 19** - Código único para nativo y web
- **Expo Router** - Routing file-based + SSR web
- **TypeScript estricto** - Seguridad de tipos end-to-end
- **Tamagui** - Diseño coherente, tokens nativos y web
- **tRPC/react-query** - API tipada sin duplicar DTO
- **Zustand** - Estado simple, persiste sesión
- **Playwright + Vitest** - E2E y unit tests
- **Cloudflare Pages** - Hosting estático global + CDN

## Objetivos de Rendimiento

- First Contentful Paint < 1.5s web EU/US
- Bundle inicial < 150 kB (split chunks)
- Render JS < 60ms por pantalla nativa

## Desarrollo

```bash
# Instalar dependencias
pnpm install

# Desarrollo web
pnpm web

# Desarrollo iOS
pnpm ios

# Desarrollo Android
pnpm android

# Tests
pnpm test

# Build
pnpm build
```

## Ramas

- **main**: Código de producción
- **test**: Código para testing/staging
- **develop**: Desarrollo activo

## Licencia

MIT

