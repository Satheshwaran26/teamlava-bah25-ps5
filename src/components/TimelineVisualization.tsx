
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineVisualizationProps {
  inputImages: File[];
  predictions: string[];
  isProcessing: boolean;
}

const TimelineVisualization = ({ 
  inputImages, 
  predictions, 
  isProcessing 
}: TimelineVisualizationProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<"input" | "processing" | "output">("input");

  useEffect(() => {
    if (isProcessing) {
      setAnimationPhase("processing");
      setActiveStep(0);
      
      const interval = setInterval(() => {
        setActiveStep((prev) => {
          const nextStep = prev + 1;
          if (nextStep >= inputImages.length) {
            clearInterval(interval);
            return prev;
          }
          return nextStep;
        });
      }, 500);

      return () => clearInterval(interval);
    } else if (predictions.length > 0) {
      setAnimationPhase("output");
    }
  }, [isProcessing, predictions, inputImages.length]);

  const totalSteps = inputImages.length + (predictions.length > 0 ? predictions.length : 2);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-blue-500" />
          <span>Temporal Analysis Timeline</span>
          <Badge variant="outline" className="ml-auto">
            {animationPhase === "processing" ? "Processing" : 
             animationPhase === "output" ? "Complete" : "Ready"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-12 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-1000 ease-out"
              style={{
                width: `${((activeStep + 1) / totalSteps) * 100}%`
              }}
            />
          </div>

          {/* Timeline Steps */}
          <div className="flex justify-between items-start relative z-10">
            {/* Input Images */}
            {inputImages.map((file, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 max-w-[100px]">
                <div 
                  className={cn(
                    "w-6 h-6 rounded-full border-2 transition-all duration-300",
                    index <= activeStep || animationPhase === "output"
                      ? "bg-blue-500 border-blue-500"
                      : "bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600"
                  )}
                >
                  {(index <= activeStep || animationPhase === "output") && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <div 
                    className={cn(
                      "w-16 h-12 rounded border-2 bg-cover bg-center transition-all duration-300 mb-1",
                      index <= activeStep || animationPhase === "output"
                        ? "border-blue-400 shadow-lg scale-105"
                        : "border-gray-300 dark:border-gray-600 opacity-60"
                    )}
                    style={{
                      backgroundImage: `url(${(file as any).preview || URL.createObjectURL(file)})`
                    }}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400">T+{index}</span>
                </div>
              </div>
            ))}

            {/* Processing Indicator */}
            <div className="flex flex-col items-center space-y-2">
              <div 
                className={cn(
                  "w-8 h-8 rounded-full border-2 transition-all duration-300 flex items-center justify-center",
                  isProcessing
                    ? "bg-yellow-500 border-yellow-500 animate-pulse"
                    : animationPhase === "output"
                    ? "bg-green-500 border-green-500"
                    : "bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600"
                )}
              >
                {isProcessing ? (
                  <Zap className="h-4 w-4 text-white animate-bounce" />
                ) : animationPhase === "output" ? (
                  <div className="w-3 h-3 bg-white rounded-full" />
                ) : null}
              </div>
              
              <div className="text-center">
                <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {isProcessing ? "AI Processing" : "Diffusion Model"}
                </div>
                {isProcessing && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Analyzing patterns...
                  </div>
                )}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center">
              <ArrowRight 
                className={cn(
                  "h-6 w-6 transition-all duration-300",
                  animationPhase === "output" 
                    ? "text-green-500 animate-pulse" 
                    : "text-gray-400"
                )}
              />
            </div>

            {/* Predicted Images */}
            {(predictions.length > 0 ? predictions : ['', '']).map((prediction, index) => (
              <div key={`pred-${index}`} className="flex flex-col items-center space-y-2 max-w-[100px]">
                <div 
                  className={cn(
                    "w-6 h-6 rounded-full border-2 transition-all duration-300",
                    predictions.length > 0
                      ? "bg-green-500 border-green-500"
                      : "bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600"
                  )}
                >
                  {predictions.length > 0 && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <div 
                    className={cn(
                      "w-16 h-12 rounded border-2 transition-all duration-300 mb-1",
                      predictions.length > 0
                        ? "border-green-400 shadow-lg scale-105 bg-cover bg-center"
                        : "border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800"
                    )}
                    style={prediction ? {
                      backgroundImage: `url(${prediction})`
                    } : {}}
                  >
                    {!prediction && (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <div className="text-xl">?</div>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    T+{inputImages.length + index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Information */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 dark:text-gray-400">
                Input: {inputImages.length} images
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-400">
                Output: {predictions.length > 0 ? predictions.length : 2} predictions
              </span>
            </div>
            
            <div className="text-right">
              {isProcessing ? (
                <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                  Processing temporal patterns...
                </span>
              ) : predictions.length > 0 ? (
                <span className="text-green-600 dark:text-green-400 font-medium">
                  Predictions generated successfully
                </span>
              ) : (
                <span className="text-gray-500 dark:text-gray-400">
                  Ready for processing
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineVisualization;
