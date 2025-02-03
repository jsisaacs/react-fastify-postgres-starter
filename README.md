# React + Fastify + Postgres + TypeScript Starter

This repository is a starter project to quickly bootstrap a web application using React, Fastify, Postgres, and TypeScript — all containerized with Docker and orchestrated via Docker Compose. It also includes ESLint and Prettier configurations to keep your code clean and consistent.

Below are instructions and details to help you get up and running quickly.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [Running the Project](#running-the-project)
5. [Inspecting and Debugging Containers](#inspecting-and-debugging-containers)
6. [Seeding Data](#seeding-data)
7. [Stopping and Cleaning Up](#stopping-and-cleaning-up)
8. [Future Plans](#future-plans)

## Prerequisites

- **Docker** and **Docker Compose**  
  Make sure you have Docker installed. [Download Docker](https://docs.docker.com/get-docker/).

- **Node.js** (Optional, but useful for local development outside Docker)

  - The repository includes an `.nvmrc` file which specifies the Node.js version you should use.
  - If you want to run any commands locally (e.g., using `pnpm` or Node-based tooling), install and use [nvm](https://github.com/nvm-sh/nvm) to match this version.

- **pnpm** (Optional, but useful for local development outside Docker)
  - The project uses `pnpm` for dependency management in the Node ecosystem.
  - If you are running everything purely in Docker, the necessary installations are handled inside the container.
  - If you wish to run front-end or back-end scripts on your host machine (i.e., outside Docker), you will need to [install pnpm](https://pnpm.io/installation).

## Project Structure

- **db/**: Contains Postgres seeding script.
- **api/**: Contains the Fastify-based backend (TypeScript).
- **frontend/**: Contains the React frontend (TypeScript, Vite).
- **docker-compose.yml**: Defines how Docker containers are composed and networked.
- **.env.example**: Template for environment variables.

## Getting Started

1. Clone the Repository

   ```bash
   git clone https://github.com/jsisaacs/react-fastify-postgres-starter.git
   cd react-fastify-postgres-starter
   ```

2. Create Your .env File

   Copy the provided example:

   ```bash
   cp .env.example .env
   ```

   Edit the newly created `.env` file to set up your project-specific environment variables, or keep the defaults. This file includes DB credentials, host ports, etc.

3. (Optional) Use the Specified Node Version

   If you plan to do local development (rather than Docker-only):

   ```bash
   nvm install
   nvm use
   ```

   This ensures you’re matching the Node version specified in `.nvmrc`.

4. (Optional) Install Dependencies Locally

   If you prefer to install and run everything locally (outside Docker):

   ```bash
   cd api
   pnpm install
   cd ../frontend
   pnpm install
   ```

   Otherwise, Docker Compose will handle installation when building the images.

## Running the Project

1. Start Containers with Docker Compose

   ```bash
   docker compose up --build -d
   ```

   - Builds all required images (if they don’t already exist).
   - Starts up containers for Postgres, Fastify, and React in detached mode.

     > **Note:** You only need the --build flag the first time or any time your Dockerfiles or dependencies change.

2. Access the React Frontend

   Once the containers are running, open http://localhost:5173 in your browser. You should see the Vite + React starter plus the following text on the page:

   `{ "message": "Pong! Fastify is running!" }`

   (This text is the response from the `/api/ping` endpoint on the Fastify server.)

3. Test the Fastify API Directly

   If you want to send requests to the backend directly run:

   ```bash
   curl http://localhost:3000/api/ping
   ```

   You should see the JSON response:

   `{ "message": "Pong! Fastify is running!" }`

4. Verify Postgres Connectivity

   By default, the Postgres container is exposed on port 5432. Connect with `psql` (or your favorite database tool):

   ```bash
   psql -h localhost -p 5432 -U postgres -d mydb
   ```

   Use the username and database name matching your environment settings. If you changed them in `.env`, substitute those values.

## Inspecting and Debugging Containers

1. View Logs in Real Time

   ```bash
   docker logs -f db
   docker logs -f api
   docker logs -f frontend
   ```

   You can open multiple terminal windows/tabs to follow each container’s logs.

2. List Running Containers

   ```bash
   docker ps
   ```

   This will show you all running containers, along with their ports and container IDs.

## Seeding Data

- The project includes a seed file located at `db/init.sql`.
- When you run `docker compose up --build -d` for the first time (or any time you remove volumes), this script will be automatically executed, creating tables and optionally inserting seed data.

Feel free to modify `init.sql` to create your own tables or seed initial data. By default it creates and seeds a basic User table:

```sql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO users (name, email) VALUES
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com');
```

## Stopping and Cleaning Up

1. Stop All Containers

   ```bash
   docker compose down
   ```

2. Stop and Remove Volumes to Re-Seed the Database

   If you want to start fresh (e.g., if you changed `db/init.sql` and want the script to run again):

   ```bash
   docker compose down -v
   ```

   This removes volumes, so Postgres data will be removed and re-initialized the next time you run `docker compose up --build -d`.

## Future Plans

- Testing Setup:
  - Currently, there are no tests in this starter. A future enhancement would be to add automated tests.
- Continuous Integration:
  - You might want to set up GitHub Actions (or similar) to automatically build and test the application on each push or pull request.
