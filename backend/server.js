/**
 * server.js — Minimal Express backend for the Book Store MERN app.
 *
 * Bootstraps an Express app with:
 *   - CORS
 *   - JSON body parsing
 *   - A /health endpoint (used by docker-compose healthcheck)
 *   - A MongoDB connection via mongoose (non-blocking on startup;
 *     the app still serves /health even if the DB is unavailable)
 *
 * Environment variables (injected via docker-compose):
 *   PORT               — listen port (default 5000)
 *   MONGODB_URI        — MongoDB connection string
 *   JWT_SECRET         — JWT signing secret
 *   NODE_ENV           — development | production
 */

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/**
 * /health — liveness/readiness probe.
 * Returns 200 with a JSON status payload.
 * DB connection status is reported but does not fail the probe
 * so the container can start before MongoDB is fully ready.
 */
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

mongoose
  .connect(process.env.MONGODB_URI || '')
  .then(() => console.log('[server] MongoDB connected'))
  .catch((err) => console.error('[server] MongoDB connection error:', err.message));

app.listen(PORT, () => {
  console.log(`[server] Listening on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
});
