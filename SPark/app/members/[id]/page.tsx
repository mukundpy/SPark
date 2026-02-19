'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Mail, Globe, Camera, FileText } from 'lucide-react';

interface Member {
  id: number;
  name: string;
  role: string;
  biography: string;
  specialties: string[];
  email: string;
  portfolioLinks?: Array<{ label: string; url: string }>;
  contributions: Array<{
    id: number;
    title: string;
    type: 'photo' | 'report';
    event: string;
    date: string;
    thumbnail?: string;
  }>;
}

// Sample data - replace with API call
const memberData: Record<number, Member> = {
  1: {
    id: 1,
    name: "John Doe",
    role: "Lead Photographer",
    biography: "John is a passionate photographer with over 5 years of experience in event photography. He specializes in capturing candid moments and creating compelling visual stories. His work has been featured in various college publications and exhibitions.",
    specialties: ["Event Photography", "Portrait Photography", "Photo Editing"],
    email: "john.doe@college.edu",
    portfolioLinks: [
      { label: "Instagram", url: "https://instagram.com/johndoe" },
      { label: "Behance", url: "https://behance.net/johndoe" }
    ],
    contributions: [
      {
        id: 1,
        title: "Annual Tech Fest 2024",
        type: "photo",
        event: "Annual Tech Fest 2024",
        date: "2024-03-15",
        thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80"
      },
      {
        id: 2,
        title: "Tech Fest Workshop Sessions",
        type: "photo",
        event: "Annual Tech Fest 2024",
        date: "2024-03-15",
        thumbnail: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&q=80"
      }
    ]
  },
  2: {
    id: 2,
    name: "Aryaman Jha2",
    role: "Junior Reporter(loda bc)",
    biography: "First of all thodaa sa chut*ya hai ye banda. Aryaman is an accomplished writer and reporter who has covered over 100 college events. He excels at crafting engaging narratives and conducting insightful interviews. His reports are known for their depth and attention to detail.",
    specialties: ["Feature Writing", "Event Reporting", "Interviews"],
    email: "aryaman.jha25@spit.ac.in",
    portfolioLinks: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/aryaman-jha-253b91386/" },
      { label: "Instagram", url: "https://www.instagram.com/mosttalentedbaldman/?hl=en" }
    ],
    contributions: [
      {
        id: 3,
        title: "Tech Fest Comprehensive Report",
        type: "report",
        event: "Annual Tech Fest 2024",
        date: "2024-03-15"
      },
      {
        id: 4,
        title: "Cultural Night Coverage",
        type: "report",
        event: "Cultural Night Extravaganza",
        date: "2024-02-28"
      }
    ]
  }
};

export default function MemberDetailPage() {
  const params = useParams();
  const memberId = parseInt(params.id as string);
  const [member, setMember] = useState<Member | null>(null);
  const [activeTab, setActiveTab] = useState<'biography' | 'contributions'>('biography');

  useEffect(() => {
    // Replace with actual API call
    setMember(memberData[memberId] || null);
  }, [memberId]);

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Member Not Found</h1>
          <Link href="/members" className="text-primary hover:underline">
            &larr; Back to Members
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
            href="/members" 
            className="inline-flex items-center text-primary hover:text-primary-700 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Members
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-primary-700 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h1 className="font-heading font-bold text-2xl text-gray-900 mb-2">
                {member.name}
              </h1>
              <p className="text-primary font-semibold mb-4">{member.role}</p>
              
              {/* Specialties */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.specialties.map((specialty, idx) => (
                    <span 
                      key={idx}
                      className="bg-background-secondary text-text-secondary px-3 py-1 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-3">
                <a 
                  href={`mailto:${member.email}`}
                  className="w-full flex items-center justify-center space-x-2 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Mail size={18} />
                  <span>Contact</span>
                </a>
              </div>
            </div>

            {/* Portfolio Links */}
            {member.portfolioLinks && member.portfolioLinks.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">
                  Portfolio
                </h3>
                <div className="space-y-2">
                  {member.portfolioLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-primary hover:text-primary-700 transition-colors"
                    >
                      <Globe size={16} />
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-md mb-6">
              <div className="border-b">
                <div className="flex space-x-8 px-8">
                  <button
                    onClick={() => setActiveTab('biography')}
                    className={`py-4 font-semibold border-b-2 transition-colors ${
                      activeTab === 'biography'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-text-secondary hover:text-gray-900'
                    }`}
                  >
                    Biography
                  </button>
                  <button
                    onClick={() => setActiveTab('contributions')}
                    className={`py-4 font-semibold border-b-2 transition-colors ${
                      activeTab === 'contributions'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-text-secondary hover:text-gray-900'
                    }`}
                  >
                    Contributions ({member.contributions.length})
                  </button>
                </div>
              </div>

              <div className="p-8">
                {activeTab === 'biography' ? (
                  <div>
                    <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">
                      About {member.name.split(' ')[0]}
                    </h2>
                    <p className="text-text leading-relaxed text-lg">
                      {member.biography}
                    </p>
                  </div>
                ) : (
                  <div>
                    <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6">
                      Contributions
                    </h2>
                    <div className="space-y-4">
                      {member.contributions.map((contribution) => (
                        <Link
                          key={contribution.id}
                          href={`/events/${contribution.id}`}
                          className="flex items-start space-x-4 p-4 rounded-lg hover:bg-background-secondary transition-colors"
                        >
                          {contribution.thumbnail ? (
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={contribution.thumbnail}
                                alt={contribution.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-24 h-24 bg-background-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                              {contribution.type === 'photo' ? (
                                <Camera size={32} className="text-text-secondary" />
                              ) : (
                                <FileText size={32} className="text-text-secondary" />
                              )}
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {contribution.title}
                            </h3>
                            <p className="text-sm text-text-secondary mb-2">
                              {contribution.event}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-text-secondary">
                              <span className="capitalize">{contribution.type}</span>
                              <span>•</span>
                              <span>{new Date(contribution.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
