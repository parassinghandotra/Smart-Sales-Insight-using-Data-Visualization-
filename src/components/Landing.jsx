import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Upload, Brain } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/upload');
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-4xl mx-auto text-center flex flex-col justify-center">
        <div className="mb-6">
          <p className="text-6xl font-bold mb-4 text-blue-900">
            Smart Sales Insights
          </p>
          <p className="text-lg md:text-xl text-gray-600 font-semibold mb-6 max-w-3xl mx-auto">
            Transform your sales data into actionable insights with powerful visualizations and AI-driven analysis
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-50 backdrop-blur-md rounded-lg p-5 border border-gray-200 shadow-lg">
            <Upload className="w-10 h-10 md:w-12 md:h-12 text-indigo-800 mx-auto mb-3" />
            <h3 className="text-md md:text-lg font-semibold mb-2 text-indigo-900">Easy Upload</h3>
            <p className="text-sm md:text-base text-gray-600">Support for CSV and Excel files with automatic data parsing</p>
          </div>
          <div className="bg-gray-50 backdrop-blur-md rounded-lg p-5 border border-gray-200 shadow-lg">
            <BarChart3 className="w-10 h-10 md:w-12 md:h-12 text-indigo-800 mx-auto mb-3" />
            <h3 className="text-md md:text-lg font-semibold mb-2 text-indigo-900">Visual Analytics</h3>
            <p className="text-sm md:text-base text-gray-600">Multiple chart types to visualize your sales performance</p>
          </div>
          <div className="bg-gray-50 backdrop-blur-md rounded-lg p-5 border border-gray-200 shadow-lg">
            <Brain className="w-10 h-10 md:w-12 md:h-12 text-indigo-800 mx-auto mb-3" />
            <h3 className="text-md md:text-lg font-semibold mb-2 text-indigo-900">AI Insights</h3>
            <p className="text-sm md:text-base text-gray-600">Smart recommendations powered by advanced AI analysis</p>
          </div>
        </div>
        
        <button
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-blue-800 to-purple-800 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg text-md md:text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl mx-auto"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Landing;