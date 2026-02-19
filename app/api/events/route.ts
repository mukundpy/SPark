import { NextRequest, NextResponse } from 'next/server';

// Static sample data - replace with database integration when ready
const sampleEvents = [
  {
    event_id: 1,
    event_name: "Annual Tech Fest 2024",
    event_date: "2024-03-15",
    event_description: "A celebration of innovation and technology featuring workshops, competitions, and exhibitions.",
    venue: "Main Auditorium",
    is_published: true,
    categories: ["Technology"],
    photo_count: 2,
    report_count: 1,
  },
  {
    event_id: 2,
    event_name: "Cultural Night Extravaganza",
    event_date: "2024-02-28",
    event_description: "An evening of music, dance, and artistic performances showcasing student talent.",
    venue: "Open Air Theatre",
    is_published: true,
    categories: ["Cultural"],
    photo_count: 2,
    report_count: 1,
  },
  {
    event_id: 3,
    event_name: "Sports Championship Finals",
    event_date: "2024-03-10",
    event_description: "The culmination of inter-departmental sports competitions.",
    venue: "College Stadium",
    is_published: true,
    categories: ["Sports"],
    photo_count: 1,
    report_count: 0,
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    let filtered = sampleEvents;
    if (category && category !== 'All') {
      filtered = sampleEvents.filter(e =>
        e.categories.some(c => c.toLowerCase() === category.toLowerCase())
      );
    }

    return NextResponse.json({
      success: true,
      events: filtered,
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
