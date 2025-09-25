'use client';

import { useState } from 'react';

interface QBRMetric {
  title: string;
  description: string;
  preAdoption: {
    spect: number;
    echo: number;
    ct: number;
    ccta: number;
    cmr: number;
  };
  postAdoption: {
    spect: number;
    echo: number;
    ct: number;
    ccta: number;
    cmr: number;
  };
  financialImpact: number;
  retentionMetrics: {
    patientsRetained: number;
    revenuePerPatient: number;
    procedureIncrease: number;
  };
}

const qbrMetrics: QBRMetric[] = [
  {
    title: "Regional Medical Center",
    description: "12-month post-adoption analysis showing modality shifts and financial impact",
    preAdoption: {
      spect: 180,
      echo: 320,
      ct: 95,
      ccta: 45,
      cmr: 15
    },
    postAdoption: {
      spect: 125,
      echo: 340,
      ct: 88,
      ccta: 52,
      cmr: 85
    },
    financialImpact: 2400000,
    retentionMetrics: {
      patientsRetained: 156,
      revenuePerPatient: 890,
      procedureIncrease: 22
    }
  },
  {
    title: "University Hospital",
    description: "18-month post-adoption showing successful CCTA-to-CMR conversion strategy",
    preAdoption: {
      spect: 95,
      echo: 280,
      ct: 120,
      ccta: 180,
      cmr: 25
    },
    postAdoption: {
      spect: 82,
      echo: 295,
      ct: 108,
      ccta: 145,
      cmr: 95
    },
    financialImpact: 1800000,
    retentionMetrics: {
      patientsRetained: 134,
      revenuePerPatient: 1200,
      procedureIncrease: 18
    }
  }
];

interface ComparisonView {
  facility: QBRMetric;
  selectedTimeframe: 'pre' | 'post' | 'comparison';
}

