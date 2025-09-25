interface ProviderData {
  name: string;
  specialty: string;
  facility: string;
  echoOrders: number;
  spectOrders: number;
  cctaOrders: number;
  cmrOrders: number;
  lostOpportunityScore: number;
  potentialCmrCases: number;
  lastCmrOrder: string;
  riskFactors: string[];
}

const providerData: ProviderData[] = [
  {
    name: "Dr. Sarah Chen",
    specialty: "Interventional Cardiology",
    facility: "Regional Medical Center",
    echoOrders: 45,
    spectOrders: 8,
    cctaOrders: 12,
    cmrOrders: 0,
    lostOpportunityScore: 98,
    potentialCmrCases: 15,
    lastCmrOrder: "Never",
    riskFactors: ["Complex valve cases", "High ECHO:CMR ratio", "Never ordered CMR"]
  },
  {
    name: "Dr. Michael Torres",
    specialty: "Electrophysiology",
    facility: "University Hospital",
    echoOrders: 32,
    spectOrders: 5,
    cctaOrders: 18,
    cmrOrders: 1,
    lostOpportunityScore: 85,
    potentialCmrCases: 12,
    lastCmrOrder: "8 months ago",
    riskFactors: ["EP procedures requiring detailed imaging", "Low CMR utilization"]
  },
  {
    name: "Dr. Jennifer Wang",
    specialty: "Structural Heart",
    facility: "Metro Cardiac Center",
    echoOrders: 28,
    spectOrders: 3,
    cctaOrders: 15,
    cmrOrders: 8,
    lostOpportunityScore: 45,
    potentialCmrCases: 3,
    lastCmrOrder: "2 weeks ago",
    riskFactors: ["Moderate CMR utilization"]
  },
  {
    name: "Dr. Robert Kim",
    specialty: "General Cardiology",
    facility: "Heart Institute",
    echoOrders: 65,
    spectOrders: 15,
    cctaOrders: 8,
    cmrOrders: 0,
    lostOpportunityScore: 92,
    potentialCmrCases: 8,
    lastCmrOrder: "Never",
    riskFactors: ["High volume practice", "No CMR orders", "Potential education opportunity"]
  }
];

export function ProviderAnalysis() {
  const getSpecialtyColor = (specialty: string) => {
    if (specialty.includes('Interventional')) return 'bg-red-100 text-red-800';
    if (specialty.includes('Electrophysiology')) return 'bg-yellow-100 text-yellow-800';
    if (specialty.includes('Structural')) return 'bg-green-100 text-green-800';
    return 'bg-blue-100 text-blue-800';
  };

  const getOpportunityScoreColor = (score: number) => {
    if (score >= 90) return 'bg-red-500';
    if (score >= 70) return 'bg-yellow-500';
    if (score >= 50) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-gray-800">Provider Opportunity Analysis</h2>
          <p className="text-sm text-gray-600">Identify high-potential providers for CMR adoption</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ECHO</th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">CMR</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last CMR Order</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opportunity Score</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Potential Cases</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Factors</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {providerData.map((provider, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{provider.name}</div>
                  <div className="text-xs text-gray-500">{provider.facility}</div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSpecialtyColor(provider.specialty)}`}>
                    {provider.specialty}
                  </span>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-blue-600 font-medium">{provider.echoOrders}</div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-center">
                  <div className={`text-sm font-medium ${provider.cmrOrders === 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {provider.cmrOrders}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className={`text-sm ${provider.lastCmrOrder === 'Never' ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                    {provider.lastCmrOrder}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getOpportunityScoreColor(provider.lostOpportunityScore)}`}
                        style={{width: `${provider.lostOpportunityScore}%`}}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{provider.lostOpportunityScore}</span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-green-600">+{provider.potentialCmrCases}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-xs text-gray-600 flex flex-col gap-1">
                    {provider.riskFactors.map((factor, i) => (
                      <div key={i}>• {factor}</div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}