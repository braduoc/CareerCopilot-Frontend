"use client";

import { useState, ChangeEvent, DragEvent } from "react";
import { Upload, FileText, CheckCircle2, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

export interface CvUploaderProps {
  onFileSelect?: (file: File) => void;
  onFileUpload?: (file: File) => void;
  isLoading?: boolean;
}

export function CvUploader({
  onFileSelect,
  onFileUpload,
  isLoading = false,
}: CvUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (file && (file.type === "application/pdf" || file.name.endsWith(".docx"))) {
      setSelectedFile(file);
      
      // Soporta tanto onFileSelect como onFileUpload
      if (onFileSelect) onFileSelect(file);
      if (onFileUpload) onFileUpload(file);
    } else {
      alert("Por favor selecciona un archivo PDF o DOCX válido.");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center transition-colors cursor-pointer bg-muted/50",
            isDragging
              ? "border-violet-500 bg-secondary/50 dark:bg-violet-950/20"
              : "border-border hover:border-primary/50"
          )}
        >
          <div className="p-3 bg-secondary dark:bg-violet-950 text-primary dark:text-violet-300 rounded-full mb-4">
            <Upload className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">
            Arrastra tu Curriculum Vitae aquí
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Soporta formatos PDF y DOCX (Máx. 5MB)
          </p>
          <label>
            <input
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <span className="inline-flex items-center justify-center rounded-xl font-medium transition-colors bg-primary text-white hover:bg-primary/90 h-9 px-4 text-sm cursor-pointer shadow-sm">
              Seleccionar archivo
            </span>
          </label>
        </div>
      ) : (
        <div className="border border-border rounded-2xl p-4 flex items-center justify-between bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground truncate max-w-xs">
                {selectedFile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-medium gap-1 mr-2">
              <CheckCircle2 className="w-4 h-4" /> Listo
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={clearFile}
              disabled={isLoading}
              aria-label="Remover archivo"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}