export function ExpandSection() {
  const [selectedFacility, setSelectedFacility] = useState<QBRMetric>(qbrMetrics[0]);
  const [viewMode, setViewMode] = useState<'pre' | 'post' | 'comparison'>('comparison');

  const calculateModalityChange = (pre: number, post: number) => {
    const change = ((post - pre) / pre) * 100;
    return {
      value: change,
      display: change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`,
      color: change > 0 ? 'text-green-600' : 'text-red-600'
    };
  };

  const getModalityData = (facility: QBRMetric, timeframe: 'pre' | 'post') => {
    return timeframe === 'pre' ? facility.preAdoption : facility.postAdoption;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="px-6 py-4 bg-green-50 border-b border-green-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">📈</span>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-green-900">Expand</h2>
            <p className="text-sm text-green-700">Post-sale QBR Execution</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-6">
          {/* Facility Selection */}
          <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <span className="text-sm font-semibold text-gray-700">Select Facility:</span>
            {qbrMetrics.map((facility, index) => (
              <button
                key={index}
                onClick={() => setSelectedFacility(facility)}
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                  selectedFacility.title === facility.title
                    ? 'bg-green-600 text-white border-green-600 shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-green-50 hover:text-green-700 hover:border-green-300'
                }`}
              >
                {facility.title}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex flex-wrap items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <span className="text-sm font-semibold text-blue-700">Analysis View:</span>
            {[
              { key: 'pre', label: 'Pre-Adoption', icon: '📊' },
              { key: 'post', label: 'Post-Adoption', icon: '📈' },
              { key: 'comparison', label: 'Comparison', icon: '🔄' }
            ].map((mode) => (
              <button
                key={mode.key}
                onClick={() => setViewMode(mode.key as 'pre' | 'post' | 'comparison')}
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 flex items-center gap-2 ${
                  viewMode === mode.key
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300'
                }`}
              >
                <span className="text-xs">{mode.icon}</span>
                <span>{mode.label}</span>
              </button>
            ))}
          </div>

          {/* Key Questions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-yellow-800 flex items-center gap-2">
                <span>❓</span>
                Key QBR Questions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/70 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">Volume & Financial Impact</h4>
                  <p className="text-sm text-yellow-700 mb-3">
                    How have the 1) number and 2) ratios of Spect, Echo, CT and CCTA changed over time. 
                    Using reimbursement data, what is the financial impact to the site?
                  </p>
                  <div className="text-xs text-yellow-600 bg-yellow-100 rounded p-2">
                    Track modality shifts and calculate ROI from conversion strategies
                  </div>
                </div>

                <div className="bg-white/70 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">Patient Journey Analysis</h4>
                  <p className="text-sm text-yellow-700 mb-3">
                    Based on comparing a pre-adoption patient journey analysis to a post-adoption analysis, 
                    Is the site capturing and/or retaining more cardiac procedures?
                  </p>
                  <div className="text-xs text-yellow-600 bg-yellow-100 rounded p-2">
                    Measure patient retention and downstream procedure capture
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modality Volume Analysis */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">
                {selectedFacility.title} - Modality Volume Analysis
              </h3>
              <p className="text-sm text-gray-600 mt-1">{selectedFacility.description}</p>
            </div>

            <div className="p-4">
              {viewMode === 'comparison' ? (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                  {Object.keys(selectedFacility.preAdoption).map((modality) => {
                    const modalityKey = modality as keyof typeof selectedFacility.preAdoption;
                    const preValue = selectedFacility.preAdoption[modalityKey];
                    const postValue = selectedFacility.postAdoption[modalityKey];
                    const change = calculateModalityChange(preValue, postValue);
                    
                    return (
                      <div key={modality} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex flex-col gap-3">
                          <h4 className="font-medium text-gray-800 uppercase text-sm">
                            {modality}
                          </h4>
                          
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Pre:</span>
                              <span className="font-medium">{preValue}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Post:</span>
                              <span className="font-medium">{postValue}</span>
                            </div>
                          </div>
                          
                          <div className="border-t pt-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-600">Change:</span>
                              <span className={`text-sm font-bold ${change.color}`}>
                                {change.display}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                  {Object.entries(getModalityData(selectedFacility, viewMode)).map(([modality, value]) => (
                    <div key={modality} className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="font-medium text-blue-800 uppercase text-sm mb-2">
                        {modality}
                      </h4>
                      <div className="text-2xl font-bold text-blue-900">{value}</div>
                      <div className="text-sm text-blue-700">procedures/month</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Financial Impact Summary */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-green-800 flex items-center gap-2">
                <span>💰</span>
                Financial Impact Summary
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-700">
                    {formatCurrency(selectedFacility.financialImpact)}
                  </div>
                  <div className="text-sm text-green-600">Annual Revenue Impact</div>
                </div>
                
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-700">
                    +{selectedFacility.retentionMetrics.patientsRetained}
                  </div>
                  <div className="text-sm text-green-600">Patients Retained/Month</div>
                </div>
                
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-700">
                    {formatCurrency(selectedFacility.retentionMetrics.revenuePerPatient)}
                  </div>
                  <div className="text-sm text-green-600">Revenue per Patient</div>
                </div>
                
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-700">
                    +{selectedFacility.retentionMetrics.procedureIncrease}%
                  </div>
                  <div className="text-sm text-green-600">Procedure Increase</div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">Success Metrics & KPIs</h3>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="flex flex-col gap-3">
                  <h4 className="font-medium text-blue-800 flex items-center gap-2">
                    <span>📊</span>
                    Volume Metrics
                  </h4>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>CMR Growth:</span>
                        <span className="font-bold text-green-600">
                          +{calculateModalityChange(
                            selectedFacility.preAdoption.cmr, 
                            selectedFacility.postAdoption.cmr
                          ).display}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>SPECT Reduction:</span>
                        <span className="font-bold text-red-600">
                          {calculateModalityChange(
                            selectedFacility.preAdoption.spect, 
                            selectedFacility.postAdoption.spect
                          ).display}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Procedures:</span>
                        <span className="font-bold text-blue-600">
                          {Object.values(selectedFacility.postAdoption).reduce((a, b) => a + b, 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h4 className="font-medium text-green-800 flex items-center gap-2">
                    <span>💚</span>
                    Patient Outcomes
                  </h4>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Retention Rate:</span>
                        <span className="font-bold text-green-600">+22%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Diagnostic Accuracy:</span>
                        <span className="font-bold text-green-600">+15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Patient Satisfaction:</span>
                        <span className="font-bold text-green-600">4.8/5</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h4 className="font-medium text-purple-800 flex items-center gap-2">
                    <span>⚡</span>
                    Operational Efficiency
                  </h4>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Workflow Time:</span>
                        <span className="font-bold text-green-600">-40%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tech Utilization:</span>
                        <span className="font-bold text-green-600">+25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wait Times:</span>
                        <span className="font-bold text-green-600">-60%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}