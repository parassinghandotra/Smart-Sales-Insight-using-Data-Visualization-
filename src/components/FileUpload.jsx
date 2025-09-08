import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, RefreshCw, FileText, BarChart3 } from 'lucide-react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

const FileUpload = ({ onFileUpload, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    if (fileExtension === 'csv') {
      Papa.parse(file, {
        complete: (result) => {
          onFileUpload(result.data, file.name);
          // Redirect to charts after successful upload
          setTimeout(() => {
            navigate('/insights');
          }, 1200); // Small delay to show processing feedback
        },
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true
      });
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        onFileUpload(jsonData, file.name);
        // Redirect to charts after successful upload
        setTimeout(() => {
          navigate('/insights');
        }, 1200); // Small delay to show processing feedback
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Please upload a CSV or Excel file');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 mt-5">
          <h2 className="text-4xl font-bold text-purple-950 mb-4">Upload Your Sales Data</h2>
          <p className="text-lg text-gray-600 font-semibold max-w-3xl mx-auto">
            Upload a CSV or Excel file to get started with your sales analysis and unlock powerful insights
          </p>
        </div>
        
        {/* Upload Area */}
        <div className="flex justify-center mb-8">
          <div
            className={`relative w-full max-w-2xl border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 transform hover:scale-[1.02] shadow-2xl ${
              dragActive 
                ? 'border-indigo-400 backdrop-blur-md scale-[1.02] bg-blue-50' 
                : 'border-gray-400 bg-white/20 backdrop-blur-md hover:bg-white/25 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isLoading}
            />
            
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="bg-white/30 backdrop-blur-md rounded-full p-4 mb-6 border border-white/40 shadow-lg">
                  <RefreshCw className="w-12 h-12 text-indigo-800 animate-spin" />
                </div>
                <p className="text-2xl font-bold text-purple-950 mb-2">Processing your file...</p>
                <p className="text-lg text-gray-600 font-semibold">You'll be redirected to charts shortly...</p>
                <div className="mt-6 bg-white/20 backdrop-blur-md rounded-full h-2 w-64 overflow-hidden border border-white/30">
                  <div className="bg-gradient-to-r from-blue-800 to-purple-800 h-full w-full animate-pulse"></div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="bg-white/30 backdrop-blur-md rounded-full p-4 mb-6 border border-white/40 shadow-lg">
                  <Upload className="w-12 h-12 text-indigo-800" />
                </div>
                <p className="text-2xl font-bold text-purple-950 mb-3">
                  Drop your file here or click to browse
                </p>
                <p className="text-lg text-gray-600 font-semibold mb-6">
                  Supports CSV, XLSX, and XLS formats
                </p>
                <button className="bg-gradient-to-r from-blue-800 to-purple-800 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                  Choose File
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl text-center">
            <div className="bg-white/20 backdrop-blur-md rounded-full p-3 w-16 h-16 mx-auto mb-4 border border-white/30">
              <FileText className="w-10 h-10 text-indigo-800 mx-auto" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-purple-950">Multiple Formats</h3>
            <p className="text-gray-600 font-medium">CSV, XLSX, and XLS files supported with automatic parsing</p>
          </div>
          
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl text-center">
            <div className="bg-white/20 backdrop-blur-md rounded-full p-3 w-16 h-16 mx-auto mb-4 border border-white/30">
              <BarChart3 className="w-10 h-10 text-indigo-800 mx-auto" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-purple-950">Instant Visualization</h3>
            <p className="text-gray-600 font-medium">Automatically generate charts and insights from your data</p>
          </div>
          
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl text-center">
            <div className="bg-white/20 backdrop-blur-md rounded-full p-3 w-16 h-16 mx-auto mb-4 border border-white/30">
              <RefreshCw className="w-10 h-10 text-indigo-800 mx-auto" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-purple-950">Smart Processing</h3>
            <p className="text-gray-600 font-medium">Advanced algorithms for data cleaning and optimization</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;