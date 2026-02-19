import { Camera, Users, FileText, Award } from "lucide-react";

const stats = [
  {
    icon: Camera,
    value: "10,000+",
    label: "Photos Captured",
    color: "text-primary",
  },
  {
    icon: Users,
    value: "50+",
    label: "Active Members",
    color: "text-secondary",
  },
  {
    icon: FileText,
    value: "500+",
    label: "Reports Published",
    color: "text-primary",
  },
  {
    icon: Award,
    value: "100+",
    label: "Events Covered",
    color: "text-secondary",
  },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-md text-center transform hover:scale-105 transition-transform duration-200 dark:bg-slate-900"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 mb-4`}>
                <stat.icon className={stat.color} size={32} />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2 dark:text-slate-100">
                {stat.value}
              </div>
              <div className="text-text-secondary font-medium dark:text-slate-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
