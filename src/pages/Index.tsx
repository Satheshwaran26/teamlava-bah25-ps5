
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Zap, Satellite, Cloud, Plus, Minus, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import ImageUploadArea from "@/components/ImageUploadArea";
import TimelineVisualization from "@/components/TimelineVisualization";
import PredictionResults from "@/components/PredictionResults";

const Index = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [predictions, setPredictions] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dataSource, setDataSource] = useState<"upload" | "sample">("upload");
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");
  const { toast } = useToast();

  // Language translations
  const translations = {
    en: {
      title: "Cloud Motion Prediction System",
      subtitle: "Advanced Satellite Image Analysis Platform",
      dataSource: "Data Source Selection",
      uploadCustom: "Upload Custom Images",
      sampleData: "Use Sample INSAT Data",
      loadSample: "Load Sample Data",
      inputImages: "Input Images",
      generatePred: "Generate Predictions",
      processing: "Processing...",
      poweredBy: "Powered by Indigenous INSAT Satellite Data & Advanced Diffusion Models",
      designed: "Designed for operational integration with IMD & NESAC platforms",
      diffusionModels: "AI Powered",
      hindi: "हिंदी",
      english: "English",
      govIndia: "Government of India",
      govIndiaHi: "भारत सरकार",
      homeNav: "Home"
    },
    hi: {
      title: "क्लाउड मोशन पूर्वानुमान प्रणाली",
      subtitle: "उन्नत उपग्रह छवि विश्लेषण प्लेटफॉर्म",
      dataSource: "डेटा स्रोत चयन",
      uploadCustom: "कस्टम छवियां अपलोड करें",
      sampleData: "नमूना इनसैट डेटा का उपयोग करें",
      loadSample: "नमूना डेटा लोड करें",
      inputImages: "इनपुट छवियां",
      generatePred: "पूर्वानुमान उत्पन्न करें",
      processing: "प्रसंस्करण...",
      poweredBy: "स्वदेशी इनसैट उपग्रह डेटा और उन्नत डिफ्यूजन मॉडल द्वारा संचालित",
      designed: "आईएमडी और नेसैक प्लेटफॉर्म के साथ परिचालन एकीकरण के लिए डिज़ाइन किया गया",
      diffusionModels: "एआई संचालित",
      hindi: "हिंदी",
      english: "English",
      govIndia: "Government of India",
      govIndiaHi: "भारत सरकार",
      homeNav: "होम"
    }
  };

  const t = translations[language];

  const handleImagesUpload = (files: File[]) => {
    if (files.length < 4 || files.length > 6) {
      toast({
        title: language === "en" ? "Invalid number of images" : "छवियों की अमान्य संख्या",
        description: language === "en" 
          ? "Please upload 4-6 images for optimal prediction accuracy."
          : "इष्टतम पूर्वानुमान सटीकता के लिए कृपया 4-6 छवियां अपलोड करें।",
        variant: "destructive",
      });
      return;
    }
    setUploadedImages(files);
    setPredictions([]);
    toast({
      title: language === "en" ? "Images uploaded successfully" : "छवियां सफलतापूर्वक अपलोड की गईं",
      description: language === "en" 
        ? `${files.length} geospatial images ready for processing.`
        : `${files.length} भूस्थानिक छवियां प्रसंस्करण के लिए तैयार हैं।`,
    });
  };

  const generatePredictions = async () => {
    if (uploadedImages.length === 0 && dataSource === "upload") {
      toast({
        title: language === "en" ? "No images to process" : "प्रसंस्करण के लिए कोई छवि नहीं",
        description: language === "en" 
          ? "Please upload 4-6 images first."
          : "कृपया पहले 4-6 छवियां अपलोड करें।",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Generate mock predictions with realistic satellite imagery URLs
    const mockPredictions = [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop",
    ];

    setPredictions(mockPredictions);
    setIsProcessing(false);

    toast({
      title: language === "en" ? "Predictions generated successfully" : "पूर्वानुमान सफलतापूर्वक उत्पन्न किए गए",
      description: language === "en" 
        ? "Diffusion model analysis complete with high accuracy metrics."
        : "उच्च सटीकता मेट्रिक्स के साथ डिफ्यूजन मॉडल विश्लेषण पूर्ण।",
    });
  };

  const loadSampleData = () => {
    const sampleImages = [
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop",
    ];
    
    // Convert URLs to mock File objects for display purposes
    const mockFiles = sampleImages.map((url, index) => {
      const file = new File([new Blob()], `sample_insat_${index + 1}.jpg`, {
        type: "image/jpeg",
      });
      Object.defineProperty(file, "preview", {
        value: url,
        writable: false,
      });
      return file;
    });
    
    setUploadedImages(mockFiles);
    setPredictions([]);
    toast({
      title: language === "en" ? "Sample INSAT data loaded" : "नमूना इनसैट डेटा लोड किया गया",
      description: language === "en" 
        ? "Indigenous satellite imagery ready for analysis."
        : "विश्लेषण के लिए स्वदेशी उपग्रह छवियां तैयार हैं।",
    });
  };

  const increaseFontSize = () => {
    if (fontSize === "small") setFontSize("medium");
    else if (fontSize === "medium") setFontSize("large");
  };

  const decreaseFontSize = () => {
    if (fontSize === "large") setFontSize("medium");
    else if (fontSize === "medium") setFontSize("small");
  };

  const fontSizeClass = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg"
  }[fontSize];

  return (
    <div className={`min-h-screen bg-white ${fontSizeClass}`}>
      {/* Government Header - ISRO Style */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img 
                  src="https://www.isro.gov.in/themes/custom/isro/images/isro-logo.png" 
                  alt="ISRO Logo" 
                  className="h-16 w-16"
                  onError={(e) => {
                    e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/b/bd/Indian_Space_Research_Organisation_Logo.svg";
                  }}
                />
                <div>
                  <div className="text-blue-700 font-bold text-lg">{t.govIndia}</div>
                  <div className="text-blue-600 font-semibold">{t.govIndiaHi}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Font Size Controls */}
                <div className="flex items-center space-x-1 bg-gray-100 rounded px-2 py-1">
                  <button
                    onClick={decreaseFontSize}
                    className="text-gray-700 hover:text-blue-600 text-sm flex items-center"
                    disabled={fontSize === "small"}
                  >
                    <Minus className="h-3 w-3 mr-1" />
                    A-
                  </button>
                  <span className="text-gray-500 text-xs">|</span>
                  <button
                    onClick={increaseFontSize}
                    className="text-gray-700 hover:text-blue-600 text-sm flex items-center"
                    disabled={fontSize === "large"}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    A+
                  </button>
                </div>
                
                {/* Language Toggle */}
                <div className="flex items-center space-x-1 bg-gray-100 rounded px-2 py-1">
                  <button
                    onClick={() => setLanguage("en")}
                    className={`text-xs px-2 py-1 rounded ${
                      language === "en" 
                        ? "bg-blue-600 text-white" 
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {t.english}
                  </button>
                  <button
                    onClick={() => setLanguage("hi")}
                    className={`text-xs px-2 py-1 rounded ${
                      language === "hi" 
                        ? "bg-blue-600 text-white" 
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {t.hindi}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-6">
                <Link to="/" className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors">
                  <Home className="h-4 w-4" />
                  <span>{t.homeNav}</span>
                </Link>
                <div className="flex items-center space-x-3">
                  <Satellite className="h-8 w-8 text-white" />
                  <div>
                    <h1 className="text-xl font-bold text-white">{t.title}</h1>
                    <p className="text-blue-100 text-sm">{t.subtitle}</p>
                  </div>
                </div>
              </div>
              
              <Badge className="bg-white text-blue-700 border-0 px-3 py-1">
                <Zap className="h-4 w-4 mr-2" />
                {t.diffusionModels}
              </Badge>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Data Source Selection */}
        <Card className="border border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-100">
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Cloud className="h-5 w-5" />
              <span>{t.dataSource}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="upload"
                  name="dataSource"
                  checked={dataSource === "upload"}
                  onChange={() => setDataSource("upload")}
                  className="text-blue-600"
                />
                <label htmlFor="upload" className="text-blue-800 font-medium">
                  {t.uploadCustom}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="sample"
                  name="dataSource"
                  checked={dataSource === "sample"}
                  onChange={() => setDataSource("sample")}
                  className="text-blue-600"
                />
                <label htmlFor="sample" className="text-blue-800 font-medium">
                  {t.sampleData}
                </label>
              </div>
              {dataSource === "sample" && (
                <Button onClick={loadSampleData} className="bg-blue-600 hover:bg-blue-700 text-white">
                  {t.loadSample}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Image Upload Area */}
        {dataSource === "upload" && (
          <ImageUploadArea
            onImagesUpload={handleImagesUpload}
            maxImages={6}
            minImages={4}
          />
        )}

        {/* Uploaded Images Display */}
        {uploadedImages.length > 0 && (
          <Card className="shadow-lg border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-100">
              <CardTitle className="flex items-center justify-between text-blue-800">
                <span>{t.inputImages} ({uploadedImages.length})</span>
                <Button
                  onClick={generatePredictions}
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      {t.processing}
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      {t.generatePred}
                    </>
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {uploadedImages.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={(file as any).preview || URL.createObjectURL(file)}
                      alt={`Input ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border-2 border-blue-200 group-hover:border-blue-400 transition-colors shadow-md"
                    />
                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      T+{index}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Timeline Visualization */}
        {uploadedImages.length > 0 && (
          <TimelineVisualization
            inputImages={uploadedImages}
            predictions={predictions}
            isProcessing={isProcessing}
          />
        )}

        {/* Prediction Results */}
        {predictions.length > 0 && (
          <PredictionResults predictions={predictions} />
        )}

        {/* Footer */}
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-blue-800 font-medium">
                {t.poweredBy}
              </p>
              <p className="text-blue-700 text-sm">
                {t.designed}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
