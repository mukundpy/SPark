'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Users, ArrowLeft, Download, Share2 } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  description: string;
  longDescription?: string;
  photos?: string[];
  report?: string;
  contributors?: Array<{
    id: number;
    name: string;
    role: string;
  }>;
}

// Sample data - replace with API call
const eventData: Record<number, Event> = {
  1: {
    id: 1,
    title: "Annual Tech Fest 2024",
    date: "2024-03-15",
    location: "Main Auditorium",
    category: "Technology",
    description: "A celebration of innovation and technology featuring workshops, competitions, and exhibitions.",
    longDescription: "The Annual Tech Fest 2024 was a groundbreaking event that brought together students, faculty, and industry professionals to celebrate innovation and technology. The event featured multiple tracks including AI/ML workshops, cybersecurity competitions, and IoT exhibitions. Over 500 participants engaged in various activities throughout the day, making it one of the most successful tech events of the year.",
    photos: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80"
    ],
    report: "The Annual Tech Fest 2024 exceeded all expectations with record participation and engagement. The event kicked off with an inspiring keynote from industry leaders, followed by hands-on workshops covering cutting-edge technologies. The hackathon segment saw incredible innovations, with teams developing solutions ranging from smart campus systems to healthcare applications. The exhibition hall showcased student projects that demonstrated exceptional creativity and technical prowess.",
    contributors: [
      { id: 1, name: "John Doe", role: "Lead Photographer" },
      { id: 2, name: "Jane Smith", role: "Reporter" },
      { id: 3, name: "Mike Johnson", role: "Photographer" }
    ]
  }
};

export default function EventDetailPage() {
  const params = useParams();
  const eventId = parseInt(params.id as string);
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  useEffect(() => {
    // Replace with actual API call
    setEvent(eventData[eventId] || null);
  }, [eventId]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <Link href="/events" className="text-primary hover:underline">
            &larr; Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-secondary">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/events" 
            className="inline-flex items-center text-primary hover:text-primary-700 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Events
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Title and Meta */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {event.category}
                </span>
              </div>
              <h1 className="font-heading font-bold text-4xl text-gray-900 mb-4">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-text-secondary">
                <div className="flex items-center space-x-2">
                  <Calendar size={18} />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={18} />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            {/* Photo Gallery */}
            {event.photos && event.photos.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6">
                  Photo Gallery
                </h2>
                <div className="space-y-4">
                  {/* Main Photo */}
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={event.photos[selectedPhoto]}
                      alt={`${event.title} - Photo ${selectedPhoto + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Thumbnail Grid */}
                  <div className="grid grid-cols-4 gap-4">
                    {event.photos.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPhoto(index)}
                        className={`relative aspect-video rounded-lg overflow-hidden ${
                          selectedPhoto === index 
                            ? 'ring-4 ring-primary' 
                            : 'opacity-70 hover:opacity-100'
                        } transition-all`}
                      >
                        <Image
                          src={photo}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Event Report */}
            {event.report && (
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6">
                  Event Report
                </h2>
                <div className="prose max-w-none">
                  <p className="text-lg text-text mb-4 leading-relaxed">
                    {event.longDescription}
                  </p>
                  <div className="mt-6 text-text leading-relaxed">
                    {event.report.split('\n').map((paragraph, idx) => (
                      <p key={idx} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">
                Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors">
                  <Download size={18} />
                  <span>Download Report</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 size={18} />
                  <span>Share Event</span>
                </button>
              </div>
            </div>

            {/* Contributors */}
            {event.contributors && event.contributors.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">
                  Contributors
                </h3>
                <div className="space-y-4">
                  {event.contributors.map((contributor) => (
                    <Link
                      key={contributor.id}
                      href={`/members/${contributor.id}`}
                      className="flex items-center space-x-3 hover:bg-background-secondary p-2 rounded-lg transition-colors"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-700 rounded-full flex items-center justify-center text-white font-bold">
                        {contributor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{contributor.name}</p>
                        <p className="text-sm text-text-secondary">{contributor.role}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Events */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">
                Related Events
              </h3>
              <p className="text-sm text-text-secondary">
                More events in {event.category} category coming soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
