interface TargetingAlgorithm {
  name: string;
  description: string;
  criteria: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Strategic';
  count: number;
  avgPotential: number;
}

const targetingAlgorithms: TargetingAlgorithm[] = [
  {
    name: "Never CMR Prescribers",
    description: "Providers who have never ordered CMR despite high cardiac imaging volume",
    criteria: "ECHO volume >30/month AND CMR orders = 0",
    priority: "Critical",
    count: 247,
    avgPotential: 12
  },
  {
    name: "Dormant CMR Users",
    description: "Previously ordered CMR but stopped (>6 months since last order)",
    criteria: "Last CMR order >6 months AND current ECHO >20/month",
    priority: "High",
    count: 156,
    avgPotential: 8
  },
  {
    name: "Low CMR Utilizers",
    description: "Use CMR but at suboptimal rates given their specialty/volume",
    criteria: "ECHO:CMR ratio >25:1 AND specialty = Interventional/EP/Structural",
    priority: "Medium",
    count: 89,
    avgPotential: 6
  },
  {
    name: "Geographic Gaps",
    description: "High-volume facilities in markets without CMR programs",
    criteria: "Facility ECHO volume >100/month AND no CMR capability",
    priority: "Strategic",
    count: 34,
    avgPotential: 25
  }
];

export function TargetingAlgorithms() {
  const getPriorityColor = (priority: string) => {
    const priorityColors = {
      'Critical': 'bg-red-100 text-red-800',
      'High': 'bg-yellow-100 text-yellow-800',
      'Medium': 'bg-blue-100 text-blue-800',
      'Strategic': 'bg-purple-100 text-purple-800'
    };
    return priorityColors[priority as keyof typeof priorityColors];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Data-Driven Targeting Algorithms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {targetingAlgorithms.map((algorithm, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-800">{algorithm.name}</h3>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(algorithm.priority)}`}>
                {algorithm.priority}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{algorithm.description}</p>
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <div className="text-xs font-medium text-gray-700 mb-1">Targeting Criteria:</div>
              <div className="text-xs text-gray-600 font-mono">{algorithm.criteria}</div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-bold text-gray-900">{algorithm.count}</div>
                <div className="text-xs text-gray-500">identified providers</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">{algorithm.avgPotential}</div>
                <div className="text-xs text-gray-500">avg potential cases</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}