import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/Landing';
import FileUpload from './components/FileUpload';
import Insights from './components/Insights';
import AiInsights from './components/AiInsights';
import Header from './components/Header';

// Create context for sharing data across routes
const AppContext = createContext();

// Custom hook to use the app context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// Context Provider Component
function AppProvider({ children }) {
  const [salesData, setSalesData] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (data, name) => {
    setLoading(true);
    setTimeout(() => {
      setSalesData(data);
      setFileName(name);
      setLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setSalesData(null);
    setFileName('');
  };

  const value = {
    salesData,
    fileName,
    loading,
    handleFileUpload,
    handleReset
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Layout component for pages that need header
function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        {children}
      </main>
    </div>
  );
}

// Protected Route component to ensure data exists
function ProtectedRoute({ children }) {
  const { salesData } = useAppContext();
  
  if (!salesData) {
    return <Navigate to="/upload" replace />;
  }
  
  return children;
}

// Main App component
function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          {/* Landing page route */}
          <Route path="/" element={<Landing />} />
          
          {/* File upload route */}
          <Route 
            path="/upload" 
            element={
              <Layout>
                <FileUploadWrapper />
              </Layout>
            } 
          />
          
          {/* Insights route - protected */}
          <Route 
            path="/insights" 
            element={
              <Layout>
                <ProtectedRoute>
                  <InsightsWrapper />
                </ProtectedRoute>
              </Layout>
            } 
          />
          
          {/* AI Insights route - protected */}
          <Route 
            path="/ai-insights" 
            element={
              <Layout>
                <ProtectedRoute>
                  <AiInsightsWrapper />
                </ProtectedRoute>
              </Layout>
            } 
          />
          
          {/* Redirect any unknown routes to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}

// Wrapper components to handle routing logic
function FileUploadWrapper() {
  const { loading, handleFileUpload } = useAppContext();
  return <FileUpload onFileUpload={handleFileUpload} isLoading={loading} />;
}

function InsightsWrapper() {
  const { salesData, fileName } = useAppContext();
  return <Insights data={salesData} fileName={fileName} />;
}

function AiInsightsWrapper() {
  const { salesData, fileName } = useAppContext();
  return <AiInsights data={salesData} fileName={fileName} />;
}

export default App;