interface LostOpportunityMetric {
  metric: string;
  description: string;
  monthlyLoss: number;
  revenueImpact: string;
  qualityScore: number;
}

const lostOpportunityMetrics: LostOpportunityMetric[] = [
  {
    metric: "Valve Disease Misdiagnosis Risk",
    description: "ECHO inadequate for valve assessment vs CMR gold standard",
    monthlyLoss: 145,
    revenueImpact: "$11.6M",
    qualityScore: 85
  },
  {
    metric: "Pre-surgical Planning Delays",
    description: "Procedures delayed due to inadequate imaging requiring repeat studies",
    monthlyLoss: 67,
    revenueImpact: "$5.4M",
    qualityScore: 92
  },
  {
    metric: "Unnecessary Invasive Procedures",
    description: "Cardiac catheterizations that could be avoided with CMR",
    monthlyLoss: 89,
    revenueImpact: "$7.1M",
    qualityScore: 78
  },
  {
    metric: "Patient Transfers",
    description: "Patients transferred to other facilities for advanced imaging",
    monthlyLoss: 23,
    revenueImpact: "$1.8M",
    qualityScore: 95
  }
];

export function LostOpportunityAnalytics() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Lost Opportunity Analytics</h2>
          <div className="text-sm text-gray-500">Real-time data analysis</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {lostOpportunityMetrics.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex flex-col gap-2">
                <h3 className="font-medium text-gray-800 text-sm">{item.metric}</h3>
                <div className="text-2xl font-bold text-red-600">{item.monthlyLoss}</div>
                <div className="text-xs text-gray-500">cases/month</div>
                <div className="text-sm font-medium text-green-600">{item.revenueImpact}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-orange-500"
                      style={{width: `${item.qualityScore}%`}}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">{item.qualityScore}%</span>
                </div>
                <p className="text-xs text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}