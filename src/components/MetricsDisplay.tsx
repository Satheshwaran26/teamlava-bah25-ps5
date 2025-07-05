
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { TrendingUp, Target, Zap, Award } from "lucide-react";

interface MetricsDisplayProps {
  metrics: {
    ssim: number;
    mae: number;
    psnr: number;
  };
}

const MetricsDisplay = ({ metrics }: MetricsDisplayProps) => {
  const [animatedMetrics, setAnimatedMetrics] = useState({
    ssim: 0,
    mae: 0,
    psnr: 0,
  });

  useEffect(() => {
    // Animate metrics counting up
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedMetrics({
        ssim: metrics.ssim * progress,
        mae: metrics.mae * progress,
        psnr: metrics.psnr * progress,
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedMetrics(metrics);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [metrics]);

  const getQualityLabel = (ssim: number) => {
    if (ssim >= 0.9) return { label: "Excellent", color: "text-green-600", bg: "bg-green-100" };
    if (ssim >= 0.8) return { label: "Good", color: "text-blue-600", bg: "bg-blue-100" };
    if (ssim >= 0.7) return { label: "Fair", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { label: "Poor", color: "text-red-600", bg: "bg-red-100" };
  };

  const qualityInfo = getQualityLabel(metrics.ssim);

  return (
    <div className="space-y-6">
      {/* Overall Quality Badge */}
      <Card className="border-2 border-green-200 bg-green-50/50 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center space-x-3">
            <Award className="h-8 w-8 text-green-500" />
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-700">
                {qualityInfo.label} Prediction Quality
              </h3>
              <p className="text-green-600">
                High accuracy geospatial forecasting achieved
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SSIM */}
        <Card className="hover:shadow-lg transition-shadow duration-300 border-orange-200">
          <CardHeader className="pb-3 bg-gradient-to-r from-orange-50 to-blue-50">
            <CardTitle className="flex items-center space-x-2 text-lg text-orange-700">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-5 w-5 text-blue-500" />
              </div>
              <span>SSIM</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {animatedMetrics.ssim.toFixed(3)}
              </div>
              <Badge className={`${qualityInfo.bg} ${qualityInfo.color} border-0`}>
                {qualityInfo.label}
              </Badge>
            </div>
            
            <Progress 
              value={animatedMetrics.ssim * 100} 
              className="h-3"
            />
            
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Structural Similarity Index</strong></p>
              <p>Measures structural similarity between predicted and actual images.</p>
              <p className="text-xs">Range: 0.0 (poor) - 1.0 (perfect)</p>
            </div>
          </CardContent>
        </Card>

        {/* MAE */}
        <Card className="hover:shadow-lg transition-shadow duration-300 border-orange-200">
          <CardHeader className="pb-3 bg-gradient-to-r from-orange-50 to-yellow-50">
            <CardTitle className="flex items-center space-x-2 text-lg text-orange-700">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-500" />
              </div>
              <span>MAE</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {animatedMetrics.mae.toFixed(4)}
              </div>
              <Badge variant="outline" className="border-orange-200 text-orange-700">
                Low Error
              </Badge>
            </div>
            
            <Progress 
              value={(1 - Math.min(animatedMetrics.mae / 0.1, 1)) * 100} 
              className="h-3"
            />
            
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Mean Absolute Error</strong></p>
              <p>Average pixel-wise difference between predicted and actual values.</p>
              <p className="text-xs">Range: 0.0 (perfect) - higher values indicate more error</p>
            </div>
          </CardContent>
        </Card>

        {/* PSNR */}
        <Card className="hover:shadow-lg transition-shadow duration-300 border-orange-200">
          <CardHeader className="pb-3 bg-gradient-to-r from-orange-50 to-purple-50">
            <CardTitle className="flex items-center space-x-2 text-lg text-orange-700">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="h-5 w-5 text-purple-500" />
              </div>
              <span>PSNR</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {animatedMetrics.psnr.toFixed(1)} dB
              </div>
              <Badge variant="outline" className="border-purple-200 text-purple-700">
                High Quality
              </Badge>
            </div>
            
            <Progress 
              value={Math.min((animatedMetrics.psnr / 40) * 100, 100)} 
              className="h-3"
            />
            
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Peak Signal-to-Noise Ratio</strong></p>
              <p>Measures image quality relative to noise levels.</p>
              <p className="text-xs">Range: Higher values indicate better quality (&gt;30dB is good)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MetricsDisplay;
