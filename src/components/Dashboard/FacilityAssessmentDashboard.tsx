interface FacilityData {
  name: string;
  echoVolume: number;
  spectVolume: number;
  cctaVolume: number;
  cmrVolume: number;
  echoToCmrRatio: string;
  status: 'Critical Need' | 'High Opportunity' | 'Moderate Need' | 'Balanced';
  needsScore: number;
  ownership: 'Cardiology-owned' | 'Radiology-owned' | 'Hybrid';
}

const facilityData: FacilityData[] = [
  {
    name: "Regional Medical Center",
    echoVolume: 150,
    spectVolume: 25,
    cctaVolume: 40,
    cmrVolume: 3,
    echoToCmrRatio: "50:1",
    status: "High Opportunity",
    needsScore: 95,
    ownership: "Cardiology-owned"
  },
  {
    name: "University Hospital",
    echoVolume: 200,
    spectVolume: 30,
    cctaVolume: 60,
    cmrVolume: 2,
    echoToCmrRatio: "100:1",
    status: "Critical Need",
    needsScore: 98,
    ownership: "Radiology-owned"
  },
  {
    name: "Metro Cardiac Center",
    echoVolume: 80,
    spectVolume: 15,
    cctaVolume: 35,
    cmrVolume: 12,
    echoToCmrRatio: "7:1",
    status: "Moderate Need",
    needsScore: 65,
    ownership: "Cardiology-owned"
  },
  {
    name: "Heart Institute",
    echoVolume: 45,
    spectVolume: 12,
    cctaVolume: 18,
    cmrVolume: 8,
    echoToCmrRatio: "6:1",
    status: "Balanced",
    needsScore: 45,
    ownership: "Hybrid"
  }
];

export function FacilityAssessmentDashboard() {
  const getStatusColor = (status: string) => {
    const statusColors = {
      'Critical Need': 'bg-red-100 text-red-800',
      'High Opportunity': 'bg-yellow-100 text-yellow-800',
      'Moderate Need': 'bg-blue-100 text-blue-800',
      'Balanced': 'bg-green-100 text-green-800'
    };
    return statusColors[status as keyof typeof statusColors];
  };

  const getOwnershipColor = (ownership: string) => {
    const ownershipColors = {
      'Cardiology-owned': 'bg-purple-100 text-purple-800',
      'Radiology-owned': 'bg-indigo-100 text-indigo-800',
      'Hybrid': 'bg-gray-100 text-gray-800'
    };
    return ownershipColors[ownership as keyof typeof ownershipColors];
  };

  const getNeedsScoreColor = (score: number) => {
    if (score >= 90) return 'bg-red-500';
    if (score >= 70) return 'bg-yellow-500';
    if (score >= 50) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-gray-800">Facility Assessment Dashboard</h2>
          <p className="text-sm text-gray-600">Identify facilities with suboptimal cardiac imaging utilization patterns</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facility</th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ECHO</th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">SPECT</th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">CCTA</th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">CMR</th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ECHO:CMR</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ownership</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Needs Score</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {facilityData.map((facility, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{facility.name}</div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-blue-600 font-medium">{facility.echoVolume}</div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-yellow-600 font-medium">{facility.spectVolume}</div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-green-600 font-medium">{facility.cctaVolume}</div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-red-600 font-medium">{facility.cmrVolume}</div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900 font-mono">{facility.echoToCmrRatio}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getOwnershipColor(facility.ownership)}`}>
                    {facility.ownership}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getNeedsScoreColor(facility.needsScore)}`}
                        style={{width: `${facility.needsScore}%`}}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{facility.needsScore}</span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(facility.status)}`}>
                    {facility.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}