'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Filter, Calendar } from 'lucide-react';

interface Photo {
  id: number;
  url: string;
  title: string;
  event: string;
  date: string;
  photographer: string;
  category: string;
}

// Sample data - replace with API calls
const galleryPhotos: Photo[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    title: "Tech Fest Opening Ceremony",
    event: "Annual Tech Fest 2024",
    date: "2024-03-15",
    photographer: "John Doe",
    category: "Technology"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80",
    title: "Workshop Session",
    event: "Annual Tech Fest 2024",
    date: "2024-03-15",
    photographer: "John Doe",
    category: "Technology"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    title: "Tech Innovations Display",
    event: "Annual Tech Fest 2024",
    date: "2024-03-15",
    photographer: "Mike Johnson",
    category: "Technology"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    title: "Cultural Performance",
    event: "Cultural Night Extravaganza",
    date: "2024-02-28",
    photographer: "Jane Smith",
    category: "Cultural"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
    title: "Dance Performance",
    event: "Cultural Night Extravaganza",
    date: "2024-02-28",
    photographer: "Jane Smith",
    category: "Cultural"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
    title: "Championship Finals",
    event: "Sports Championship Finals",
    date: "2024-03-10",
    photographer: "Mike Johnson",
    category: "Sports"
  }
];

const categories = ['All', 'Technology', 'Cultural', 'Sports', 'Seminar'];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filteredPhotos = galleryPhotos.filter(photo => 
    selectedCategory === 'All' || photo.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-background-secondary dark:bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-5xl mb-4">Gallery</h1>
          <p className="text-xl text-primary-100">
            Explore our collection of event photography
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-md sticky top-16 z-40 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Filter size={20} className="text-text-secondary dark:text-slate-400" />
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary text-white'
                      : 'bg-background-secondary text-text-secondary hover:bg-gray-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <button
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 hover:shadow-xl transition-all duration-300 dark:bg-slate-800"
            >
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-semibold text-white text-lg mb-1">
                    {photo.title}
                  </h3>
                  <p className="text-sm text-gray-200">{photo.event}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X size={32} />
          </button>
          
          <div className="max-w-6xl w-full">
            <div className="relative aspect-video mb-6">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
              />
            </div>
            
            <div className="bg-white rounded-lg p-6 dark:bg-slate-900">
              <h2 className="font-heading font-bold text-2xl text-gray-900 mb-2 dark:text-slate-100">
                {selectedPhoto.title}
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-text-secondary dark:text-slate-300">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-slate-100">Event</p>
                  <p>{selectedPhoto.event}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-slate-100">Date</p>
                  <p>{new Date(selectedPhoto.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-slate-100">Photographer</p>
                  <p>{selectedPhoto.photographer}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-slate-100">Category</p>
                  <p>{selectedPhoto.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
