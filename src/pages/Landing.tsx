
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Satellite, Cloud, Users, Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");

  // Language translations
  const translations = {
    en: {
      teamName: "Team CloudVision",
      hackathonTitle: "Bharatiya Antariksh Hackathon 2025",
      launchApp: "Launch Application",
      projectTitle: "Chase the Cloud: Leveraging Diffusion Models for Cloud Motion Prediction using INSAT-3DR/3DS Imagery",
      projectDescription: "This project focuses on predicting cloud motion using diffusion models, a class of deep generative networks, applied to satellite imagery from INSAT-3DR/3DS. Traditional optical flow or physics-based models often falter when confronted with volatile weather dynamics. In contrast, this approach uses spatio-temporal learning to simulate realistic cloud evolution from multi-spectral past frames, delivering enhanced forecasting for short-term (0–3 hours) applications including nowcasting and early warnings for severe weather events.",
      aboutTitle: "About Our Project",
      teamTitle: "Our Team",
      teamDescription: "We are a dedicated team of researchers and developers working on advancing geospatial prediction technology for better weather forecasting and climate analysis.",
      teamMembers: "Team Members",
      teamLead: "Team Lead",
      developer: "Developer",
      researcher: "Researcher",
      analyst: "Data Analyst",
      govIndia: "Government of India",
      govIndiaHindi: "भारत सरकार",
      hindi: "हिंदी",
      english: "English"
    },
    hi: {
      teamName: "टीम क्लाउडविज़न",
      hackathonTitle: "भारतीय अंतरिक्ष हैकाथॉन 2025",
      launchApp: "एप्लिकेशन लॉन्च करें",
      projectTitle: "चेज़ द क्लाउड: इनसैट-3डीआर/3डीएस इमेजरी का उपयोग करके क्लाउड मोशन पूर्वानुमान के लिए डिफ्यूजन मॉडल का लाभ उठाना",
      projectDescription: "यह परियोजना इनसैट-3डीआर/3डीएस से उपग्रह छवियों पर लागू डिफ्यूजन मॉडल, एक प्रकार के गहरे जेनेरेटिव नेटवर्क का उपयोग करके क्लाउड मोशन की भविष्यवाणी करने पर केंद्रित है। पारंपरिक ऑप्टिकल फ्लो या भौतिकी-आधारित मॉडल अक्सर अस्थिर मौसम गतिशीलता के सामने असफल हो जाते हैं। इसके विपरीत, यह दृष्टिकोण बहु-स्पेक्ट्रल पिछले फ्रेम से वास्तविक क्लाउड विकास का अनुकरण करने के लिए स्थानिक-अस्थायी शिक्षा का उपयोग करता है, नाउकास्टिंग और गंभीर मौसम घटनाओं के लिए प्रारंभिक चेतावनी सहित अल्पकालिक (0-3 घंटे) अनुप्रयोगों के लिए बेहतर पूर्वानुमान प्रदान करता है।",
      aboutTitle: "हमारी परियोजना के बारे में",
      teamTitle: "हमारी टीम",
      teamDescription: "हम बेहतर मौसम पूर्वानुमान और जलवायु विश्लेषण के लिए भूस्थानिक पूर्वानुमान तकनीक को आगे बढ़ाने पर काम करने वाले शोधकर्ताओं और डेवलपर्स की एक समर्पित टीम हैं।",
      teamMembers: "टीम के सदस्य",
      teamLead: "टीम लीड",
      developer: "डेवलपर",
      researcher: "शोधकर्ता",
      analyst: "डेटा विश्लेषक",
      govIndia: "Government of India",
      govIndiaHindi: "भारत सरकार",
      hindi: "हिंदी",
      english: "English"
    }
  };

  const t = translations[language];

  const teamMembers = [
    { name: "Rajesh Kumar", role: t.teamLead, isLead: true },
    { name: "Priya Sharma", role: t.developer, isLead: false },
    { name: "Amit Singh", role: t.researcher, isLead: false },
    { name: "Sneha Patel", role: t.analyst, isLead: false }
  ];

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
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 ${fontSizeClass}`}>
      {/* ISRO Government Navbar */}
      <nav className="bg-white shadow-sm border-b border-blue-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              {/* ISRO Logo with Flag */}
              <div className="flex items-center space-x-2">
                <div className="w-12 h-8 bg-gradient-to-b from-blue-500 via-white to-blue-600 rounded-sm flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-white to-blue-600"></div>
                  <Satellite className="h-6 w-6 text-blue-800 relative z-10" />
                </div>
                <div className="text-blue-600 font-bold text-lg">ISRO</div>
              </div>
              
              {/* Government Text */}
              <div className="border-l border-gray-300 pl-4">
                <div className="text-blue-600 font-semibold text-lg">
                  {t.govIndia}
                </div>
                <div className="text-blue-600 text-sm font-medium">
                  {t.govIndiaHindi}
                </div>
              </div>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-4">
              {/* Font Size Controls */}
              <div className="flex items-center space-x-1 text-gray-600">
                <span className="text-sm">A</span>
                <button
                  onClick={decreaseFontSize}
                  className="text-gray-600 hover:text-blue-600 text-lg"
                  disabled={fontSize === "small"}
                >
                  -
                </button>
                <span className="text-gray-400">|</span>
                <button
                  onClick={increaseFontSize}
                  className="text-gray-600 hover:text-blue-600"
                  disabled={fontSize === "large"}
                >
                  +
                </button>
                <span className="text-lg">A</span>
              </div>
              
              {/* Language Toggle */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 text-sm font-medium rounded ${
                    language === "en" 
                      ? "bg-blue-600 text-white" 
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage("hi")}
                  className={`px-3 py-1 text-sm font-medium rounded ${
                    language === "hi" 
                      ? "bg-blue-600 text-white" 
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  हिंदी
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 rounded-3xl opacity-50 blur-3xl"></div>
            
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-blue-200">
              <div className="flex justify-center items-center space-x-6 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-lg opacity-30"></div>
                  <div className="relative p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full">
                    <Satellite className="h-20 w-20 text-white" />
                  </div>
                </div>
              </div>

              <div className="max-w-4xl mx-auto space-y-6">
                {/* Team Name */}
                <h1 className="text-4xl font-bold text-blue-800 mb-4">
                  {t.teamName}
                </h1>
                
                {/* Hackathon Title */}
                <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 px-8 py-3 text-lg mb-6">
                  <Trophy className="h-5 w-5 mr-2" />
                  {t.hackathonTitle}
                </Badge>
                
                {/* Launch App Button */}
                <div className="mb-8">
                  <Link to="/app">
                    <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xl px-12 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                      {t.launchApp}
                      <ArrowRight className="h-6 w-6 ml-3" />
                    </Button>
                  </Link>
                </div>
                
                {/* Project Title */}
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
                  {t.projectTitle}
                </h2>
                
                {/* Project Description */}
                <p className="text-lg leading-relaxed text-gray-700">
                  {t.projectDescription}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <Card id="about" className="border-2 border-blue-200 shadow-xl bg-gradient-to-r from-blue-50 to-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200">
            <CardTitle className="flex items-center space-x-2 text-blue-800 text-2xl">
              <Cloud className="h-6 w-6" />
              <span>{t.aboutTitle}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-blue-200">
                <CardContent className="pt-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Satellite className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">INSAT Technology</h3>
                  <p className="text-gray-600">Advanced satellite imagery processing for accurate weather prediction</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-blue-200">
                <CardContent className="pt-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Cloud className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">AI Prediction</h3>
                  <p className="text-gray-600">Machine learning models for enhanced cloud motion forecasting</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-blue-200">
                <CardContent className="pt-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Real-time Analysis</h3>
                  <p className="text-gray-600">Instant weather pattern analysis and early warning systems</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <Card className="border-2 border-blue-200 shadow-xl bg-gradient-to-r from-blue-50 to-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200">
            <CardTitle className="flex items-center space-x-2 text-blue-800 text-2xl">
              <Users className="h-6 w-6" />
              <span>{t.teamTitle}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <p className="text-gray-700 text-lg mb-8">
              {t.teamDescription}
            </p>
            
            <div>
              <h3 className="text-2xl font-semibold text-blue-700 mb-6">{t.teamMembers}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <Card key={index} className={`text-center hover:shadow-lg transition-shadow ${member.isLead ? 'border-blue-300 bg-blue-50' : 'border-blue-200 bg-blue-25'}`}>
                    <CardContent className="pt-6">
                      <div className={`w-20 h-20 ${member.isLead ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-blue-500 to-blue-600'} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                        <span className="text-white font-bold text-xl">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-800 text-lg">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.role}</p>
                      {member.isLead && (
                        <Badge className="mt-2 bg-blue-100 text-blue-700 border-blue-300">
                          TL
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-2xl">
          <CardContent className="pt-8 pb-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Satellite className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-xl font-bold">ISRO Weather Prediction System</p>
                  <p className="text-blue-100">Government of India</p>
                </div>
              </div>
              <p className="text-lg">
                Powered by Indigenous INSAT Satellite Data & Advanced Diffusion Models
              </p>
              <p className="text-blue-100">
                Designed for operational integration with IMD & NESAC platforms
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Landing;
