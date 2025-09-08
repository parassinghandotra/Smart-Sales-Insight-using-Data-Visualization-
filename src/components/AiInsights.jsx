import React, { useState } from 'react';
import { Brain, RefreshCw } from 'lucide-react';

const AiInsights = ({ data, fileName }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = 'AIzaSyBFivMuCtyq1GrVM8ObGQlfo5y1BmEI1uI';

  const generateInsights = async () => {
    setLoading(true);
    try {
      const dataSummary = {
        totalRecords: data.length,
        columns: Object.keys(data[0] || {}),
        sampleData: data.slice(0, 5),
        fileName
      };

      const prompt = `Analyze this sales data and provide actionable business insights:
      
      Data Summary:
      - Total Records: ${dataSummary.totalRecords}
      - Columns: ${dataSummary.columns.join(', ')}
      - File: ${dataSummary.fileName}
      
      Sample Data:
      ${JSON.stringify(dataSummary.sampleData, null, 2)}
      
      Please provide:
      1. Key trends and patterns
      2. Performance insights
      3. Recommendations for improvement
      4. Potential opportunities
      5. Risk factors to consider
      
      Format the response as structured insights with clear headings.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      const result = await response.json();
      
      if (result.candidates && result.candidates[0]) {
        setInsights(result.candidates[0].content.parts[0].text);
      } else {
        throw new Error('No insights generated');
      }
    } catch (error) {
      console.error('Error generating insights:', error);
      alert('Error generating AI insights. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Insights</h2>
        <p className="text-gray-600">Get intelligent analysis and recommendations for your sales data</p>
      </div>

      {/* API Key Input */}
      <div className="bg-white w-1/3 rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Click Generate Insights to generate AI insights</h3>
        {/* <h3 className="text-lg font-semibold text-gray-900 mb-4">Gemini API Configuration</h3> */}
        {/* <div className="flex gap-4">
          <input
            type="password"
            placeholder="Enter your Gemini API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          /> */}
          <button
            onClick={generateInsights}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4" />
                Generate Insights
              </>
            )}
          </button>
        {/* </div> */}
        {/* <p className="text-sm text-gray-500 mt-2">
          Get your free API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google AI Studio</a>
        </p> */}
      </div>

      {/* Insights Display */}
      {insights && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-500" />
            AI Analysis Results
          </h3>
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap text-gray-700 font-sans leading-relaxed">
              {insights}
            </pre>
          </div>
        </div>
      )}

      {!insights && !loading && (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ready for AI Analysis</h3>
          <p className="text-gray-600">Enter your Gemini API key and click "Generate Insights" to get intelligent analysis of your sales data.</p>
        </div>
      )}
    </div>
  );
};

export default AiInsights;