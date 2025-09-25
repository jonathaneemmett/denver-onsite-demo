'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBullseye, 
  faChartLine, 
  faHeart, 
  faHospital,
  faFish,
  faTrophy,
  faSeedling,
  faArrowUp,
  faChartBar,
  faInfo,
  faExclamationTriangle,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { cardiacCenters } from '@/data/cardiacData';

// Transform centralized data for this component's interface
const transformedCenters = cardiacCenters.map(center => ({
  id: center.id,
  name: center.name,
  location: center.location,
  type: center.type,
  targetingScore: Math.round(
    (center.market.currentPenetration + 
     center.ratios.utilizationRate + 
     (center.growth.cmrYoY * 2)) / 4
  ),
  cctaGrowth: center.growth.cctaYoY,
  cmrVolume: center.volumes.cmrMonthly,
  structuralHeart: center.operations.hasStructuralProgram,
  staffingGap: center.operations.staffingGap,
  riskScore: center.market.riskScore,
  potentialPatients: Math.round(center.market.totalAddressableMarket * (center.market.currentPenetration / 100))
}));

type ViewMode = 'targeting' | 'growth' | 'volume' | 'facilities';

const facilityConfig = {
  whale: {
    icon: faFish,
    color: 'bg-red-500',
    borderColor: 'border-red-600',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
    label: 'Whale (High Volume)'
  },
  excellence: {
    icon: faTrophy,
    color: 'bg-yellow-500',
    borderColor: 'border-yellow-600',
    textColor: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    label: 'Center of Excellence'
  },
  upAndComing: {
    icon: faArrowUp,
    color: 'bg-blue-500',
    borderColor: 'border-blue-600',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    label: 'Up and Coming'
  },
  emerging: {
    icon: faSeedling,
    color: 'bg-green-500',
    borderColor: 'border-green-600',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
    label: 'Emerging'
  }
};

const getScoreColor = (score: number) => {
  if (score >= 85) return 'text-red-600 bg-red-50';
  if (score >= 70) return 'text-orange-600 bg-orange-50';
  if (score >= 55) return 'text-yellow-600 bg-yellow-50';
  return 'text-green-600 bg-green-50';
};

