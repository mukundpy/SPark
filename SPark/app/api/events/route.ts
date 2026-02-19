import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// GET all events
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const month = searchParams.get('month');
    const year = searchParams.get('year');

    let query = `
      SELECT e.*, 
             array_agg(DISTINCT ec.category_name) as categories,
             COUNT(DISTINCT ci.content_id) FILTER (WHERE ci.content_type = 'PHOTO') as photo_count,
             COUNT(DISTINCT ci.content_id) FILTER (WHERE ci.content_type = 'REPORT') as report_count
      FROM events e
      LEFT JOIN event_category_map ecm ON e.event_id = ecm.event_id
      LEFT JOIN event_categories ec ON ecm.category_id = ec.category_id
      LEFT JOIN content_items ci ON e.event_id = ci.event_id
      WHERE e.is_published = true
    `;

    const params: any[] = [];
    let paramIndex = 1;

    if (category && category !== 'All') {
      query += ` AND ec.category_slug = $${paramIndex}`;
      params.push(category.toLowerCase().replace(/\s+/g, '-'));
      paramIndex++;
    }

    if (month && month !== 'All') {
      const monthNum = new Date(`${month} 1, 2000`).getMonth() + 1;
      query += ` AND EXTRACT(MONTH FROM e.event_date) = $${paramIndex}`;
      params.push(monthNum);
      paramIndex++;
    }

    if (year) {
      query += ` AND EXTRACT(YEAR FROM e.event_date) = $${paramIndex}`;
      params.push(year);
      paramIndex++;
    }

    query += `
      GROUP BY e.event_id
      ORDER BY e.event_date DESC
    `;

    const result = await pool.query(query, params);

    return NextResponse.json({
      success: true,
      events: result.rows
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST - Create new event (admin only)
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication middleware to verify admin token
    
    const {
      event_name,
      event_date,
      event_description,
      venue,
      categories,
      created_by_member_id
    } = await request.json();

    // Validate required fields
    if (!event_name || !event_date || !event_description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert event
    const eventResult = await pool.query(
      `INSERT INTO events (event_name, event_date, event_description, venue, created_by_member_id, is_published)
       VALUES ($1, $2, $3, $4, $5, false)
       RETURNING *`,
      [event_name, event_date, event_description, venue, created_by_member_id]
    );

    const newEvent = eventResult.rows[0];

    // Add categories if provided
    if (categories && categories.length > 0) {
      for (const categoryId of categories) {
        await pool.query(
          `INSERT INTO event_category_map (event_id, category_id) VALUES ($1, $2)`,
          [newEvent.event_id, categoryId]
        );
      }
    }

    return NextResponse.json({
      success: true,
      event: newEvent
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
