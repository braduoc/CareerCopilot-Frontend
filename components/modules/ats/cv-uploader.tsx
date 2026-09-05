"use client";

import { useState, ChangeEvent, DragEvent } from "react";
import { Upload, FileText, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
            "border-2 border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center transition-all duration-200 cursor-pointer bg-card/50 hover:bg-secondary/40",
            isDragging
              ? "border-primary bg-secondary/80 ring-4 ring-primary/10"
              : "border-border/80 hover:border-primary/50"
          )}
        >
          <div className="p-3 bg-secondary text-primary rounded-2xl mb-4 shadow-2xs">
            <Upload className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">
            Arrastra tu Curriculum Vitae aquí
          </h3>
          <p className="text-xs text-muted-foreground mb-4 max-w-xs">
            Soporta archivos en formato PDF y DOCX (Máximo 5MB)
          </p>
          <label>
            <input
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <span className="inline-flex items-center justify-center rounded-xl font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 text-xs cursor-pointer shadow-xs hover:shadow-md">
              Seleccionar archivo
            </span>
          </label>
        </div>
      ) : (
        <div className="border border-border/80 rounded-2xl p-4 flex items-center justify-between bg-card shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground truncate max-w-[200px] sm:max-w-xs">
                {selectedFile.name}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-medium gap-1 px-2.5 py-1 bg-emerald-500/10 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" /> 
              <span>Listo</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={clearFile}
              disabled={isLoading}
              aria-label="Remover archivo"
              className="hover:bg-secondary rounded-xl h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}