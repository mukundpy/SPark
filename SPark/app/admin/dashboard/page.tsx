'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Image as ImageIcon, 
  FileText, 
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats] = useState({
    totalEvents: 24,
    totalMembers: 12,
    totalPhotos: 342,
    totalReports: 48,
    recentActivity: 15
  });

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard', active: true },
    { icon: Calendar, label: 'Events', href: '/admin/events', active: false },
    { icon: Users, label: 'Members', href: '/admin/members', active: false },
    { icon: ImageIcon, label: 'Gallery', href: '/admin/gallery', active: false },
    { icon: FileText, label: 'Reports', href: '/admin/reports', active: false },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics', active: false },
    { icon: Settings, label: 'Settings', href: '/admin/settings', active: false },
  ];

  return (
    <div className="min-h-screen bg-background-secondary">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 min-h-screen fixed left-0 top-0">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SP</span>
              </div>
              <span className="font-heading font-bold text-xl text-white">
                SPark Admin
              </span>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-primary text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
            <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors w-full">
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          {/* Header */}
          <div className="bg-white border-b px-8 py-6">
            <h1 className="font-heading font-bold text-3xl text-gray-900">
              Dashboard
            </h1>
            <p className="text-text-secondary mt-1">
              Welcome back! Here's what's happening with SPark.
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="text-primary" size={24} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stats.totalEvents}
                </div>
                <div className="text-sm text-text-secondary">Total Events</div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="text-secondary" size={24} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stats.totalMembers}
                </div>
                <div className="text-sm text-text-secondary">Team Members</div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <ImageIcon className="text-primary" size={24} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stats.totalPhotos}
                </div>
                <div className="text-sm text-text-secondary">Photos Published</div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <FileText className="text-secondary" size={24} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stats.totalReports}
                </div>
                <div className="text-sm text-text-secondary">Reports Written</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="font-heading font-bold text-xl text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/admin/events/new"
                  className="flex items-center justify-center space-x-2 bg-primary text-white px-6 py-4 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Calendar size={20} />
                  <span className="font-semibold">Add New Event</span>
                </Link>
                <Link
                  href="/admin/members/new"
                  className="flex items-center justify-center space-x-2 bg-secondary text-white px-6 py-4 rounded-lg hover:bg-secondary-700 transition-colors"
                >
                  <Users size={20} />
                  <span className="font-semibold">Add Team Member</span>
                </Link>
                <Link
                  href="/admin/gallery/upload"
                  className="flex items-center justify-center space-x-2 border-2 border-primary text-primary px-6 py-4 rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <ImageIcon size={20} />
                  <span className="font-semibold">Upload Photos</span>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="font-heading font-bold text-xl text-gray-900 mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 pb-4 border-b">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="text-primary" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">New event published</p>
                    <p className="text-sm text-text-secondary">Annual Tech Fest 2024 is now live</p>
                    <p className="text-xs text-text-secondary mt-1">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 pb-4 border-b">
                  <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <ImageIcon className="text-secondary" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">Photos uploaded</p>
                    <p className="text-sm text-text-secondary">24 new photos added to Tech Fest gallery</p>
                    <p className="text-xs text-text-secondary mt-1">5 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="text-primary" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">New member joined</p>
                    <p className="text-sm text-text-secondary">Sarah Johnson added to the photography team</p>
                    <p className="text-xs text-text-secondary mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
