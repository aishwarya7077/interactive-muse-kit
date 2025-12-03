import { Button } from "@/components/ui/button";
import { FileText, LogOut, User } from "lucide-react";

interface HeaderProps {
  userName?: string;
  onLogout?: () => void;
}

export function Header({ userName = "User", onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 glass-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold gradient-text">
              ResumeMatch
            </h1>
            <p className="text-xs text-muted-foreground">AI-Powered Analysis</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-full bg-secondary/50 px-4 py-2 md:flex">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{userName}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onLogout} className="text-muted-foreground hover:text-foreground">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