export function DemographicOpportunityMap() {
  const [viewMode, setViewMode] = useState<ViewMode>('targeting');
  const [selectedCenter, setSelectedCenter] = useState<typeof transformedCenters[0] | null>(null);

  const getDisplayValue = (center: typeof transformedCenters[0]) => {
    switch (viewMode) {
      case 'targeting':
        return center.targetingScore;
      case 'growth':
        return `${center.cctaGrowth}%`;
      case 'volume':
        return center.cmrVolume;
      case 'facilities':
        return <FontAwesomeIcon icon={facilityConfig[center.type]?.icon || faHospital} className="w-3 h-3" />;
      default:
        return center.targetingScore;
    }
  };

  const sortedCenters = [...transformedCenters].sort((a, b) => {
    switch (viewMode) {
      case 'targeting':
        return b.targetingScore - a.targetingScore;
      case 'growth':
        return b.cctaGrowth - a.cctaGrowth;
      case 'volume':
        return b.cmrVolume - a.cmrVolume;
      case 'facilities':
        return a.type.localeCompare(b.type);
      default:
        return b.targetingScore - a.targetingScore;
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="px-6 py-4 bg-gray-50 border-b rounded-t-lg">
        <h2 className="text-xl font-semibold text-gray-800">
          Cardiac Imaging Centers Intelligence
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Advanced targeting for Centers of Excellence, Whales, and Up-and-Coming programs
        </p>
      </div>

      <div className="p-6">
        {/* View Mode Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <span className="text-sm font-semibold text-slate-700">View:</span>
          {[
            { key: 'targeting', label: 'Targeting Score', icon: faBullseye },
            { key: 'growth', label: 'CCTA Growth', icon: faChartLine },
            { key: 'volume', label: 'CMR Volume', icon: faHeart },
            { key: 'facilities', label: 'Facility Type', icon: faHospital }
          ].map((mode) => (
            <button
              key={mode.key}
              onClick={() => setViewMode(mode.key as ViewMode)}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 flex items-center gap-2 ${
                viewMode === mode.key
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white text-slate-600 border-gray-200 hover:bg-blue-50 hover:border-blue-300'
              }`}
            >
              <FontAwesomeIcon icon={mode.icon} className="w-4 h-4" />
              <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Centers List */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedCenters.map((center) => {
                const config = facilityConfig[center.type] || facilityConfig.emerging;
                return (
                  <div
                    key={center.id}
                    onClick={() => setSelectedCenter(center)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedCenter?.id === center.id
                        ? `${config.borderColor} ${config.bgColor} shadow-lg`
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                          {center.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">{center.location}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <FontAwesomeIcon icon={config.icon} className="w-5 h-5 text-gray-600" />
                        <div className={`px-2 py-1 rounded text-xs font-bold ${getScoreColor(getDisplayValue(center) as number)}`}>
                          {getDisplayValue(center)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <div className="font-medium text-gray-900">{center.targetingScore}</div>
                        <div className="text-gray-500">Score</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-900">{center.cctaGrowth}%</div>
                        <div className="text-gray-500">Growth</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-900">{center.cmrVolume}</div>
                        <div className="text-gray-500">CMR/mo</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-xs">
                        {center.structuralHeart && (
                          <span className="flex items-center gap-1 text-green-600">
                            <FontAwesomeIcon icon={faHeart} className="w-3 h-3" /> Structural
                          </span>
                        )}
                        {center.staffingGap && (
                          <span className="flex items-center gap-1 text-orange-600">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="w-3 h-3" /> Staffing Gap
                          </span>
                        )}
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${config.textColor} ${config.bgColor}`}>
                        {config.label.split(' ')[0]}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {selectedCenter ? selectedCenter.name : 'Select a Center'}
              </h3>
              <p className="text-sm text-gray-600">
                {selectedCenter 
                  ? `${facilityConfig[selectedCenter.type]?.label || 'Unknown type'} - Click another for comparison`
                  : 'Click on a center above to see detailed targeting intelligence'
                }
              </p>
            </div>

            {selectedCenter && (
              <div className="space-y-4">
                {/* Targeting Score */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon={faBullseye} className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-purple-800">Targeting Intelligence</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${
                        selectedCenter.targetingScore >= 85 ? 'text-red-600' :
                        selectedCenter.targetingScore >= 70 ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {selectedCenter.targetingScore}
                      </div>
                      <div className="text-xs text-gray-500">Targeting Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        <FontAwesomeIcon icon={facilityConfig[selectedCenter.type]?.icon || faHospital} className="w-6 h-6" />
                      </div>
                      <div className="text-xs text-gray-500">{facilityConfig[selectedCenter.type]?.label || 'Unknown'}</div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon={faChartBar} className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-blue-800">Performance</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-600">{selectedCenter.cctaGrowth}%</div>
                      <div className="text-xs text-gray-500">CCTA Growth</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-600">{selectedCenter.cmrVolume}</div>
                      <div className="text-xs text-gray-500">CMR Volume</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-600">{selectedCenter.potentialPatients.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Potential</div>
                    </div>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon={faInfo} className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-800">Status</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Structural Heart Program</span>
                      <span className={`text-sm font-medium flex items-center gap-1 ${
                        selectedCenter.structuralHeart ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        <FontAwesomeIcon icon={selectedCenter.structuralHeart ? faCheck : faTimes} className="w-3 h-3" />
                        {selectedCenter.structuralHeart ? 'Active' : 'None'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Staffing Gap</span>
                      <span className={`text-sm font-medium flex items-center gap-1 ${
                        selectedCenter.staffingGap ? 'text-orange-600' : 'text-green-600'
                      }`}>
                        <FontAwesomeIcon icon={selectedCenter.staffingGap ? faExclamationTriangle : faCheck} className="w-3 h-3" />
                        {selectedCenter.staffingGap ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Risk Score</span>
                      <span className="text-sm font-medium text-gray-700">
                        {selectedCenter.riskScore}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">
              {transformedCenters.filter(c => c.type === 'whale').length}
            </div>
            <div className="text-xs text-gray-500">Whales</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">
              {transformedCenters.filter(c => c.type === 'upAndComing').length}
            </div>
            <div className="text-xs text-gray-500">Up & Coming</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">
              {Math.round(transformedCenters.reduce((sum, c) => sum + c.cctaGrowth, 0) / transformedCenters.length)}%
            </div>
            <div className="text-xs text-gray-500">Avg Growth</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">
              {transformedCenters.reduce((sum, c) => sum + c.potentialPatients, 0).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Total Patients</div>
          </div>
        </div>
      </div>
    </div>
  );
}