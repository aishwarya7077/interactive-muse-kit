import { useState, useCallback } from "react";
import { Upload, FileText, X, Link, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function FileUpload({ 
  onFilesSelected, 
  acceptedFormats = ".pdf,.doc,.docx",
  multiple = true 
}) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      const newFiles = multiple ? [...files, ...droppedFiles] : [droppedFiles[0]];
      setFiles(newFiles);
      onFilesSelected(newFiles);
    }
  }, [files, multiple, onFilesSelected]);

  const handleFileInput = (e) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    if (selectedFiles.length > 0) {
      const newFiles = multiple ? [...files, ...selectedFiles] : [selectedFiles[0]];
      setFiles(newFiles);
      onFilesSelected(newFiles);
    }
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative rounded-xl border-2 border-dashed p-8 transition-all duration-300 text-center",
          dragActive 
            ? "border-primary bg-primary/5 scale-[1.02]" 
            : "border-border hover:border-primary/50 hover:bg-secondary/30"
        )}
      >
        <input
          type="file"
          accept={acceptedFormats}
          multiple={multiple}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center gap-3">
          <div className={cn(
            "flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300",
            dragActive ? "bg-primary/20" : "bg-secondary"
          )}>
            <Upload className={cn(
              "h-8 w-8 transition-colors",
              dragActive ? "text-primary" : "text-muted-foreground"
            )} />
          </div>
          <div>
            <p className="font-medium text-foreground">
              {dragActive ? "Drop files here" : "Drag & drop resumes here"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse • PDF, DOC, DOCX
            </p>
          </div>
        </div>
      </div>

      {/* URL Input Toggle */}
      <div className="flex items-center justify-center">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-muted-foreground"
        >
          <Link className="h-4 w-4 mr-2" />
          {showUrlInput ? "Hide URL input" : "Or add from URL"}
        </Button>
      </div>

      {showUrlInput && (
        <div className="flex gap-2 animate-fade-in">
          <Input
            placeholder="Paste resume URL..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline" size="icon">
            <Check className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">
            {files.length} file{files.length > 1 ? 's' : ''} selected
          </p>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-2 border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground truncate max-w-[200px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
