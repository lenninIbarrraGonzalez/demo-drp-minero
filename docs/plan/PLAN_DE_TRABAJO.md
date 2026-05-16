# Plan de Trabajo — Demo ERP Minero

## Contexto

Demo técnico para entrevista de trabajo que demuestra experiencia frontend de 3–5 años.
Cada etapa termina con pruebas unitarias, code review y commit.

---

## Stack Tecnológico

| Pieza | Rol |
|---|---|
| React + TypeScript | Base |
| Zustand | Auth state + filtros globales + mina seleccionada |
| TanStack Query | Fetch a MetalpriceAPI, FRED y endpoints MSW |
| TanStack Table | Tabla de operaciones y equipos |
| React Hook Form | Login + formulario de equipos |
| Styled Components | Todo el styling (solo dark theme) |
| Recharts | Gráficos del dashboard |
| MSW | Mock del backend operativo |
| Vitest + RTL | Pruebas unitarias |
| Vite | Bundler |

---

## Fuentes de Datos

| Fuente | Tipo | Datos |
|---|---|---|
| MetalpriceAPI | API real | Precios actuales e históricos de oro, cobre, litio |
| FRED API | API real | Índice macroeconómico de producción minera |
| MSW | Mock | Turnos, equipos, inventario operativo |

---

## Arquitectura

**Estructura de carpetas**: Feature-based con Atomic Design solo en `shared/components`.

**Patrón de capas por feature**: `service → hook → component`
- **Service**: función pura que hace la llamada HTTP. Sin React, sin hooks. Testeable de forma aislada.
- **Hook**: envuelve el service con TanStack Query o Zustand. Gestiona cache, loading, error.
- **Component**: consume el hook. Sin llamadas directas a APIs.

```
src/
├── features/
│   ├── auth/
│   │   ├── components/       # LoginForm
│   │   ├── hooks/            # useLogin.ts
│   │   ├── services/         # authService.ts (llamada HTTP login)
│   │   ├── store/            # authStore.ts (Zustand)
│   │   └── types/            # User, Credentials
│   ├── dashboard/
│   │   ├── components/       # KPICard, PriceChart, ProductionChart
│   │   ├── hooks/            # useMetalPrices.ts, useProduction.ts
│   │   ├── services/         # metalpriceService.ts, fredService.ts
│   │   └── types/            # MetalPrice, ProductionData
│   ├── operations/
│   │   ├── components/       # ShiftsTable, ShiftFilters
│   │   ├── hooks/            # useShifts.ts
│   │   ├── services/         # shiftsService.ts
│   │   └── types/            # Shift, ShiftStatus
│   └── equipment/
│       ├── components/       # EquipmentTable, EquipmentForm
│       ├── hooks/            # useEquipment.ts, useEquipmentMutations.ts
│       ├── services/         # equipmentService.ts (CRUD)
│       ├── store/            # equipmentFiltersStore.ts
│       └── types/            # Equipment, EquipmentStatus
├── shared/
│   ├── components/
│   │   ├── atoms/            # Button, Input, Badge, Spinner, Label
│   │   ├── molecules/        # FormField, Modal, Dropdown
│   │   └── organisms/        # Sidebar, Header, PageLayout
│   ├── hooks/                # useDebounce.ts, usePagination.ts
│   ├── services/             # apiClient.ts (axios wrapper base)
│   ├── mocks/                # MSW handlers
│   └── types/                # tipos globales, ApiResponse<T>
└── app/
    ├── router/               # rutas, ProtectedRoute
    ├── providers/            # QueryProvider, ThemeProvider
    └── styles/               # theme.ts, GlobalStyles, styled.d.ts
```

**Carpeta espejo de tests**:

```
tests/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   ├── dashboard/
│   │   ├── hooks/
│   │   └── services/
│   ├── operations/
│   │   ├── hooks/
│   │   └── services/
│   └── equipment/
│       ├── components/
│       ├── hooks/
│       └── services/
└── shared/
    ├── components/
    ├── hooks/
    └── services/
```

---

## Principios SOLID aplicados al frontend

| Principio | Cómo aplica en este proyecto |
|---|---|
| **S — Single Responsibility** | Cada capa tiene una sola razón para cambiar: el service maneja HTTP, el hook maneja cache/estado, el componente maneja render. Si cambia la API, solo cambia el service. |
| **O — Open/Closed** | Los componentes se extienden via props (`variant`, `size`) sin modificar el código base. Styled Components con variantes en lugar de condicionales anidados. |
| **L — Liskov Substitution** | Los componentes aceptan interfaces bien definidas — cualquier `Button` variant es intercambiable sin romper el layout. Los services implementan contratos de tipos (`Equipment`, `Shift`). |
| **I — Interface Segregation** | Los hooks exponen solo lo que el componente necesita: `useEquipment` da `{ data, isLoading, isError }`, no el QueryClient completo. Los stores exponen selectores específicos. |
| **D — Dependency Inversion** | Los componentes dependen de hooks (abstracciones), no de servicios concretos. Los hooks dependen de interfaces de tipos, no de implementaciones de fetch. MSW puede reemplazar la API real sin cambiar un componente. |

