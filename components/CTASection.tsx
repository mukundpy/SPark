import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-6">
          Join Our Creative Team
        </h2>
        <p className="text-xl text-primary-100 mb-10 leading-relaxed">
          Are you passionate about photography, journalism, or creative writing? 
          Become part of SPark and help us document the vibrant life of our campus.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 group"
          >
            <Mail className="mr-2" size={20} />
            Get In Touch
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
          <Link
            href="/members"
            className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-primary transition-all duration-200"
          >
            Meet The Team
          </Link>
        </div>
      </div>
    </section>
  );
}
