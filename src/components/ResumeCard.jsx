import { User, Mail, Phone, MapPin, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function getScoreColor(score) {
  if (score >= 85) return "score-excellent";
  if (score >= 70) return "score-good";
  if (score >= 50) return "score-fair";
  return "score-poor";
}

function getScoreLabel(score) {
  if (score >= 85) return "Excellent Match";
  if (score >= 70) return "Good Match";
  if (score >= 50) return "Fair Match";
  return "Low Match";
}

export function ResumeCard({
  name,
  email,
  phone,
  location,
  score,
  skills,
  experience,
  onViewDetails,
}) {
  return (
    <div className="group glass-card rounded-xl p-5 hover-lift cursor-pointer" onClick={onViewDetails}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground">{experience}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className={cn("flex items-center gap-1 text-2xl font-bold", getScoreColor(score))}>
            <Star className="h-5 w-5 fill-current" />
            {score}%
          </div>
          <span className={cn("text-xs font-medium", getScoreColor(score))}>
            {getScoreLabel(score)}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {skills.slice(0, 4).map((skill, index) => (
          <span
            key={index}
            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20"
          >
            {skill}
          </span>
        ))}
        {skills.length > 4 && (
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
            +{skills.length - 4} more
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Mail className="h-4 w-4" />
          <span className="truncate max-w-[180px]">{email}</span>
        </div>
        {phone && (
          <div className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            <span>{phone}</span>
          </div>
        )}
        {location && (
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-border/50 flex justify-end">
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
          <Eye className="h-4 w-4 mr-1" />
          View Details
        </Button>
      </div>
    </div>
  );
}
