<div align="center">
  <h1>Blog Weave</h1>
  <p>Event-driven microservices demo (Posts + Comments + Moderation + Query + Event Bus) with a Vite/React client.</p>

  <p>
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9-blue" />
    <img alt="React" src="https://img.shields.io/badge/React-19-61dafb" />
    <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646cff" />
    <img alt="Express" src="https://img.shields.io/badge/Express-5-black" />
    <img alt="Docker" src="https://img.shields.io/badge/Docker-2496ed?logo=docker&logoColor=white" />
    <img alt="Kubernetes" src="https://img.shields.io/badge/Kubernetes-326ce5?logo=kubernetes&logoColor=white" />
  </p>
</div>

An event-driven microservices demo with:

- `server/posts-service/` — Posts service (Express)
- `server/comments-service/` — Comments service (Express)
- `server/moderation-service/` — Comment moderation service (Express)
- `server/query-service/` — Query service for aggregated data (Express)
- `server/event-bus/` — Event bus for service communication (Express)
- `client/` — React + Vite UI with TanStack Query

Each backend service stores data **in memory** (restarts clear data).

## Prerequisites

- Node.js
- Package manager: `pnpm`
- Docker (optional, for containerized deployment)
- kubectl (optional, for Kubernetes deployment)

## Project structure

```
blog-weave/
  client/                    # React + Vite frontend
  server/
    posts-service/           # Posts microservice
    comments-service/        # Comments microservice
    moderation-service/      # Moderation microservice
    query-service/           # Query service (aggregates posts + comments)
    event-bus/               # Event bus for inter-service communication
    infra/
      k8s/                   # Kubernetes manifests
  docs/
    architecture/            # Architecture diagrams
```

## Architecture

![Services Architecture](docs/architecture/services.png)

The system uses an event-driven architecture where:

1. **Posts Service** emits `PostCreated` events to the **Event Bus**.
2. **Comments Service** emits `CommentCreated` events to the **Event Bus**.
3. **Moderation Service** listens for `CommentCreated` events, moderates the content, and emits `CommentModerated` events.
4. **Event Bus** broadcasts events to all subscribed services.
5. **Query Service** listens for `PostCreated` and `CommentModerated` events to maintain an aggregated view of posts and their approved comments.
6. **Client** fetches data from the Query Service for optimized reads.

## Services

### Posts service (`server/posts-service/`)

- Local URL: `http://localhost:4000`
- K8s Internal: `http://posts-cluster-ip-srv:4000`
- K8s NodePort: `30007`
- Endpoints:
  - `GET /posts` — returns all posts
  - `POST /posts` — creates a post (emits `PostCreated` event)
  - `POST /event` — receives events from event bus

### Comments service (`server/comments-service/`)

- Local URL: `http://localhost:4001`
- K8s Internal: `http://comments-cluster-ip-srv:4001`
- K8s NodePort: `30008`
- Endpoints:
  - `GET /posts/:id/comments` — returns comments for a post
  - `POST /posts/:id/comments` — creates a comment (emits `CommentCreated` event)
  - `POST /event` — receives events from event bus

### Moderation service (`server/moderation-service/`)

- Local URL: `http://localhost:4003`
- K8s Internal: `http://moderation-cluster-ip-srv:4003`
- Role: Listens for `CommentCreated` events and emits `CommentModerated` with `APPROVED` or `REJECTED` status based on a keyword filter.
- Endpoints:
  - `POST /event` — receives events from event bus

### Query service (`server/query-service/`)

- Local URL: `http://localhost:4002`
- K8s Internal: `http://query-cluster-api-srv:4002`
- K8s NodePort: `30009`
- Endpoints:
  - `GET /posts` — returns all posts with their comments (aggregated view)
  - `POST /event` — receives events from event bus

### Event bus (`server/event-bus/`)

- Local URL: `http://localhost:4005`
- K8s Internal: `http://event-bus-srv:4005`
- Endpoints:
  - `POST /event` — receives events and broadcasts to all services

## Run locally

> You'll want **6 terminals**: one per service + one for the client.

### 1) Start `event-bus`

```bash
cd server/event-bus
pnpm install
pnpm start
```

### 2) Start `posts-service`

```bash
cd server/posts-service
pnpm install
pnpm start
```

### 3) Start `comments-service`

```bash
cd server/comments-service
pnpm install
pnpm start
```

### 4) Start `moderation-service`

```bash
cd server/moderation-service
pnpm install
pnpm start
```

### 5) Start `query-service`

```bash
cd server/query-service
pnpm install
pnpm start
```

### 6) Start the `client`

```bash
cd client
pnpm install
pnpm dev
```

## Containerization & Deployment

### Docker

Each service includes a `Dockerfile`. You can build and run them using:

```bash
docker build -t blog-weave-service .
docker run -p <PORT>:<PORT> blog-weave-service
```

### Kubernetes

Full Kubernetes manifests (Deployments and Services) are available in `server/infra/k8s/` for all services.

The services are configured to use ClusterIP for internal communication and NodePort for external access from the client.

## Notes

- Data is stored in memory (restarting services resets posts/comments).
- The frontend connects to the Query Service to fetch aggregated posts with comments. When running in Kubernetes, the base URL and ports are managed in `client/src/lib/constants.ts`.
- Start the Event Bus first, then other services, to ensure events are properly routed.
