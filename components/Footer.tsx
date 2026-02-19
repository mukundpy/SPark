import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.jpg"
                alt="SPark"
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg object-cover"
              />
              <h3 className="text-white font-heading font-bold text-2xl">
                SPark - What Ignites SP
              </h3>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              A college committee showcasing creative content from photographers, 
              reporters, and writers covering campus events at SPIT. We capture the essence 
              of campus life through our lens and words.
            </p>
            <a
              href="https://spark.spit.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-primary hover:underline mb-4"
            >
              Official site: spark.spit.ac.in →
            </a>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/whatignitessp/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Instagram @whatignitessp"
              >
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://spark.spit.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Official website (spark.spit.ac.in)
                </a>
              </li>
              <li><Link href="/events" className="hover:text-primary transition-colors">Events</Link></li>
              <li><Link href="/members" className="hover:text-primary transition-colors">Our Team</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/admin" className="hover:text-primary transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span className="text-sm">Sardar Patel Institute of Technology (SPIT), Mumbai</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:spark@spit.ac.in" className="text-sm hover:text-primary transition-colors">
                  spark@spit.ac.in
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="flex-shrink-0" />
                <span className="text-sm">—</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} SPark - What Ignites SP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
