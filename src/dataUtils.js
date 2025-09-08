// Utility functions for data processing

export const processDataForCharts = (data) => {
  if (!data || data.length === 0) return {};

  // Sample data processing - adapt based on your actual data structure
  const sampleData = data.slice(0, 50); // Limit for performance
  
  // Sales over time (assuming date and sales columns exist)
  const salesOverTime = sampleData.map((item, index) => ({
    name: item.Date || item.date || `Day ${index + 1}`,
    sales: parseFloat(item.Sales || item.sales || item.Amount || item.amount || Math.random() * 1000),
    revenue: parseFloat(item.Revenue || item.revenue || item.Total || item.total || Math.random() * 2000)
  }));

  // Product performance
  const productData = sampleData.reduce((acc, item) => {
    const product = item.Product || item.product || item.Item || item.item || `Product ${Math.floor(Math.random() * 5) + 1}`;
    acc[product] = (acc[product] || 0) + parseFloat(item.Sales || item.sales || Math.random() * 100);
    return acc;
  }, {});

  const productChart = Object.entries(productData).map(([name, value]) => ({
    name,
    value: Math.round(value)
  }));

  // Region/Category breakdown
  const categoryData = sampleData.reduce((acc, item) => {
    const category = item.Category || item.category || item.Region || item.region || `Category ${Math.floor(Math.random() * 4) + 1}`;
    acc[category] = (acc[category] || 0) + parseFloat(item.Sales || item.sales || Math.random() * 200);
    return acc;
  }, {});

  const categoryChart = Object.entries(categoryData).map(([name, sales]) => ({
    name,
    sales: Math.round(sales)
  }));

  return { salesOverTime, productChart, categoryChart };
};

export const createDataSummaryForAI = (data, fileName) => {
  return {
    totalRecords: data.length,
    columns: Object.keys(data[0] || {}),
    sampleData: data.slice(0, 5),
    fileName
  };
};

export const generateAIPrompt = (dataSummary) => {
  return `Analyze this sales data and provide actionable business insights:
  
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
};