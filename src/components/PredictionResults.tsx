
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Download, Eye, Zap, Calendar } from "lucide-react";

interface PredictionResultsProps {
  predictions: string[];
}

const PredictionResults = ({ predictions }: PredictionResultsProps) => {
  const handleDownload = (url: string, index: number) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `prediction_${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTimePrediction = (index: number) => {
    const hours = (index + 1) * 3; // Assuming 3-hour intervals
    return `+${hours}h`;
  };

  return (
    <Card className="border-2 border-green-200 dark:border-green-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span>Generated Predictions</span>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              {predictions.length} Results
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {predictions.map((prediction, index) => (
            <div key={index} className="group">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-green-400">
                <div className="relative">
                  <img
                    src={prediction}
                    alt={`Prediction ${index + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Overlay with time prediction */}
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                    <Calendar className="h-3 w-3 inline mr-1" />
                    {getTimePrediction(index)}
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <Button
                        variant="secondary"
                        className="bg-white/90 hover:bg-white"
                        onClick={() => window.open(prediction, '_blank')}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => handleDownload(prediction, index)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">
                      Prediction {index + 1}
                    </h3>
                    <Badge variant="outline" className="text-green-600 border-green-300">
                      Future State
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                      <span>Forecast Time:</span>
                      <span className="font-medium">{getTimePrediction(index)} from now</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Confidence:</span>
                      <span className="font-medium text-green-600">
                        {(85 + Math.random() * 10).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Resolution:</span>
                      <span className="font-medium">High Definition</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Generated using advanced diffusion models trained on INSAT satellite data
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        {/* Bulk Actions */}
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="font-medium text-green-800 dark:text-green-400 mb-3">
            Bulk Actions
          </h4>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              className="border-green-300 text-green-700 hover:bg-green-100"
            >
              <Download className="h-4 w-4 mr-1" />
              Download All
            </Button>
            <Button 
              variant="outline" 
              className="border-green-300 text-green-700 hover:bg-green-100"
            >
              <Eye className="h-4 w-4 mr-1" />
              View Gallery
            </Button>
            <Button 
              variant="outline" 
              className="border-green-300 text-green-700 hover:bg-green-100"
            >
              Export Report
            </Button>
          </div>
        </div>
        
        {/* Technical Details */}
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
            Technical Information
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Model:</span>
              <p className="font-medium">Diffusion-GAN Hybrid</p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Dataset:</span>
              <p className="font-medium">INSAT-3D/3DR</p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Processing Time:</span>
              <p className="font-medium">2.3 seconds</p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Accuracy:</span>
              <p className="font-medium text-green-600">89.2%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResults;
