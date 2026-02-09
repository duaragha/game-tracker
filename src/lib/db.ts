import { Pool } from 'pg';

// Railway connections (internal or proxy) don't use SSL
const isRailway = process.env.DATABASE_URL?.includes('.railway.internal') ||
                  process.env.DATABASE_URL?.includes('.rlwy.net');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isRailway ? false : (process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false),
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Initialize the progress table
export async function initDb() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_progress (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'default',
        game_id TEXT NOT NULL,
        collected TEXT[] DEFAULT '{}',
        notes JSONB DEFAULT '{}',
        last_updated TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, game_id)
      )
    `);
  } finally {
    client.release();
  }
}

export interface ProgressData {
  gameId: string;
  collected: string[];
  notes: Record<string, string>;
  lastUpdated: string;
}

export async function getProgress(userId: string = 'default'): Promise<Record<string, ProgressData>> {
  const client = await pool.connect();
  try {
    await initDb();
    const result = await client.query(
      'SELECT game_id, collected, notes, last_updated FROM user_progress WHERE user_id = $1',
      [userId]
    );

    const progress: Record<string, ProgressData> = {};
    for (const row of result.rows) {
      progress[row.game_id] = {
        gameId: row.game_id,
        collected: row.collected || [],
        notes: row.notes || {},
        lastUpdated: row.last_updated?.toISOString() || new Date().toISOString(),
      };
    }
    return progress;
  } finally {
    client.release();
  }
}

export async function saveAllProgress(
  userId: string = 'default',
  progress: Record<string, ProgressData>
): Promise<void> {
  const client = await pool.connect();
  try {
    await initDb();
    await client.query('BEGIN');

    for (const [gameId, data] of Object.entries(progress)) {
      await client.query(
        `INSERT INTO user_progress (user_id, game_id, collected, notes, last_updated)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (user_id, game_id)
         DO UPDATE SET collected = $3, notes = $4, last_updated = NOW()`,
        [userId, gameId, data.collected, JSON.stringify(data.notes)]
      );
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export default pool;
