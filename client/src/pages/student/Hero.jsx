import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, PlayCircle, ArrowRight } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const stats = useMemo(
    () => [
      { value: "25K+", label: "Active learners" },
      { value: "120+", label: "Curated courses" },
      { value: "4.9/5", label: "Learner satisfaction" },
    ],
    []
  );

  const highlights = useMemo(
    () => [
      "Mentor-led learning journeys with real projects",
      "Flexible pace with lifetime access to purchased courses",
      "Micro assessments that keep you motivated",
    ],
    []
  );

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${encodeURIComponent(searchQuery)}`);
    }
    setSearchQuery("");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_45%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.35),transparent_55%)] pointer-events-none" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-24 pt-28 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="max-w-2xl text-center md:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-white/90 backdrop-blur">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Level up your learning</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your next skill is just a lesson away.
          </h1>
          <p className="mt-4 text-lg text-white/80 md:text-xl">
            Join a vibrant community of curious minds. Master new technologies,
            build portfolio-ready projects, and stay ahead in your career with
            curated content crafted by top instructors.
          </p>

          <form
            onSubmit={searchHandler}
            className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 shadow-lg backdrop-blur md:flex-row md:items-center"
          >
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a course, topic, or mentor..."
              className="h-12 flex-1 border-0 bg-white/90 text-slate-900 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-blue-400 md:h-14"
            />
            <Button
              type="submit"
              className="h-12 w-full gap-2 rounded-xl bg-blue-600 text-white transition hover:-translate-y-0.5 hover:bg-blue-500 md:h-14 md:w-auto"
            >
              Search
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-6">
            <Button
              onClick={() => navigate("/course/search?query")}
              variant="secondary"
              className="h-12 rounded-xl border border-white/20 bg-white/20 px-5 text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/30"
            >
              Explore the catalog
            </Button>
            <button
              type="button"
              onClick={() => navigate("/course/search?query=popular")}
              className="flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
            >
              <PlayCircle className="h-6 w-6" />
              Watch a course preview
            </button>
          </div>

          <ul className="mt-8 grid gap-3 text-left text-white/80">
            {highlights.map((item, index) => (
              <li
                key={item}
                className="flex items-start gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm backdrop-blur transition hover:bg-white/15 md:text-base"
              >
                <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto flex max-w-md flex-col gap-4 rounded-3xl border border-white/10 bg-white/10 p-6 text-white backdrop-blur md:mx-0 lg:max-w-sm">
          <div className="rounded-2xl bg-gradient-to-br from-blue-500/60 to-indigo-500/40 p-6 shadow-xl">
            <p className="text-sm uppercase tracking-widest text-white/80">
              Learner momentum
            </p>
            <h3 className="mt-3 text-3xl font-semibold">Why students stay</h3>
            <p className="mt-3 text-sm text-white/80">
              Stay consistent with progress streaks, weekly nudges, and guided
              tracks that help you ship meaningful work.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/10 p-3 text-center"
              >
                <span className="text-xl font-semibold">{stat.value}</span>
                <span className="mt-1 text-xs text-white/70">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-emerald-300/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
            Fresh content drops every week. Save your favourites and get smart
            reminders to keep learning.
          </div>

          <div className="flex flex-wrap gap-2">
            {["Design Thinking", "AI Essentials", "Product Analytics"].map(
              (tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs text-white"
                >
                  {tag}
                </Badge>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