---

## Decisiones de Diseño

- Solo **dark theme** — sin light mode ni toggle
- Sin **multiidioma** — solo español
- **Styled Components** para todo el styling
- Auth **simulada** con MSW — login con React Hook Form, usuario en Zustand

---

## Reglas de Git

- Conventional Commits: `<tipo>(<scope>): <descripción>`
- Branch naming: `<tipo>/<descripcion-en-kebab-case>`
- Scopes del proyecto: `auth`, `dashboard`, `operations`, `equipment`, `shared`, `theme`, `tests`, `mocks`, `store`, `router`
- Un cambio lógico por commit
- Ningún commit, PR ni comentario menciona Claude, IA ni herramientas de generación
- `.gitignore` incluye `.claude/` y archivos relacionados

---

## Workflow de Colaboración

Al terminar cada etapa:
1. Se explica qué se implementó, qué decisiones se tomaron y por qué
2. Se espera preguntas antes de continuar
3. Solo se avanza cuando el usuario da el visto bueno

---

## Paso 0 — Setup de Herramientas ✅

> Sin código de aplicación. Solo configuración del entorno de trabajo.

### Skills creadas
- [x] `erp-minero-commits` — 🟠
- [x] `erp-mining-design` — 🟣
- [x] `erp-mining-testing` — 🟢

### Skills con colores agregados
- [x] Todos los skills activos tienen identificador de color

### MCPs verificados
- [x] `context7` — docs actualizadas de librerías
- [x] `ide getDiagnostics` — errores TypeScript en tiempo real
- [x] `playwright` — validación visual

### Otras tareas
- [x] Crear las 3 skills con `skill-creator`
- [x] Ejecutar `init` para generar `CLAUDE.md` del proyecto
- [x] Ejecutar `fewer-permission-prompts`
- [x] Verificar conexión MCPs

---

## Etapa 1 — Scaffolding + Sistema de Tema ✅

### Qué incluye

- [x] Inicializar proyecto con Vite + React + TypeScript
- [x] Instalar todas las dependencias del stack
- [x] Crear estructura de carpetas feature-based completa
- [x] `.gitignore` con entradas para `.claude/`, archivos generados, `.env`
- [x] Configurar Styled Components: `theme.ts` (tokens dark), `GlobalStyles`, `styled.d.ts`
- [x] Configurar React Router, QueryClient, providers
- [x] Layout base: sidebar fijo + área de contenido
- [x] `shared/services/apiClient.ts` — axios wrapper base con baseURL, headers, interceptores de error
- [x] `shared/hooks/useDebounce.ts`
- [x] `shared/hooks/usePagination.ts`
- [x] `shared/types/api.ts` — `ApiResponse<T>`, `PaginatedResponse<T>`, `ApiError`

### Pruebas

- [x] `tests/shared/hooks/useDebounce.test.ts` — debounce retrasa el valor
- [x] `tests/shared/hooks/usePagination.test.ts` — nextPage, prevPage, reset
- [x] `tests/shared/services/apiClient.test.ts` — headers correctos, manejo de errores

### Cierre

- [ ] `simplify`
- [ ] code review
- [x] commit: `feat(theme): project scaffolding and dark theme system`

---

## Etapa 2 — Feature Auth ✅

### Qué incluye

- [x] Zustand auth slice: usuario, login, logout
- [x] `LoginForm` con React Hook Form + validaciones
- [x] Ruta protegida: redirect a login si no hay sesión
- [x] MSW handler para endpoint de login simulado
- [x] `auth/services/authService.ts` — `login(credentials): Promise<User>`, `logout(): Promise<void>`
- [x] `auth/hooks/useLogin.ts` — TanStack Query mutation que llama `authService.login`, guarda en Zustand on success

### Pruebas

- [x] `tests/features/auth/services/authService.test.ts` — login exitoso, credenciales inválidas
- [x] `tests/features/auth/hooks/useLogin.test.ts` — mutation states, guarda usuario en store
- [x] `tests/features/auth/components/LoginForm.test.tsx` — validaciones, submit
- [x] Auth store — estado inicial, login, logout, reset entre tests

### Cierre

- [x] `simplify`
- [x] code review
- [x] commit: `feat(auth): simulated auth with protected routes`

---

## Etapa 3 — Shared Component Library ✅

### Qué incluye

**Atoms:**
- [x] `Button`
- [x] `Input`
- [x] `Badge`
- [x] `Spinner`
- [x] `Label`

**Molecules:**
- [x] `FormField`
- [x] `Modal`
- [x] `Dropdown`

**Organisms:**
- [x] `Sidebar`
- [x] `Header`
- [x] `PageLayout`

### Pruebas

- [x] Cada atom: renders, variantes de props, eventos
- [x] `FormField` — composición label + input + error
- [x] `Sidebar` — navegación activa resalta el ítem correcto
- [x] `Modal` — portal, close button, aria-modal en ModalCard
- [x] `Dropdown` — opciones, values, disabled
- [x] `Header` — nombre de usuario, logout limpia el store

