import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowRight, BookOpen, Clock, CheckCircle2, Target, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGetRoadmapMutation } from "@/features/api/aiApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LearningRoadmap = ({ enrolledCourses = [] }) => {
  const [topic, setTopic] = useState("");
  const [currentLevel, setCurrentLevel] = useState("beginner");
  const [roadmap, setRoadmap] = useState(null);
  const [getRoadmap, { isLoading }] = useGetRoadmapMutation();

  const handleGetRoadmap = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    try {
      const result = await getRoadmap({
        topic: topic.trim(),
        currentLevel,
        enrolledCourses: enrolledCourses || [],
      }).unwrap();

      setRoadmap(result.data);
      toast.success("Learning roadmap generated!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to generate roadmap");
    }
  };

  return (
    <div className="page-shell px-6 py-10 md:px-12 space-y-6">
      <div className="text-center md:text-left">
        <div className="inline-flex items-center gap-2 mb-4">
          <MapPin className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-3xl font-bold">AI Learning Roadmap</h1>
        </div>
        <p className="page-subtitle mt-2">
          Get a personalized step-by-step learning path for any topic. Perfect for beginners and advanced learners!
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>What do you want to learn?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Web Development, Machine Learning, Data Science, React"
              className="h-11"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleGetRoadmap();
                }
              }}
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Enter the topic or skill you want to master
            </p>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Your Current Level</label>
            <Select value={currentLevel} onValueChange={setCurrentLevel}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner - Just starting out</SelectItem>
                <SelectItem value="intermediate">Intermediate - Some experience</SelectItem>
                <SelectItem value="advanced">Advanced - Looking to master</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleGetRoadmap}
            disabled={isLoading || !topic.trim()}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating roadmap...
              </>
            ) : (
              <>
                Generate Learning Roadmap
                <Sparkles className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {roadmap && (
        <div className="space-y-6">
          {/* Overview Card */}
          <Card className="glass-card bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Learning Roadmap: {roadmap.topic}
                </CardTitle>
                <Badge variant="outline" className="text-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  {roadmap.estimatedDuration || "3-6 months"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                {roadmap.overview}
              </p>
              
              {roadmap.prerequisites && roadmap.prerequisites.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold mb-2">Prerequisites:</h3>
                  <div className="flex flex-wrap gap-2">
                    {roadmap.prerequisites.map((prereq, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {prereq}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Learning Phases */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Learning Phases
            </h2>
            <div className="space-y-6">
              {roadmap.phases?.map((phase, idx) => (
                <Card key={idx} className="glass-card glass-card-hover">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold text-lg">
                          {phase.phaseNumber || idx + 1}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{phase.phaseName}</CardTitle>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {phase.duration || "2-4 weeks"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-700 dark:text-slate-300">
                      {phase.description}
                    </p>

                    {phase.topics && phase.topics.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Topics to Cover:
                        </h4>
                        <ul className="space-y-1">
                          {phase.topics.map((topicItem, topicIdx) => (
                            <li key={topicIdx} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                              {topicItem}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {phase.resources && phase.resources.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Recommended Resources:</h4>
                        <div className="flex flex-wrap gap-2">
                          {phase.resources.map((resource, resIdx) => (
                            <Badge key={resIdx} variant="outline" className="text-xs">
                              {resource}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {phase.milestone && (
                      <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-3 border border-emerald-200 dark:border-emerald-800">
                        <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                          🎯 Milestone: {phase.milestone}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          {roadmap.nextSteps && (
            <Card className="glass-card border-2 border-indigo-200 dark:border-indigo-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="h-5 w-5" />
                  What's Next?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 dark:text-slate-300">
                  {roadmap.nextSteps}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default LearningRoadmap;

