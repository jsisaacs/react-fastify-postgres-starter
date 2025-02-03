import Fastify from 'fastify'
import { config } from 'dotenv'
import fastifyPostgres from '@fastify/postgres'
import cors from '@fastify/cors'

config()

const server = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    }
  }
})

server.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})

server.register(fastifyPostgres, { connectionString: process.env.DATABASE_URL })

server.get('/api/ping', async (request, reply) => {
  return { message: 'Pong! Fastify is running!' }
})

const startServer = async () => {
  try {
    const port = Number(process.env.PORT) || 3000
    await server.listen({
      port,
      host: '0.0.0.0'
    })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

startServer()
