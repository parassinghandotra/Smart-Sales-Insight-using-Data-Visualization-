import React, { useState } from 'react';
import { IndianRupee, TrendingUp, Users, Calendar } from 'lucide-react';
import SalesOverviewChart from './charts/SalesOverviewChart';
import SalesTrendsChart from './charts/SalesTrendsChart';
import ProductPerformanceChart from './charts/ProductPerformanceChart';
import CategoryAnalysisChart from './charts/CategoryAnalysisChart';

const Insights = ({ data, fileName }) => {
  const [activeChart, setActiveChart] = useState('overview');

  // Process data for different visualizations
  const processDataForCharts = () => {
    if (!data || data.length === 0) return {};

    const sampleData = data.slice(0, 50);
    
    // Group data by date and calculate daily totals
    const dailyData = sampleData.reduce((acc, item) => {
      const date = item.Date || item.date || `Day ${Object.keys(acc).length + 1}`;
      if (!acc[date]) {
        acc[date] = { sales: 0, revenue: 0 };
      }
      acc[date].sales += parseFloat(item.Sales || item.sales || 0);
      acc[date].revenue += parseFloat(item.Profit || item.profit || 0); // Revenue is sum of profit
      return acc;
    }, {});

    const salesOverTime = Object.entries(dailyData).map(([date, data]) => ({
      name: date,
      sales: Math.round(data.sales),
      revenue: Math.round(data.revenue)
    }));

    const productData = sampleData.reduce((acc, item) => {
      const product = item.Product || item.product || item.Product_name || item['Product_name'] || `Product ${Math.floor(Math.random() * 5) + 1}`;
      acc[product] = (acc[product] || 0) + parseFloat(item.Sales || item.sales || 0);
      return acc;
    }, {});

    const productChart = Object.entries(productData).map(([name, value]) => ({
      name,
      value: Math.round(value)
    }));

    const categoryData = sampleData.reduce((acc, item) => {
      const category = item.Category || item.category || `Category ${Math.floor(Math.random() * 4) + 1}`;
      acc[category] = (acc[category] || 0) + parseFloat(item.Sales || item.sales || 0);
      return acc;
    }, {});

    const categoryChart = Object.entries(categoryData).map(([name, sales]) => ({
      name,
      sales: Math.round(sales)
    }));

    return { salesOverTime, productChart, categoryChart };
  };

  const { salesOverTime, productChart, categoryChart } = processDataForCharts();

  const charts = {
    overview: {
      title: 'Sales Overview',
      component: <SalesOverviewChart data={salesOverTime} />
    },
    trends: {
      title: 'Sales Trends',
      component: <SalesTrendsChart data={salesOverTime} />
    },
    products: {
      title: 'Product Performance',
      component: <ProductPerformanceChart data={productChart} />
    },
    categories: {
      title: 'Category Analysis',
      component: <CategoryAnalysisChart data={categoryChart} />
    }
  };

  // Calculate summary statistics
  const totalSales = salesOverTime.reduce((sum, item) => sum + item.sales, 0);
  const avgSales = totalSales / salesOverTime.length;
  const totalRevenue = salesOverTime.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <div className="w-screen mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sales Insights</h2>
        <p className="text-gray-600">Analysis for: {fileName}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <IndianRupee className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">Rs.{totalSales.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Average Sale</p>
              <p className="text-2xl font-bold text-gray-900">Rs.{avgSales.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Records</p>
              <p className="text-2xl font-bold text-gray-900">{data.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-orange-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Profit</p>
              <p className="text-2xl font-bold text-gray-900">Rs.{totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(charts).map(([key, chart]) => (
          <button
            key={key}
            onClick={() => setActiveChart(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeChart === key
                ? 'bg-purple-200 text-purple-700 border-2 border-purple-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-300 border-2 border-gray-900'
            }`}
          >
            {chart.title}
          </button>
        ))}
      </div>

      {/* Active Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{charts[activeChart].title}</h3>
        {charts[activeChart].component}
      </div>
    </div>
  );
};

export default Insights;