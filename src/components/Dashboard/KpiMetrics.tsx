import { getAnalytics } from '@/data/cardiacData';

interface KpiMetric {
  title: string;
  value: string | number;
  subtitle: string;
  color: 'red' | 'yellow' | 'blue' | 'green';
  trend?: number;
  trendLabel?: string;
}

export function KpiMetrics() {
  const analytics = getAnalytics();
  
  const kpiData: KpiMetric[] = [
    {
      title: "Critical Need Facilities",
      value: analytics.opportunities.criticalNeed,
      subtitle: "ECHO:CMR ratio >9:1",
      color: "red",
      trend: analytics.opportunities.criticalNeed > 2 ? -15 : 8,
      trendLabel: "vs last quarter"
    },
    {
      title: "High Opportunity Centers",
      value: analytics.opportunities.highOpportunity,
      subtitle: "ECHO:CMR ratio 6-9:1",
      color: "yellow",
      trend: 12,
      trendLabel: "growth potential"
    },
    {
      title: "Total CMR Volume",
      value: analytics.totals.cmrVolume,
      subtitle: "Monthly procedures across network",
      color: "blue",
      trend: analytics.growth.avgCmrGrowth,
      trendLabel: "YoY growth"
    },
    {
      title: "Revenue Opportunity",
      value: `$${Math.round(analytics.financial.totalRevenue / 1000)}K`,
      subtitle: "Monthly net CMR revenue",
      color: "green",
      trend: 28,
      trendLabel: "potential increase"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      red: 'border-red-500 text-red-600 bg-red-50',
      yellow: 'border-yellow-500 text-yellow-600 bg-yellow-50',
      blue: 'border-blue-500 text-blue-600 bg-blue-50',
      green: 'border-green-500 text-green-600 bg-green-50'
    };
    return colorMap[color as keyof typeof colorMap];
  };

  const getTrendClasses = (trend: number) => {
    return trend > 0 
      ? 'text-green-600 bg-green-100' 
      : 'text-red-600 bg-red-100';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((metric, index) => (
        <div key={index} className={`rounded-lg shadow-md p-6 border-l-4 transition-all hover:shadow-lg ${getColorClasses(metric.color)}`}>
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-semibold text-gray-700 leading-tight">{metric.title}</h3>
              {metric.trend && (
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTrendClasses(metric.trend)}`}>
                  {metric.trend > 0 ? '↗' : '↘'} {Math.abs(metric.trend)}%
                </div>
              )}
            </div>
            <div className={`text-3xl font-bold ${getColorClasses(metric.color).split(' ')[1]}`}>
              {metric.value}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-600">{metric.subtitle}</p>
              {metric.trendLabel && (
                <p className="text-xs text-gray-400">{metric.trendLabel}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}