### Cierre

- [x] `simplify`
- [x] code review
- [x] commit: `feat(shared): atomic design component library`

---

## Etapa 4 — Feature Dashboard ✅

### Qué incluye

- [x] `KPICard` con precio actual y variación
- [x] Gráfico de línea (Recharts): histórico de precios
- [x] Gráfico de barras: producción mensual (MSW mock)
- [x] Zustand: mina seleccionada filtra los datos
- [x] `dashboard/services/metalpriceService.ts` — `getCurrentPrices()`, `getHistoricalPrices(metal, days)`
- [x] `dashboard/services/fredService.ts` — `getMiningProductionIndex()`
- [x] `dashboard/services/productionService.ts` — `getMonthlyProduction(mineId)` (MSW)
- [x] `dashboard/hooks/useMetalPrices.ts` — TanStack Query, staleTime 5min
- [x] `dashboard/hooks/usePriceHistory.ts` — TanStack Query con parámetro `metal`
- [x] `dashboard/hooks/useProduction.ts` — TanStack Query, filtra por mina seleccionada de Zustand

### Pruebas

- [x] `tests/features/dashboard/services/metalpriceService.test.ts` — estructura de respuesta
- [x] `tests/features/dashboard/hooks/useMetalPrices.test.tsx` — loading, success, error
- [x] `tests/features/dashboard/hooks/useProduction.test.tsx` — filtra por mineId
- [x] `tests/features/dashboard/components/KPICard.test.tsx` — valor, delta positivo/negativo

### Cierre

- [x] `simplify`
- [x] code review
- [x] commit: `feat(dashboard): real metal prices and production charts`

---

## Etapa 5 — Feature Operaciones ✅

### Qué incluye

- [x] TanStack Table: columnas, sort, filter, paginación
- [x] `ShiftFilters` conectado a Zustand (filtros globales)
- [x] Estados: loading skeleton, error, empty state
- [x] `operations/services/shiftsService.ts` — `getShifts(params: ShiftParams): Promise<PaginatedResponse<Shift>>`
- [x] `operations/hooks/useShifts.ts` — TanStack Query con params de paginación y filtros desde Zustand

### Pruebas

- [x] `tests/features/operations/services/shiftsService.test.ts` — paginación, parámetros de filtro
- [x] `tests/features/operations/hooks/useShifts.test.tsx` — cambia de página, aplica filtros
- [x] `tests/features/operations/components/ShiftsTable.test.tsx` — sort modifica el orden, skeleton, empty state

### Cierre

- [x] `simplify`
- [x] code review
- [x] commit: `feat(operations): shifts table with filtering and pagination`

---

## Etapa 6 — Feature Equipos

### Qué incluye

- [ ] TanStack Table para listado
- [ ] `EquipmentForm` con React Hook Form + validaciones complejas
- [ ] Badge de estado: operativo / mantenimiento / fuera de servicio
- [ ] `equipment/services/equipmentService.ts` — `getEquipment()`, `createEquipment()`, `updateEquipment()`, `deleteEquipment()`
- [ ] `equipment/hooks/useEquipment.ts` — TanStack Query para el listado
- [ ] `equipment/hooks/useEquipmentMutations.ts` — mutations create/update/delete con `invalidateQueries`

### Pruebas

- [ ] `tests/features/equipment/services/equipmentService.test.ts` — cada operación CRUD
- [ ] `tests/features/equipment/hooks/useEquipment.test.ts` — lista, loading, error
- [ ] `tests/features/equipment/hooks/useEquipmentMutations.test.ts` — cada mutation invalida el cache
- [ ] `tests/features/equipment/components/EquipmentForm.test.tsx` — validaciones, submit, reset

### Cierre

- [ ] `simplify`
- [ ] code review
- [ ] commit: `feat(equipment): full CRUD with form validation`

---

## Etapa 7 — Integración Final + QA

### Qué incluye

- [ ] Playwright: flujo completo login → dashboard → operaciones → crear equipo
- [ ] Revisión de consistencia visual con skill `erp-mining-design`
- [ ] `security-review` del proyecto
- [ ] README con instrucciones de arranque y decisiones técnicas

### Cierre

- [ ] code review final
- [ ] commit: `chore: final integration, e2e tests and documentation`

---

## Flujo Completo

```
Paso 0:  Skills + MCPs + CLAUDE.md        ✅
   ↓
Etapa 1: Scaffolding + Theme      → tests → review → commit  ✅
   ↓
Etapa 2: Auth                     → tests → review → commit  ✅
   ↓
Etapa 3: Shared Components        → tests → review → commit  ✅
   ↓
Etapa 4: Dashboard                → tests → review → commit  ✅
   ↓
Etapa 5: Operaciones              → tests → review → commit  ✅
   ↓
Etapa 6: Equipos                  → tests → review → commit
   ↓
Etapa 7: QA + Playwright + Docs   → review → commit final
```
