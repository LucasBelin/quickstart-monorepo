# Monorepo

This repository contains a NestJS API and a React frontend.

## Tech stack

### API

- NestJS 12 and TypeScript
- PostgreSQL 17
- TypeORM for database access and migrations
- `@nestjs/swagger` for OpenAPI documentation
- Vitest and Oxlint for tests and linting

### Frontend

- React 19 and TypeScript
- Vite 8
- TanStack React Query for server-state management
- Axios for HTTP requests
- Orval to generate typed API clients and React Query hooks from OpenAPI
- Tailwind CSS 4

## Run locally

Start PostgreSQL from the repository root:

```sh
docker compose -f api/docker/docker-compose.yml up -d
```

In one terminal, start the API:

```sh
cd api
npm install
npm run dev
```

In another terminal, start the frontend:

```sh
cd front
npm install
npm run dev
```

The API listens on `http://localhost:3000`. PostgreSQL connection settings can
be overridden with `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, and
`PGPASSWORD`. `FRONTEND_ORIGIN` sets the allowed CORS origin (defaults to
`http://localhost:5173`).

## Database migrations

TypeORM entities are registered in the API datasource at
[`api/src/database/appdatasource.ts`](./api/src/database/appdatasource.ts).
With PostgreSQL running and the entity metadata updated, generate a migration
from the `api` directory. The datasource loads compiled entity files, so build
first to ensure migration generation sees the current entities:

```sh
npm run build
npm run migration:generate
```

The current script writes timestamped migration files under
`api/src/database/migrations/` using the `schema-update` name. Review the
generated SQL before applying it. Migrations are applied automatically when
the API starts; they are not generated automatically.

Schema generation compares registered entity metadata with the database. A
removed entity may not describe how to drop its old table, so write an explicit
migration for that schema change when necessary. Do not remove migrations that
have already been applied to a shared database.

## Generate frontend API interfaces

The API exposes Swagger UI at `http://localhost:3000/api` and its OpenAPI JSON
at `http://localhost:3000/api-json`. Orval reads that JSON URL, so start the API
first. Then, from the `front` directory, run:

```sh
npm run api:generate
```

Generated API functions, React Query hooks, and models are written to
`front/src/api/generated/`. Update the API controllers and DTOs first, then
regenerate the frontend client.

## Checks

Run API checks from `api`:

```sh
npm test
npm run test:e2e
npm run lint
```

Run frontend checks from `front`:

```sh
npm run build
npm run lint
```
