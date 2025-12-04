import { X, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Star, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function getScoreColor(score) {
  if (score >= 85) return "text-emerald-400";
  if (score >= 70) return "text-green-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

export function ResumeDetailModal({ isOpen, onClose, resume }) {
  if (!isOpen || !resume) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-gradient-to-r from-primary/10 to-accent/10 px-6 py-4 border-b border-border/50 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
              <User className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">{resume.name}</h2>
              <p className="text-sm text-muted-foreground">{resume.experience}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={cn("flex items-center gap-2 text-3xl font-bold", getScoreColor(resume.score))}>
              <Star className="h-6 w-6 fill-current" />
              {resume.score}%
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Contact Info */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4 text-primary" />
              {resume.email}
            </div>
            {resume.phone && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                {resume.phone}
              </div>
            )}
            {resume.location && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {resume.location}
              </div>
            )}
          </div>

          {/* Summary */}
          {resume.summary && (
            <div>
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Professional Summary
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{resume.summary}</p>
            </div>
          )}

          {/* Skills */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary border border-primary/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Work History */}
          {resume.workHistory && resume.workHistory.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                Work Experience
              </h3>
              <div className="space-y-3">
                {resume.workHistory.map((job, index) => (
                  <div key={index} className="rounded-lg bg-secondary/50 p-4 border border-border/50">
                    <div className="font-medium text-foreground">{job.role}</div>
                    <div className="text-sm text-primary">{job.company}</div>
                    <div className="text-xs text-muted-foreground mt-1">{job.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resume.education && (
            <div>
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                Education
              </h3>
              <p className="text-muted-foreground text-sm">{resume.education}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border/50">
            <Button variant="gradient" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </Button>
            <Button variant="outline" className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Contact Candidate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
