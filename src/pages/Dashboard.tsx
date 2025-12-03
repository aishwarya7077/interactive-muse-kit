import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Filter, 
  Sparkles, 
  FileText, 
  Users, 
  TrendingUp,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { ResumeCard } from "@/components/ResumeCard";
import { ResumeDetailModal } from "@/components/ResumeDetailModal";
import { FileUpload } from "@/components/FileUpload";
import { AIChat } from "@/components/AIChat";
import { toast } from "@/hooks/use-toast";

// Sample data
const sampleResumes = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    score: 92,
    skills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL", "MongoDB"],
    experience: "Senior Frontend Developer • 6 years",
    summary: "Passionate frontend developer with extensive experience building scalable web applications. Led teams of 5+ developers and delivered projects for Fortune 500 companies.",
    education: "BS Computer Science, Stanford University",
    workHistory: [
      { company: "Tech Corp", role: "Senior Frontend Developer", duration: "2021 - Present" },
      { company: "StartupXYZ", role: "Frontend Developer", duration: "2018 - 2021" },
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1 (555) 234-5678",
    location: "Seattle, WA",
    score: 85,
    skills: ["Python", "React", "Django", "PostgreSQL", "Docker"],
    experience: "Full Stack Developer • 4 years",
    summary: "Full stack developer specializing in Python and React. Strong background in data engineering and API development.",
    education: "MS Computer Science, University of Washington",
    workHistory: [
      { company: "DataCo", role: "Full Stack Developer", duration: "2020 - Present" },
      { company: "WebAgency", role: "Junior Developer", duration: "2019 - 2020" },
    ],
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    location: "Austin, TX",
    score: 78,
    skills: ["JavaScript", "Vue.js", "CSS", "Figma"],
    experience: "UI Developer • 3 years",
    summary: "Creative UI developer with a strong eye for design. Experienced in translating designs into pixel-perfect interfaces.",
    education: "BA Design, UT Austin",
    workHistory: [
      { company: "DesignStudio", role: "UI Developer", duration: "2021 - Present" },
    ],
  },
  {
    id: 4,
    name: "James Wilson",
    email: "j.wilson@email.com",
    phone: "+1 (555) 456-7890",
    location: "New York, NY",
    score: 65,
    skills: ["Java", "Spring Boot", "MySQL", "REST APIs"],
    experience: "Backend Developer • 2 years",
    summary: "Backend developer focused on enterprise Java applications. Currently expanding skills into cloud technologies.",
    education: "BS Software Engineering, NYU",
    workHistory: [
      { company: "Enterprise Solutions", role: "Junior Backend Developer", duration: "2022 - Present" },
    ],
  },
  {
    id: 5,
    name: "Lisa Park",
    email: "lisa.park@email.com",
    location: "Los Angeles, CA",
    score: 88,
    skills: ["React Native", "TypeScript", "Firebase", "Redux", "Jest"],
    experience: "Mobile Developer • 5 years",
    summary: "Experienced mobile developer with expertise in React Native. Published multiple apps with 100k+ downloads.",
    education: "BS Computer Science, UCLA",
    workHistory: [
      { company: "AppStudio", role: "Senior Mobile Developer", duration: "2020 - Present" },
      { company: "MobileFirst", role: "Mobile Developer", duration: "2018 - 2020" },
    ],
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResume, setSelectedResume] = useState<typeof sampleResumes[0] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleLogout = () => {
    toast({ title: "Logged out", description: "See you next time!" });
    navigate("/");
  };

  const handleFilesSelected = (files: File[]) => {
    setUploadedFiles(files);
    if (files.length > 0) {
      toast({
        title: "Files uploaded",
        description: `${files.length} resume${files.length > 1 ? 's' : ''} ready for analysis`,
      });
    }
  };

  const handleAnalyze = () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Job description required",
        description: "Please enter a job description to match resumes against.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "Analysis complete!",
        description: "Resumes have been scored and ranked based on the job description.",
      });
    }, 2000);
  };

  const filteredResumes = sampleResumes.filter(resume =>
    resume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resume.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const stats = [
    { label: "Total Resumes", value: sampleResumes.length, icon: FileText, color: "text-primary" },
    { label: "Excellent Matches", value: sampleResumes.filter(r => r.score >= 85).length, icon: TrendingUp, color: "text-emerald-400" },
    { label: "Candidates Reviewed", value: sampleResumes.length, icon: Users, color: "text-accent" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header userName="Demo User" onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="glass-card rounded-xl p-5 hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-secondary ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Job Description & Upload */}
          <div className="lg:col-span-1 space-y-6">
            {/* Job Description */}
            <div className="glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Job Description
              </h2>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here to match against resumes..."
                className="w-full h-40 rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>{jobDescription.length} characters</span>
                <button className="text-primary hover:underline">Upload file</button>
              </div>
            </div>

            {/* Resume Upload */}
            <div className="glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h2 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Upload Resumes
              </h2>
              <FileUpload onFilesSelected={handleFilesSelected} />
            </div>

            {/* Analyze Button */}
            <Button 
              variant="gradient" 
              size="xl" 
              className="w-full animate-fade-in"
              style={{ animationDelay: "0.4s" }}
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Analyze & Match Resumes
                </>
              )}
            </Button>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              {/* Search & Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="shrink-0">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Results Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-lg text-foreground">
                  Matched Candidates
                </h2>
                <span className="text-sm text-muted-foreground">
                  {filteredResumes.length} results
                </span>
              </div>

              {/* Resume Cards */}
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredResumes.map((resume, index) => (
                  <div key={resume.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <ResumeCard
                      {...resume}
                      onViewDetails={() => {
                        setSelectedResume(resume);
                        setShowModal(true);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Chat FAB */}
      <Button
        variant="glow"
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-40"
        onClick={() => setShowAIChat(true)}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {/* Modals */}
      <ResumeDetailModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        resume={selectedResume}
      />
      
      <AIChat
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
      />
    </div>
  );
}
