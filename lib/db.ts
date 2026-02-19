// Database utility placeholder
// Connect a PostgreSQL database (e.g., Neon, Supabase) to enable full database functionality.
// For now, the app uses static sample data.

export async function query(text: string, params?: unknown[]) {
  console.warn('Database not connected. Using static data.');
  return { rows: [], rowCount: 0 };
}

export default { query };
