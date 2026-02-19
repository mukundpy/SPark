'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/logo.jpg"
              alt="SPark"
              width={96}
              height={96}
              className="h-20 w-20 md:h-24 md:w-24 rounded-2xl object-cover shadow-lg ring-2 ring-white/50 dark:ring-slate-800/50"
              priority
            />
          </div>
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md mb-8 dark:bg-slate-900">
            <Sparkles className="text-secondary" size={20} />
            <span className="text-sm font-medium text-text-secondary dark:text-slate-300">
              Capturing Campus Moments
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-6 leading-tight dark:text-slate-100">
            What Ignites <span className="text-primary">SP</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed dark:text-slate-300">
            A creative committee documenting college life through stunning photography, 
            insightful reporting, and compelling storytelling.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/events"
              className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary-600 transition-all duration-200 hover:shadow-xl group"
            >
              Explore Events
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-primary dark:bg-slate-900 dark:text-slate-100"
            >
              View Gallery
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-text-secondary dark:text-slate-300">Events Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-text-secondary dark:text-slate-300">Active Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-text-secondary dark:text-slate-300">Photos Captured</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
    </section>
  );
}
