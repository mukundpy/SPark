'use client';

import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

// Sample data - will be replaced with API calls
const featuredEvents = [
  {
    id: 1,
    title: "Annual Tech Fest 2024",
    date: "2024-03-15",
    location: "Main Auditorium",
    category: "Technology",
    image: "/api/placeholder/800/600",
    description: "A celebration of innovation and technology featuring workshops, competitions, and exhibitions.",
  },
  {
    id: 2,
    title: "Cultural Night Extravaganza",
    date: "2024-02-28",
    location: "Open Air Theatre",
    category: "Cultural",
    image: "/api/placeholder/800/600",
    description: "An evening of music, dance, and artistic performances showcasing student talent.",
  },
  {
    id: 3,
    title: "Sports Championship Finals",
    date: "2024-03-10",
    location: "College Stadium",
    category: "Sports",
    image: "/api/placeholder/800/600",
    description: "The culmination of inter-departmental sports competitions with thrilling matches.",
  },
];

export default function FeaturedEvents() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-gray-900 mb-4 dark:text-slate-100">
            Featured Events
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto dark:text-slate-300">
            Explore our recent coverage of campus events, captured through the lens of our talented team.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredEvents.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 dark:bg-slate-900"
            >
              {/* Event Image */}
              <div className="relative h-56 bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-primary dark:bg-slate-950 dark:text-slate-100">
                  {event.category}
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-gray-900 mb-3 group-hover:text-primary transition-colors dark:text-slate-100">
                  {event.title}
                </h3>
                <p className="text-text-secondary text-sm mb-4 line-clamp-2 dark:text-slate-300">
                  {event.description}
                </p>
                <div className="flex items-center justify-between text-sm text-text-secondary dark:text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/events"
            className="inline-flex items-center px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-600 transition-all duration-200 group"
          >
            View All Events
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
