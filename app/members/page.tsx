'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Camera, FileText, Pen, Filter } from 'lucide-react';

const membersData = [
  {
    id: 1,
    name: "Mukund Chaurasiya",
    role: "Photographer",
    specialties: "Portrait, Event Photography",
    bio: "Passionate about capturing moments that tell stories. Specialized in event coverage and portrait photography.",
    contributions: 5,
  },
  {
    id: 2,
    name: "Aryaman Jha",
    role: "Reporter",
    specialties: "News Reporting, Interviews",
    bio: "Breaking news and conducting in-depth interviews to keep the campus informed.",
    contributions: 0,
  },
  {
    id: 3,
    name: "Neel Sankhe",
    role: "Photographer",
    specialties: "Sports, Action Photography",
    bio: "Capturing the energy and excitement of sports events with precision and creativity.",
    contributions: 12,
  },
  {
    id: 4,
    name: "Ayaan Waris",
    role: "Writer",
    specialties: "Creative Writing, Columns",
    bio: "Crafting compelling narratives and thought-provoking columns on campus life.",
    contributions: 9,
  },
  {
    id: 5,
    name: "Mitali",
    role: "Reporter",
    specialties: "News Reporting, Interviews",
    bio: "Breaking news and conducting in-depth interviews to keep the campus informed.",
    contributions: 0,
  },
  {
    id: 6,
    name: "Aditya Yadav",
    role: "Marketing Specialist",
    specialties: "Social Media Marketing, Content Strategy",
    bio: "Driving SPark's online presence and engagement through strategic marketing initiatives.",
    contributions: 7,
  },
];

const roles = ['All', 'Photographer', 'Reporter', 'Writer', 'Marketing Specialist'];

export default function MembersPage() {
  const [selectedRole, setSelectedRole] = useState('All');

  const filteredMembers = membersData.filter(member => 
    selectedRole === 'All' || member.role === selectedRole
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Photographer':
        return Camera;
      case 'Reporter':
        return FileText;
      case 'Writer':
        return Pen;
      default:
        return Camera;
    }
  };

  return (
    <div className="min-h-screen bg-background-secondary">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-5xl mb-4">Our Team</h1>
          <p className="text-xl text-primary-100">
            Meet the creative minds behind SPark's outstanding coverage
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white shadow-md sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Filter className="text-text-secondary" size={20} />
            <div className="flex flex-wrap gap-2">
              {roles.map(role => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedRole === role
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-background-secondary text-text-secondary hover:bg-gray-200'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Members Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member) => {
            const Icon = getRoleIcon(member.role);
            return (
              <Link
                key={member.id}
                href={`/members/${member.id}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <Icon className="text-primary" size={40} />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="inline-block px-3 py-1 bg-primary-50 text-primary text-sm font-semibold rounded-full">
                      {member.role}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                    {member.bio}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Specialties:</span>
                    <span className="font-medium text-gray-900">{member.specialties}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="text-sm text-text-secondary">
                      <strong className="text-primary">{member.contributions}</strong> contributions
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
