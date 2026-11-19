# Ticket Booking Platform

A NestJS monorepo of microservices for booking event tickets.

## Architecture

| Service       | Type                 | Port | Purpose |
|---------------|----------------------|------|---------|
| `gateway`     | HTTP (REST API)      | 3000 | Public REST API; forwards requests to the TCP services |
| `catalog`     | TCP microservice     | 3001 | Events, seats, users; caches seat availability in Redis |
| `reservation` | TCP microservice     | 3002 | Temporary seat holds with Redis locking |
| `order`       | TCP microservice     | 3003 | Checkout; enqueues ticket delivery jobs |
| `delivery`    | HTTP + BullMQ worker | 3004 | Processes the `ticket-delivery` queue and generates ticket QR codes |

Built with NestJS 11, Prisma 7 (PostgreSQL), Redis (ioredis), BullMQ, JWT, bcrypt.

```
Client ── HTTP──> gateway ── TCP──> catalog / reservation / order
                                                   │
                                            BullMQ (Redis)
                                                   ▼
                                                delivery
```

## Data model

Prisma schema (`prisma/schema.prisma`): `User`, `Event`, `Venue`, `Seat`, `Order`, `Ticket`.

## Requirements

- Node.js 20+
- pnpm
- PostgreSQL
- Redis on `localhost:6379`

## Setup

```bash
pnpm install
cp .env.example .env          # set DATABASE_URL and JWT_SECRET
pnpm prisma:generate
pnpm prisma:migrate:dev
```

Run each service in its own terminal:

```bash
pnpm nest start catalog --watch
pnpm nest start reservation --watch
pnpm nest start order --watch
pnpm nest start delivery --watch
pnpm nest start gateway --watch
```

### Environment variables

| Variable       | Description |
|----------------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET`   | Secret used to sign JWTs |

## API (gateway, `http://localhost:3000`)

| Method | Path | Description |
|--------|------|-------------|
| POST   | `/auth/register` | Register a user |
| GET    | `/events` | List events |
| POST   | `/events` | Create an event |
| GET    | `/events/:eventId/seats` | List seats for an event |
| POST   | `/events/:eventId/seats` | Add a seat |
| POST   | `/events/reservations/hold/:seatId/:userId` | Hold a seat |
| POST   | `/events/orders/checkout` | Check out (`userId`, `amount`, `paymentToken`, `seatId`) |
| GET    | `/users/:userId/seats` | List a user's seats |

## Other commands

```bash
pnpm lint            # ESLint
pnpm format          # Prettier
pnpm test            # unit tests
pnpm prisma:studio   # Prisma Studio
```
