'use client';

import { useState } from 'react';

interface MedicalCode {
  code: string;
  description: string;
  count: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

interface TimeframeSummary {
  totalPatients: number;
  totalCodes: number;
  avgCodesPerPatient: number;
}

interface OutcomeData {
  diagnoses: MedicalCode[];
  procedures: MedicalCode[];
  prescriptions: MedicalCode[];
  summary: TimeframeSummary;
}

// Sample data representing before/after cardiac MRI patterns
const sampleData: Record<string, Record<string, OutcomeData>> = {
  before: {
    '0-12': {
      diagnoses: [
        { code: 'I25.10', description: 'Atherosclerotic heart disease of native coronary artery', count: 847, percentage: 23.4, trend: 'up' },
        { code: 'I50.9', description: 'Heart failure, unspecified', count: 692, percentage: 19.1, trend: 'up' },
        { code: 'I48.91', description: 'Unspecified atrial fibrillation', count: 534, percentage: 14.8, trend: 'stable' },
        { code: 'I36.9', description: 'Nonrheumatic mitral valve disorder, unspecified', count: 445, percentage: 12.3, trend: 'up' },
        { code: 'Z51.81', description: 'Encounter for therapeutic drug level monitoring', count: 389, percentage: 10.8, trend: 'stable' }
      ],
      procedures: [
        { code: '93306', description: 'Echocardiography, transthoracic, complete', count: 1234, percentage: 34.1, trend: 'up' },
        { code: '93000', description: 'Electrocardiogram, routine ECG', count: 987, percentage: 27.3, trend: 'stable' },
        { code: '78452', description: 'Myocardial perfusion imaging, planar', count: 654, percentage: 18.1, trend: 'up' },
        { code: '93015', description: 'Cardiovascular stress test using maximal exercise', count: 432, percentage: 11.9, trend: 'stable' },
        { code: '36415', description: 'Collection of venous blood by venipuncture', count: 298, percentage: 8.2, trend: 'stable' }
      ],
      prescriptions: [
        { code: 'J01125', description: 'Metoprolol Tartrate 25mg', count: 1456, percentage: 40.2, trend: 'up' },
        { code: 'J01245', description: 'Lisinopril 10mg', count: 1123, percentage: 31.0, trend: 'up' },
        { code: 'J01367', description: 'Atorvastatin 20mg', count: 891, percentage: 24.6, trend: 'stable' },
        { code: 'J01489', description: 'Furosemide 40mg', count: 678, percentage: 18.7, trend: 'up' },
        { code: 'J01523', description: 'Aspirin 81mg', count: 567, percentage: 15.7, trend: 'stable' }
      ],
      summary: { totalPatients: 3620, totalCodes: 8934, avgCodesPerPatient: 2.47 }
    },
    '13-24': {
      diagnoses: [
        { code: 'I25.10', description: 'Atherosclerotic heart disease of native coronary artery', count: 692, percentage: 21.8, trend: 'up' },
        { code: 'I50.9', description: 'Heart failure, unspecified', count: 578, percentage: 18.2, trend: 'up' },
        { code: 'I48.91', description: 'Unspecified atrial fibrillation', count: 445, percentage: 14.0, trend: 'stable' },
        { code: 'Z87.891', description: 'Personal history of nicotine dependence', count: 334, percentage: 10.5, trend: 'down' },
        { code: 'E78.5', description: 'Hyperlipidemia, unspecified', count: 298, percentage: 9.4, trend: 'stable' }
      ],
      procedures: [
        { code: '93306', description: 'Echocardiography, transthoracic, complete', count: 1045, percentage: 32.9, trend: 'up' },
        { code: '93000', description: 'Electrocardiogram, routine ECG', count: 823, percentage: 25.9, trend: 'stable' },
        { code: '78452', description: 'Myocardial perfusion imaging, planar', count: 567, percentage: 17.8, trend: 'up' },
        { code: '36415', description: 'Collection of venous blood by venipuncture', count: 445, percentage: 14.0, trend: 'stable' },
        { code: '80053', description: 'Comprehensive metabolic panel', count: 334, percentage: 10.5, trend: 'stable' }
      ],
      prescriptions: [
        { code: 'J01125', description: 'Metoprolol Tartrate 25mg', count: 1234, percentage: 38.8, trend: 'up' },
        { code: 'J01245', description: 'Lisinopril 10mg', count: 945, percentage: 29.7, trend: 'stable' },
        { code: 'J01367', description: 'Atorvastatin 20mg', count: 756, percentage: 23.8, trend: 'stable' },
        { code: 'J01489', description: 'Furosemide 40mg', count: 567, percentage: 17.8, trend: 'up' },
        { code: 'J01523', description: 'Aspirin 81mg', count: 445, percentage: 14.0, trend: 'stable' }
      ],
      summary: { totalPatients: 3178, totalCodes: 7651, avgCodesPerPatient: 2.41 }
    },
    '25-36': {
      diagnoses: [
        { code: 'I25.10', description: 'Atherosclerotic heart disease of native coronary artery', count: 534, percentage: 20.1, trend: 'stable' },
        { code: 'I50.9', description: 'Heart failure, unspecified', count: 445, percentage: 16.7, trend: 'up' },
        { code: 'E78.5', description: 'Hyperlipidemia, unspecified', count: 378, percentage: 14.2, trend: 'stable' },
        { code: 'I48.91', description: 'Unspecified atrial fibrillation', count: 334, percentage: 12.6, trend: 'stable' },
        { code: 'I10', description: 'Essential hypertension', count: 289, percentage: 10.9, trend: 'stable' }
      ],
      procedures: [
        { code: '93306', description: 'Echocardiography, transthoracic, complete', count: 756, percentage: 28.4, trend: 'stable' },
        { code: '93000', description: 'Electrocardiogram, routine ECG', count: 623, percentage: 23.4, trend: 'stable' },
        { code: '36415', description: 'Collection of venous blood by venipuncture', count: 445, percentage: 16.7, trend: 'stable' },
        { code: '80053', description: 'Comprehensive metabolic panel', count: 334, percentage: 12.6, trend: 'stable' },
        { code: '78452', description: 'Myocardial perfusion imaging, planar', count: 289, percentage: 10.9, trend: 'down' }
      ],
      prescriptions: [
        { code: 'J01125', description: 'Metoprolol Tartrate 25mg', count: 891, percentage: 33.5, trend: 'stable' },
        { code: 'J01245', description: 'Lisinopril 10mg', count: 723, percentage: 27.2, trend: 'stable' },
        { code: 'J01367', description: 'Atorvastatin 20mg', count: 578, percentage: 21.7, trend: 'stable' },
        { code: 'J01523', description: 'Aspirin 81mg', count: 445, percentage: 16.7, trend: 'stable' },
        { code: 'J01489', description: 'Furosemide 40mg', count: 334, percentage: 12.6, trend: 'down' }
      ],
      summary: { totalPatients: 2658, totalCodes: 5947, avgCodesPerPatient: 2.24 }
    }
  },
  after: {
    '0-12': {
      diagnoses: [
        { code: 'I25.10', description: 'Atherosclerotic heart disease of native coronary artery', count: 1123, percentage: 26.8, trend: 'up' },
        { code: 'I50.9', description: 'Heart failure, unspecified', count: 945, percentage: 22.6, trend: 'up' },
        { code: 'I36.9', description: 'Nonrheumatic mitral valve disorder, unspecified', count: 756, percentage: 18.1, trend: 'up' },
        { code: 'I48.91', description: 'Unspecified atrial fibrillation', count: 623, percentage: 14.9, trend: 'stable' },
        { code: 'Z51.81', description: 'Encounter for therapeutic drug level monitoring', count: 534, percentage: 12.8, trend: 'up' }
      ],
      procedures: [
        { code: '93306', description: 'Echocardiography, transthoracic, complete', count: 1567, percentage: 37.4, trend: 'up' },
        { code: '93000', description: 'Electrocardiogram, routine ECG', count: 1234, percentage: 29.5, trend: 'up' },
        { code: '78452', description: 'Myocardial perfusion imaging, planar', count: 891, percentage: 21.3, trend: 'up' },
        { code: '93015', description: 'Cardiovascular stress test using maximal exercise', count: 678, percentage: 16.2, trend: 'up' },
        { code: '36415', description: 'Collection of venous blood by venipuncture', count: 534, percentage: 12.8, trend: 'up' }
      ],
      prescriptions: [
        { code: 'J01125', description: 'Metoprolol Tartrate 25mg', count: 1789, percentage: 42.7, trend: 'up' },
        { code: 'J01245', description: 'Lisinopril 10mg', count: 1345, percentage: 32.1, trend: 'up' },
        { code: 'J01367', description: 'Atorvastatin 20mg', count: 1123, percentage: 26.8, trend: 'up' },
        { code: 'J01489', description: 'Furosemide 40mg', count: 891, percentage: 21.3, trend: 'up' },
        { code: 'J01523', description: 'Aspirin 81mg', count: 756, percentage: 18.1, trend: 'up' }
      ],
      summary: { totalPatients: 4187, totalCodes: 12456, avgCodesPerPatient: 2.97 }
    },
    '13-24': {
      diagnoses: [
        { code: 'I25.10', description: 'Atherosclerotic heart disease of native coronary artery', count: 891, percentage: 24.3, trend: 'stable' },
        { code: 'I50.9', description: 'Heart failure, unspecified', count: 756, percentage: 20.6, trend: 'stable' },
        { code: 'I36.9', description: 'Nonrheumatic mitral valve disorder, unspecified', count: 623, percentage: 17.0, trend: 'stable' },
        { code: 'I48.91', description: 'Unspecified atrial fibrillation', count: 534, percentage: 14.6, trend: 'stable' },
        { code: 'Z51.81', description: 'Encounter for therapeutic drug level monitoring', count: 445, percentage: 12.1, trend: 'stable' }
      ],
      procedures: [
        { code: '93306', description: 'Echocardiography, transthoracic, complete', count: 1234, percentage: 33.7, trend: 'stable' },
        { code: '93000', description: 'Electrocardiogram, routine ECG', count: 1045, percentage: 28.5, trend: 'stable' },
        { code: '78452', description: 'Myocardial perfusion imaging, planar', count: 756, percentage: 20.6, trend: 'stable' },
        { code: '36415', description: 'Collection of venous blood by venipuncture', count: 623, percentage: 17.0, trend: 'stable' },
        { code: '93015', description: 'Cardiovascular stress test using maximal exercise', count: 534, percentage: 14.6, trend: 'stable' }
      ],
      prescriptions: [
        { code: 'J01125', description: 'Metoprolol Tartrate 25mg', count: 1456, percentage: 39.7, trend: 'stable' },
        { code: 'J01245', description: 'Lisinopril 10mg', count: 1123, percentage: 30.6, trend: 'stable' },
        { code: 'J01367', description: 'Atorvastatin 20mg', count: 891, percentage: 24.3, trend: 'stable' },
        { code: 'J01489', description: 'Furosemide 40mg', count: 756, percentage: 20.6, trend: 'stable' },
        { code: 'J01523', description: 'Aspirin 81mg', count: 623, percentage: 17.0, trend: 'stable' }
      ],
      summary: { totalPatients: 3667, totalCodes: 10234, avgCodesPerPatient: 2.79 }
    },
    '25-36': {
      diagnoses: [
        { code: 'I25.10', description: 'Atherosclerotic heart disease of native coronary artery', count: 678, percentage: 22.1, trend: 'down' },
        { code: 'I50.9', description: 'Heart failure, unspecified', count: 567, percentage: 18.5, trend: 'down' },
        { code: 'I36.9', description: 'Nonrheumatic mitral valve disorder, unspecified', count: 445, percentage: 14.5, trend: 'down' },
        { code: 'I48.91', description: 'Unspecified atrial fibrillation', count: 389, percentage: 12.7, trend: 'stable' },
        { code: 'E78.5', description: 'Hyperlipidemia, unspecified', count: 334, percentage: 10.9, trend: 'stable' }
      ],
      procedures: [
        { code: '93306', description: 'Echocardiography, transthoracic, complete', count: 945, percentage: 30.8, trend: 'down' },
        { code: '93000', description: 'Electrocardiogram, routine ECG', count: 756, percentage: 24.7, trend: 'down' },
        { code: '36415', description: 'Collection of venous blood by venipuncture', count: 567, percentage: 18.5, trend: 'stable' },
        { code: '78452', description: 'Myocardial perfusion imaging, planar', count: 445, percentage: 14.5, trend: 'down' },
        { code: '80053', description: 'Comprehensive metabolic panel', count: 389, percentage: 12.7, trend: 'stable' }
      ],
      prescriptions: [
        { code: 'J01125', description: 'Metoprolol Tartrate 25mg', count: 1123, percentage: 36.6, trend: 'down' },
        { code: 'J01245', description: 'Lisinopril 10mg', count: 891, percentage: 29.1, trend: 'down' },
        { code: 'J01367', description: 'Atorvastatin 20mg', count: 678, percentage: 22.1, trend: 'stable' },
        { code: 'J01523', description: 'Aspirin 81mg', count: 534, percentage: 17.4, trend: 'stable' },
        { code: 'J01489', description: 'Furosemide 40mg', count: 445, percentage: 14.5, trend: 'down' }
      ],
      summary: { totalPatients: 3067, totalCodes: 7834, avgCodesPerPatient: 2.55 }
    }
  }
};

const cardiacMriCodes = ['75561', '75557', '75565', '75559', '75563'];

export function CardiacMRIOutcomeAnalysis() {
  const [selectedPeriod, setSelectedPeriod] = useState<'before' | 'after'>('before');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'0-12' | '13-24' | '25-36'>('0-12');
  const [selectedCategory, setSelectedCategory] = useState<'diagnoses' | 'procedures' | 'prescriptions'>('diagnoses');
  const [showComparison, setShowComparison] = useState(false);

  const currentData = sampleData[selectedPeriod][selectedTimeframe];
  const comparisonData = sampleData[selectedPeriod === 'before' ? 'after' : 'before'][selectedTimeframe];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <span className="text-green-500">↗</span>;
      case 'down':
        return <span className="text-red-500">↘</span>;
      default:
        return <span className="text-gray-400">→</span>;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-50';
      case 'down':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-gray-800">Cardiac MRI Outcome Analysis</h2>
          <p className="text-sm text-gray-600">
            Top medical codes before and after cardiac MRI procedures (CPT: {cardiacMriCodes.join(', ')})
          </p>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-6">
        {/* Control Panel */}
        <div className="flex flex-wrap items-center gap-6 p-4 bg-gradient-to-r from-slate-50 to-gray-50 border border-gray-200 rounded-xl shadow-sm">
          {/* Time Period Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-700">Period</span>
            <div className="flex bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200/50 p-1 shadow-inner">
              <button
                onClick={() => setSelectedPeriod('before')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  selectedPeriod === 'before'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                Before
              </button>
              <button
                onClick={() => setSelectedPeriod('after')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  selectedPeriod === 'after'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                After
              </button>
            </div>
          </div>

          <div className="h-6 w-px bg-gray-300"></div>

          {/* Timeframe */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-700">Timeframe</span>
            <div className="flex gap-1.5">
              {['0-12', '13-24', '25-36'].map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe as '0-12' | '13-24' | '25-36')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-all duration-200 ${
                    selectedTimeframe === timeframe
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-500 shadow-md'
                      : 'bg-white/80 text-slate-600 border-gray-200 hover:bg-white hover:text-slate-900 hover:border-emerald-300 hover:shadow-sm'
                  }`}
                >
                  {timeframe}mo
                </button>
              ))}
            </div>
          </div>

          <div className="h-6 w-px bg-gray-300"></div>

          {/* Category */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-700">Category</span>
            <div className="flex gap-1.5">
              {[
                { key: 'diagnoses', label: 'Diagnoses', icon: '🩺' },
                { key: 'procedures', label: 'Procedures', icon: '⚕️' },
                { key: 'prescriptions', label: 'Prescriptions', icon: '💊' }
              ].map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key as 'diagnoses' | 'procedures' | 'prescriptions')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-all duration-200 flex items-center gap-2 ${
                    selectedCategory === category.key
                      ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white border-violet-500 shadow-md'
                      : 'bg-white/80 text-slate-600 border-gray-200 hover:bg-white hover:text-slate-900 hover:border-violet-300 hover:shadow-sm'
                  }`}
                >
                  <span className="text-xs">{category.icon}</span>
                  <span className="hidden sm:inline">{category.label}</span>
                  <span className="sm:hidden">
                    {category.key === 'diagnoses' ? 'Dx' : category.key === 'procedures' ? 'CPT' : 'Rx'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="h-6 w-px bg-gray-300"></div>

          {/* Comparison Toggle */}
          <button
            onClick={() => setShowComparison(!showComparison)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg border transition-all duration-200 flex items-center gap-2 ${
              showComparison
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-500 shadow-md'
                : 'bg-white/80 text-slate-600 border-gray-200 hover:bg-white hover:text-slate-900 hover:border-amber-300 hover:shadow-sm'
            }`}
          >
            <span className="text-xs">📊</span>
            <span>Compare</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex flex-col gap-1">
              <h3 className="font-medium text-blue-800">Total Patients</h3>
              <div className="text-2xl font-bold text-blue-900">{currentData.summary.totalPatients.toLocaleString()}</div>
              <div className="text-sm text-blue-700">
                {selectedPeriod === 'before' ? 'Before' : 'After'} cardiac MRI ({selectedTimeframe} months)
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex flex-col gap-1">
              <h3 className="font-medium text-green-800">Total Codes</h3>
              <div className="text-2xl font-bold text-green-900">{currentData.summary.totalCodes.toLocaleString()}</div>
              <div className="text-sm text-green-700">
                All {selectedCategory} in timeframe
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex flex-col gap-1">
              <h3 className="font-medium text-yellow-800">Avg Codes/Patient</h3>
              <div className="text-2xl font-bold text-yellow-900">{currentData.summary.avgCodesPerPatient}</div>
              <div className="text-sm text-yellow-700">
                Average codes per patient
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">%</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                {showComparison && (
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comparison ({selectedPeriod === 'before' ? 'After' : 'Before'})
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData[selectedCategory].map((item, index) => {
                const comparisonItem = showComparison 
                  ? comparisonData[selectedCategory].find(c => c.code === item.code)
                  : null;
                
                return (
                  <tr key={item.code} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                      {item.code}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {item.description}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-900 font-medium">
                      {item.count.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                      {item.percentage}%
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getTrendColor(item.trend)}`}>
                        {getTrendIcon(item.trend)} {item.trend}
                      </span>
                    </td>
                    {showComparison && (
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                        {comparisonItem ? (
                          <div className="space-y-1">
                            <div className="font-medium text-gray-900">
                              {comparisonItem.count.toLocaleString()} ({comparisonItem.percentage}%)
                            </div>
                            <div className={`text-xs px-2 py-1 rounded ${
                              comparisonItem.count > item.count 
                                ? 'bg-green-100 text-green-800' 
                                : comparisonItem.count < item.count 
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {comparisonItem.count > item.count 
                                ? `+${((comparisonItem.count - item.count) / item.count * 100).toFixed(1)}%`
                                : comparisonItem.count < item.count 
                                ? `-${((item.count - comparisonItem.count) / item.count * 100).toFixed(1)}%`
                                : 'No change'
                              }
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">Not found</span>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Key Insights */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex flex-col gap-3">
            <h3 className="font-medium text-gray-800">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded p-3">
                <div className="flex flex-col gap-1">
                  <h4 className="font-medium text-blue-800">Most Common</h4>
                  <p className="text-gray-600">
                    {currentData[selectedCategory][0]?.description} ({currentData[selectedCategory][0]?.percentage}%)
                  </p>
                </div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="flex flex-col gap-1">
                  <h4 className="font-medium text-green-800">Rising Trend</h4>
                  <p className="text-gray-600">
                    {currentData[selectedCategory].filter(item => item.trend === 'up').length} codes showing upward trend
                  </p>
                </div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="flex flex-col gap-1">
                  <h4 className="font-medium text-red-800">Declining Trend</h4>
                  <p className="text-gray-600">
                    {currentData[selectedCategory].filter(item => item.trend === 'down').length} codes showing downward trend
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}