import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, Upload, Brain, Home } from 'lucide-react';
import { useAppContext } from '../App'; // Adjust import path as needed

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { salesData, handleReset } = useAppContext();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleResetAndGoHome = () => {
    handleReset();
    navigate('/');
  };

  const currentPath = location.pathname;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 -mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleResetAndGoHome}
              className="flex items-center space-x-2 group"
            >
              <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                Smart Sales Insights
              </span>
            </button>
          </div>
          
          {/* Navigation */}
          {salesData && (
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => handleNavigation('/')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPath === '/'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </button>
              <button
                onClick={() => handleNavigation('/insights')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPath === '/insights'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Charts
              </button>
              <button
                onClick={() => handleNavigation('/ai-insights')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPath === '/ai-insights'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Brain className="w-4 h-4 mr-2" />
                AI Insights
              </button>
              <button
                onClick={handleResetAndGoHome}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                New File
              </button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;