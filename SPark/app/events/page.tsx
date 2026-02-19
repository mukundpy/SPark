'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Filter, Search } from 'lucide-react';

// Sample data - replace with API calls
const eventsData = [
  {
    id: 1,
    title: "Annual Tech Fest 2024",
    date: "2024-03-15",
    location: "Main Auditorium",
    category: "Technology",
    description: "A celebration of innovation and technology featuring workshops, competitions, and exhibitions.",
  },
  {
    id: 2,
    title: "Cultural Night Extravaganza",
    date: "2024-02-28",
    location: "Open Air Theatre",
    category: "Cultural",
    description: "An evening of music, dance, and artistic performances showcasing student talent.",
  },
  {
    id: 3,
    title: "Sports Championship Finals",
    date: "2024-03-10",
    location: "College Stadium",
    category: "Sports",
    description: "The culmination of inter-departmental sports competitions with thrilling matches.",
  },
  {
    id: 4,
    title: "Seminar on AI & Machine Learning",
    date: "2024-02-20",
    location: "Conference Hall",
    category: "Seminar",
    description: "Industry experts discuss the latest advancements in artificial intelligence and machine learning.",
  },
  {
    id: 5,
    title: "Photography Exhibition",
    date: "2024-03-05",
    location: "Art Gallery",
    category: "Cultural",
    description: "A showcase of stunning photography by our talented committee members.",
  },
  {
    id: 6,
    title: "Hackathon 2024",
    date: "2024-02-15",
    location: "Computer Labs",
    category: "Technology",
    description: "48-hour coding marathon where students build innovative solutions.",
  },
];

const categories = ['All', 'Technology', 'Cultural', 'Sports', 'Seminar'];
const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June'];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');

  const filteredEvents = eventsData.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const eventMonth = new Date(event.date).toLocaleDateString('en-US', { month: 'long' });
    const matchesMonth = selectedMonth === 'All' || eventMonth === selectedMonth;
    
    return matchesSearch && matchesCategory && matchesMonth;
  });

  return (
    <div className="min-h-screen bg-background-secondary dark:bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-5xl mb-4">Events</h1>
          <p className="text-xl text-primary-100">
            Browse through our comprehensive coverage of campus events
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white shadow-md sticky top-16 z-40 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary dark:text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-primary focus:border-transparent dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary dark:text-slate-400" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent appearance-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Month Filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary dark:text-slate-400" size={20} />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent appearance-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-text-secondary">No events found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 dark:bg-slate-900"
              >
                <div className="relative h-56 bg-gradient-to-br from-primary-100 to-secondary-100">
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all"></div>
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-primary dark:bg-slate-950 dark:text-slate-100">
                    {event.category}
                  </div>
                </div>
                
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
        )}
      </div>
    </div>
  );
}
