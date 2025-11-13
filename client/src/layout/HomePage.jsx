import { Button } from "@/components/ui/button";
import Courses from "@/pages/student/Courses";
import Hero from "@/pages/student/Hero";
import {
  BookOpenCheck,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Sparkle,
  Users,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();

  const quickStats = [
    {
      icon: Users,
      label: "Learners worldwide",
      value: "48,000+",
    },
    {
      icon: BookOpenCheck,
      label: "Hours of content",
      value: "1,200+",
    },
    {
      icon: ShieldCheck,
      label: "Completion rate",
      value: "92%",
    },
    {
      icon: Sparkle,
      label: "Career transitions",
      value: "3,500+",
    },
  ];

  const features = [
    {
      icon: Rocket,
      title: "Outcome-driven tracks",
      description:
        "Sequenced modules with check-ins that help you build projects that mirror real-world scenarios.",
    },
    {
      icon: Lightbulb,
      title: "Live mentor sessions",
      description:
        "Weekly office-hours with industry experts to clarify doubts, review work, and explore career paths.",
    },
    {
      icon: ShieldCheck,
      title: "Progress that sticks",
      description:
        "Smart reminders, learning streaks, and knowledge checks keep you accountable and motivated.",
    },
  ];

  const categories = [
    "Product Design",
    "Full Stack",
    "AI & ML",
    "Data Analytics",
    "Marketing",
    "No-Code",
    "Career Growth",
  ];

  const handleCategoryClick = (category) => {
    navigate(`/course/search?query=${encodeURIComponent(category)}`);
  };

  return (
    <div className="space-y-16 text-slate-900 dark:text-slate-100">
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <Hero />
      </div>

      <section className="page-shell -mt-14 md:-mt-20">
        <div className="rounded-3xl border border-slate-200/70 bg-white/40 p-6 shadow-xl backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/60 md:p-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6">
            {quickStats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card glass-card-hover flex flex-col gap-2 rounded-2xl p-5 text-left"
              >
                <stat.icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                <span className="text-2xl font-semibold">{stat.value}</span>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-10 md:flex-row md:items-start md:justify-between md:px-10">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Why learn with us
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Learning that fits your goals
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
              Every pathway designed with industry mentors, pairing deep
              storytelling with practical labs. Whether you are switching
              careers or accelerating in your current role, you will find a
              guided experience that meets you where you are.
            </p>
          </div>

          <div className="grid flex-1 gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass-card glass-card-hover flex h-full flex-col gap-4 p-6"
              >
                <feature.icon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-10">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Discover by focus area
              </p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                Browse by category
              </h2>
              <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-300">
                Not sure where to start? Jump straight into a curated collection
                that matches your current challenge.
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-full border-slate-300 px-6 text-sm font-medium dark:border-slate-700"
              onClick={() => navigate("/course/search?query=all")}
            >
              View all categories
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="rounded-full border border-slate-200/80 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 py-20 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_45%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 text-center md:px-10">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Find a course that moves your career forward
          </h2>
          <p className="mx-auto max-w-3xl text-base text-white/80 md:text-lg">
            Whether you are preparing for your next role or sharpening the craft
            you already love, explore a catalog designed to make learning
            addictive.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="rounded-full bg-white px-8 text-base font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:bg-white/90"
              onClick={() => navigate("/course/search?query=featured")}
            >
              Explore featured paths
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full border border-white/40 bg-transparent px-8 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              onClick={() => navigate("/course/search?query=new")}
            >
              See what&apos;s new
            </Button>
          </div>
        </div>
      </section>

      <div className="page-shell px-4 py-10 md:px-8">
        <Courses />
      </div>
    </div>
  );
};

export default HomePage;
