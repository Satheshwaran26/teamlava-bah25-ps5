
import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Upload, Image, AlertCircle } from "lucide-react";
import { cn } from "../lib/utils";

interface ImageUploadAreaProps {
  onImagesUpload: (files: File[]) => void;
  maxImages: number;
  minImages: number;
}

const ImageUploadArea = ({ onImagesUpload, maxImages, minImages }: ImageUploadAreaProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      setUploadError(null);

      const files = Array.from(e.dataTransfer.files);
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));

      if (imageFiles.length < minImages || imageFiles.length > maxImages) {
        setUploadError(`Please upload ${minImages}-${maxImages} images for optimal prediction accuracy.`);
        return;
      }

      // Add preview URLs to files
      const filesWithPreviews = imageFiles.map((file) => {
        Object.defineProperty(file, "preview", {
          value: URL.createObjectURL(file),
          writable: false,
        });
        return file;
      });

      onImagesUpload(filesWithPreviews);
    },
    [onImagesUpload, maxImages, minImages]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadError(null);

    if (files.length < minImages || files.length > maxImages) {
      setUploadError(`Please upload ${minImages}-${maxImages} images for optimal prediction accuracy.`);
      return;
    }

    const filesWithPreviews = files.map((file) => {
      Object.defineProperty(file, "preview", {
        value: URL.createObjectURL(file),
        writable: false,
      });
      return file;
    });

    onImagesUpload(filesWithPreviews);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <Card className="border-2 border-dashed border-blue-300 dark:border-blue-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="h-5 w-5 text-blue-500" />
          <span>Upload Geospatial Images</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "relative min-h-[200px] rounded-lg border-2 border-dashed transition-all duration-200",
            isDragOver
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-300 dark:border-gray-600",
            "hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center justify-center h-full py-12 px-6 text-center">
            <div className="mb-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Image className="h-8 w-8 text-blue-500" />
            </div>
            
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Drop your satellite images here
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Upload {minImages}-{maxImages} sequential geospatial images (cloud cover, rainfall maps, etc.) 
              for time-series analysis and prediction.
            </p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Supported formats: JPG, PNG, TIFF</span>
              <span>•</span>
              <span>Max size: 10MB per image</span>
            </div>
            
            {isDragOver && (
              <div className="absolute inset-0 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
                  Drop images to upload
                </div>
              </div>
            )}
          </div>
        </div>
        
        {uploadError && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center space-x-2 text-red-700 dark:text-red-400">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">{uploadError}</span>
            </div>
          </div>
        )}
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
              Optimal Input Guidelines
            </h4>
            <ul className="text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Sequential time-series images</li>
              <li>• Consistent geographic coverage</li>
              <li>• High resolution preferred</li>
            </ul>
          </div>
          
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
              Supported Data Types
            </h4>
            <ul className="text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Cloud cover maps</li>
              <li>• Rainfall distribution</li>
              <li>• INSAT satellite imagery</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUploadArea;
