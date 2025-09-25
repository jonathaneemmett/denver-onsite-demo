'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHeart,
	faMapMarkerAlt,
	faChartPie,
	faArrowRight,
	faExclamationCircle,
	faDollarSign,
	faUsers,
	faPercentage,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface RegionalHospital {
	name: string;
	distance: number;
	myocarditisVolume: number;
	structuralProcedures: number;
	conversionRate: number;
	marketShare: number;
}

interface MyocarditisData {
	estimatedAnnualCases: number;
	basedOnBillingVolume: number;
	currentCapture: number;
	potentialCapture: number;
	revenueOpportunity: number;
}

// Year-based data showing declining performance in current years and improvement with software
const mockRegionalDataByYear: Record<number, RegionalHospital[]> = {
	2024: [
		{
			name: 'Cedars-Sinai Medical Center',
			distance: 0,
			myocarditisVolume: 145,
			structuralProcedures: 87,
			conversionRate: 60.0,
			marketShare: 28.5,
		},
		{
			name: 'UCLA Medical Center',
			distance: 12,
			myocarditisVolume: 128,
			structuralProcedures: 89,
			conversionRate: 69.5,
			marketShare: 25.2,
		},
		{
			name: 'Kaiser Permanente West LA',
			distance: 8,
			myocarditisVolume: 95,
			structuralProcedures: 52,
			conversionRate: 54.7,
			marketShare: 18.7,
		},
		{
			name: 'Providence Saint Joseph',
			distance: 15,
			myocarditisVolume: 78,
			structuralProcedures: 41,
			conversionRate: 52.6,
			marketShare: 15.3,
		},
		{
			name: 'Good Samaritan Hospital',
			distance: 22,
			myocarditisVolume: 62,
			structuralProcedures: 28,
			conversionRate: 45.2,
			marketShare: 12.2,
		},
	],
	2025: [
		{
			name: 'Cedars-Sinai Medical Center',
			distance: 0,
			myocarditisVolume: 138,
			structuralProcedures: 72,
			conversionRate: 52.2,
			marketShare: 27.1,
		},
		{
			name: 'UCLA Medical Center',
			distance: 12,
			myocarditisVolume: 132,
			structuralProcedures: 95,
			conversionRate: 72.0,
			marketShare: 25.9,
		},
		{
			name: 'Kaiser Permanente West LA',
			distance: 8,
			myocarditisVolume: 98,
			structuralProcedures: 58,
			conversionRate: 59.2,
			marketShare: 19.2,
		},
		{
			name: 'Providence Saint Joseph',
			distance: 15,
			myocarditisVolume: 82,
			structuralProcedures: 46,
			conversionRate: 56.1,
			marketShare: 16.1,
		},
		{
			name: 'Good Samaritan Hospital',
			distance: 22,
			myocarditisVolume: 59,
			structuralProcedures: 29,
			conversionRate: 49.2,
			marketShare: 11.6,
		},
	],
	2026: [
		{
			name: 'Cedars-Sinai Medical Center',
			distance: 0,
			myocarditisVolume: 152,
			structuralProcedures: 116,
			conversionRate: 76.3,
			marketShare: 29.8,
		},
		{
			name: 'UCLA Medical Center',
			distance: 12,
			myocarditisVolume: 128,
			structuralProcedures: 91,
			conversionRate: 71.1,
			marketShare: 25.1,
		},
		{
			name: 'Kaiser Permanente West LA',
			distance: 8,
			myocarditisVolume: 95,
			structuralProcedures: 55,
			conversionRate: 57.9,
			marketShare: 18.6,
		},
		{
			name: 'Providence Saint Joseph',
			distance: 15,
			myocarditisVolume: 78,
			structuralProcedures: 42,
			conversionRate: 53.8,
			marketShare: 15.3,
		},
		{
			name: 'Good Samaritan Hospital',
			distance: 22,
			myocarditisVolume: 57,
			structuralProcedures: 26,
			conversionRate: 45.6,
			marketShare: 11.2,
		},
	],
	2027: [
		{
			name: 'Cedars-Sinai Medical Center',
			distance: 0,
			myocarditisVolume: 165,
			structuralProcedures: 135,
			conversionRate: 81.8,
			marketShare: 32.4,
		},
		{
			name: 'UCLA Medical Center',
			distance: 12,
			myocarditisVolume: 125,
			structuralProcedures: 88,
			conversionRate: 70.4,
			marketShare: 24.5,
		},
		{
			name: 'Kaiser Permanente West LA',
			distance: 8,
			myocarditisVolume: 92,
			structuralProcedures: 52,
			conversionRate: 56.5,
			marketShare: 18.1,
		},
		{
			name: 'Providence Saint Joseph',
			distance: 15,
			myocarditisVolume: 75,
			structuralProcedures: 39,
			conversionRate: 52.0,
			marketShare: 14.7,
		},
		{
			name: 'Good Samaritan Hospital',
			distance: 22,
			myocarditisVolume: 53,
			structuralProcedures: 23,
			conversionRate: 43.4,
			marketShare: 10.4,
		},
	],
};

const mockMyocarditisDataByYear: Record<number, MyocarditisData> = {
	2024: {
		estimatedAnnualCases: 508,
		basedOnBillingVolume: 145,
		currentCapture: 87,
		potentialCapture: 152,
		revenueOpportunity: 3250000,
	},
	2025: {
		estimatedAnnualCases: 509,
		basedOnBillingVolume: 138,
		currentCapture: 72,
		potentialCapture: 168,
		revenueOpportunity: 4800000,
	},
	2026: {
		estimatedAnnualCases: 510,
		basedOnBillingVolume: 152,
		currentCapture: 116,
		potentialCapture: 175,
		revenueOpportunity: 2950000,
	},
	2027: {
		estimatedAnnualCases: 511,
		basedOnBillingVolume: 165,
		currentCapture: 135,
		potentialCapture: 185,
		revenueOpportunity: 2500000,
	},
};

interface StructuralHeartCaptureProps {
	selectedYear: number;
	hospitalName?: string;
}

export function StructuralHeartCapture({ selectedYear, hospitalName = 'Cedars-Sinai' }: StructuralHeartCaptureProps) {
	const [selectedView, setSelectedView] = useState<'overview' | 'geographic' | 'billing'>('overview');

	// Get data for selected year
	const mockRegionalData = mockRegionalDataByYear[selectedYear] || mockRegionalDataByYear[2025];
	const mockMyocarditisData = mockMyocarditisDataByYear[selectedYear] || mockMyocarditisDataByYear[2025];
	
	const totalRegionalMyocarditis = mockRegionalData.reduce((sum, hospital) => sum + hospital.myocarditisVolume, 0);
	const totalRegionalStructural = mockRegionalData.reduce((sum, hospital) => sum + hospital.structuralProcedures, 0);
	const overallConversionRate = (totalRegionalStructural / totalRegionalMyocarditis) * 100;
	const cedarsSinaiData = mockRegionalData[0];
	const competitorAvgConversion = mockRegionalData.slice(1).reduce((sum, h) => sum + h.conversionRate, 0) / (mockRegionalData.length - 1);

	const isPredictiveYear = selectedYear >= 2026;
	const getTitle = () => {
		const shortName = hospitalName?.split(' ')[0] || 'Cedars-Sinai';
		return `${shortName} Structural Heart Capture Analysis`;
	};

	const getSubtitle = () => {
		const baseSubtitle = "Analyze myocarditis patient volumes and structural heart procedure conversion rates within 50-mile radius";
		if (isPredictiveYear) {
			return `${baseSubtitle} (Statistical projections based on historical trends and market analysis)`;
		}
		return baseSubtitle;
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
			<div className="mb-6">
				<h2 className="text-lg font-semibold text-neutral-900 mb-2 flex items-center">
					<FontAwesomeIcon icon={faHeart} className="w-4 h-4 text-slate-600 mr-2" />
					{getTitle()}
					{isPredictiveYear && (
						<span className="ml-3 bg-slate-100 text-slate-800 text-xs font-medium px-2 py-1 rounded-full">
							Projected
						</span>
					)}
				</h2>
				<p className="text-sm text-slate-500 leading-tight">
					{getSubtitle()}
				</p>
			</div>

			{/* View Toggle */}
			<div className="flex space-x-1 mb-6 bg-neutral-100 rounded-lg p-1">
				{[
					{ key: 'overview', label: 'Overview', icon: faChartPie },
					{ key: 'geographic', label: 'Geographic Analysis', icon: faMapMarkerAlt },
					{ key: 'billing', label: 'Billing Analysis', icon: faDollarSign },
				].map(({ key, label, icon }) => (
					<button
						key={key}
						onClick={() => setSelectedView(key as 'overview' | 'geographic' | 'billing')}
						className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
							selectedView === key
								? 'bg-white text-slate-700 shadow-sm'
								: 'text-neutral-600 hover:text-neutral-900'
						}`}
					>
						<FontAwesomeIcon icon={icon} className="w-4 h-4 mr-2" />
						{label}
					</button>
				))}
			</div>

			{/* Overview Tab */}
			{selectedView === 'overview' && (
				<div className="space-y-6">
					{/* Key Metrics */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div className="bg-blue-50 rounded-lg p-4">
							<div className="flex items-center justify-between mb-2">
								<FontAwesomeIcon icon={faUsers} className="w-5 h-5 text-blue-600" />
								<span className="text-xs text-blue-600 font-medium">50-MILE RADIUS</span>
							</div>
							<p className="text-2xl font-bold text-blue-800">{totalRegionalMyocarditis}</p>
							<p className="text-sm text-blue-700">Annual Myocarditis Cases</p>
						</div>

						<div className="bg-emerald-50 rounded-lg p-4">
							<div className="flex items-center justify-between mb-2">
								<FontAwesomeIcon icon={faHeart} className="w-5 h-5 text-emerald-600" />
								<span className="text-xs text-emerald-600 font-medium">PROCEDURES</span>
							</div>
							<p className="text-2xl font-bold text-emerald-800">{totalRegionalStructural}</p>
							<p className="text-sm text-emerald-700">Structural Heart Cases</p>
						</div>

						<div className="bg-purple-50 rounded-lg p-4">
							<div className="flex items-center justify-between mb-2">
								<FontAwesomeIcon icon={faPercentage} className="w-5 h-5 text-purple-600" />
								<span className="text-xs text-purple-600 font-medium">CONVERSION</span>
							</div>
							<p className="text-2xl font-bold text-purple-800">{overallConversionRate.toFixed(1)}%</p>
							<p className="text-sm text-purple-700">Regional Average</p>
						</div>

						<div className="bg-amber-50 rounded-lg p-4">
							<div className="flex items-center justify-between mb-2">
								<FontAwesomeIcon icon={faDollarSign} className="w-5 h-5 text-amber-700" />
								<span className="text-xs text-amber-700 font-medium">OPPORTUNITY</span>
							</div>
							<p className="text-2xl font-bold text-amber-800">
								${(mockMyocarditisData.revenueOpportunity / 1000000).toFixed(1)}M
							</p>
							<p className="text-sm text-amber-700">Revenue Potential</p>
						</div>
					</div>

					{/* Cedars-Sinai Performance */}
					<div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
						<h3 className="text-lg font-semibold text-neutral-900 mb-4">Cedars-Sinai Performance</h3>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="text-center">
								<p className="text-3xl font-bold text-blue-700 mb-1">{cedarsSinaiData.myocarditisVolume}</p>
								<p className="text-sm text-neutral-600 mb-2">Myocarditis Cases</p>
								<p className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
									{cedarsSinaiData.marketShare}% market share
								</p>
							</div>
							<div className="text-center">
								<p className="text-3xl font-bold text-emerald-700 mb-1">{cedarsSinaiData.structuralProcedures}</p>
								<p className="text-sm text-neutral-600 mb-2">Structural Procedures</p>
								<p className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
									{cedarsSinaiData.conversionRate}% conversion rate
								</p>
							</div>
							<div className="text-center">
								<p className="text-3xl font-bold text-purple-700 mb-1">
									{(mockMyocarditisData.potentialCapture - cedarsSinaiData.structuralProcedures)}
								</p>
								<p className="text-sm text-neutral-600 mb-2">Additional Potential</p>
								<p className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
									vs {competitorAvgConversion.toFixed(1)}% competitor avg
								</p>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Geographic Analysis Tab */}
			{selectedView === 'geographic' && (
				<div className="space-y-6">
					<div className="bg-neutral-50 rounded-lg p-4 mb-6">
						<div className="flex items-center mb-2">
							<FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-neutral-600 mr-2" />
							<h3 className="text-lg font-semibold text-neutral-900">Regional Hospital Analysis</h3>
						</div>
						<p className="text-sm text-neutral-600">
							Myocarditis diagnosis to structural heart procedure conversion within 50-mile radius of Cedars-Sinai
						</p>
					</div>

					<div className="overflow-x-auto">
						<table className="w-full border-collapse border border-neutral-200 rounded-lg overflow-hidden">
							<thead>
								<tr className="bg-neutral-50">
									<th className="border border-neutral-200 px-4 py-3 text-left text-sm font-semibold text-neutral-900">
										Hospital
									</th>
									<th className="border border-neutral-200 px-4 py-3 text-center text-sm font-semibold text-neutral-900">
										Distance
									</th>
									<th className="border border-neutral-200 px-4 py-3 text-center text-sm font-semibold text-neutral-900">
										Myocarditis Cases
									</th>
									<th className="border border-neutral-200 px-4 py-3 text-center text-sm font-semibold text-neutral-900">
										Structural Procedures
									</th>
									<th className="border border-neutral-200 px-4 py-3 text-center text-sm font-semibold text-neutral-900">
										Conversion Rate
									</th>
									<th className="border border-neutral-200 px-4 py-3 text-center text-sm font-semibold text-neutral-900">
										Market Share
									</th>
								</tr>
							</thead>
							<tbody>
								{mockRegionalData.map((hospital, index) => (
									<tr key={index} className={`${index === 0 ? 'bg-blue-50 border-blue-200' : 'hover:bg-neutral-50'}`}>
										<td className="border border-neutral-300 px-4 py-4">
											<div className="flex items-center">
												{index === 0 && (
													<FontAwesomeIcon icon={faHeart} className="w-4 h-4 text-blue-600 mr-2" />
												)}
												<span className={`font-semibold text-sm ${index === 0 ? 'text-blue-900' : 'text-neutral-900'}`}>
													{hospital.name}
												</span>
											</div>
										</td>
										<td className="border border-neutral-300 px-4 py-4 text-center">
											<span className="font-medium text-neutral-800">
												{hospital.distance === 0 ? '-' : `${hospital.distance} mi`}
											</span>
										</td>
										<td className="border border-neutral-300 px-4 py-4 text-center">
											<span className={`text-lg font-bold ${index === 0 ? 'text-blue-700' : 'text-neutral-900'}`}>
												{hospital.myocarditisVolume}
											</span>
										</td>
										<td className="border border-neutral-300 px-4 py-4 text-center">
											<span className={`text-lg font-bold ${index === 0 ? 'text-blue-700' : 'text-slate-700'}`}>
												{hospital.structuralProcedures}
											</span>
										</td>
										<td className="border border-neutral-300 px-4 py-4 text-center">
											<span className={`text-lg font-bold px-3 py-1 rounded-full ${
												index === 0 && hospital.conversionRate > competitorAvgConversion ? 'bg-emerald-100 text-emerald-800' :
												index === 0 && hospital.conversionRate <= competitorAvgConversion ? 'bg-red-100 text-red-800' :
												hospital.conversionRate >= 60 ? 'bg-stone-100 text-stone-800' :
												hospital.conversionRate >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
											}`}>
												{hospital.conversionRate.toFixed(1)}%
											</span>
										</td>
										<td className="border border-neutral-300 px-4 py-4 text-center">
											<span className={`font-bold ${index === 0 ? 'text-blue-700' : 'text-neutral-900'}`}>
												{hospital.marketShare.toFixed(1)}%
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className={`border rounded-lg p-4 ${
						isPredictiveYear ? 'bg-slate-50 border-slate-200' : 'bg-yellow-50 border-yellow-200'
					}`}>
						<div className="flex items-start">
							<FontAwesomeIcon icon={faExclamationCircle} className={`w-5 h-5 mt-0.5 mr-3 ${
								isPredictiveYear ? 'text-slate-600' : 'text-yellow-600'
							}`} />
							<div>
								<h4 className={`font-semibold mb-1 ${
									isPredictiveYear ? 'text-slate-800' : 'text-yellow-800'
								}`}>
									{isPredictiveYear ? 'Statistical Projections with Software Implementation' : 'Key Insights'}
								</h4>
								<ul className={`text-sm space-y-1 ${
									isPredictiveYear ? 'text-slate-700' : 'text-yellow-700'
								}`}>
									{isPredictiveYear ? (
										<>
											<li>• Cedars-Sinai conversion rate projected to reach {cedarsSinaiData.conversionRate.toFixed(1)}% with software optimization</li>
											<li>• Market share expected to increase to {cedarsSinaiData.marketShare.toFixed(1)}% through improved patient identification</li>
											<li>• Statistical modeling shows {(cedarsSinaiData.conversionRate - competitorAvgConversion).toFixed(1)}% advantage over competitor average</li>
											<li>• Software-driven improvements could capture {mockMyocarditisData.currentCapture} additional procedures annually</li>
										</>
									) : (
										<>
											<li>• Cedars-Sinai conversion rate ({cedarsSinaiData.conversionRate.toFixed(1)}%) is {cedarsSinaiData.conversionRate < overallConversionRate ? 'below' : 'above'} regional average ({overallConversionRate.toFixed(1)}%)</li>
											<li>• UCLA Medical Center maintains highest conversion rate at {mockRegionalData.find(h => h.name.includes('UCLA'))?.conversionRate.toFixed(1)}%</li>
											<li>• Current performance shows {cedarsSinaiData.marketShare.toFixed(1)}% market share with {totalRegionalMyocarditis} total cases</li>
											<li>• Revenue opportunity: ${(mockMyocarditisData.revenueOpportunity / 1000000).toFixed(1)}M through conversion optimization</li>
										</>
									)}
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Billing Analysis Tab */}
			{selectedView === 'billing' && (
				<div className="space-y-6">
					<div className="bg-gradient-to-r from-slate-50 to-stone-50 rounded-lg p-4 mb-6 border border-slate-200">
						<div className="flex items-center mb-2">
							<FontAwesomeIcon icon={faDollarSign} className="w-5 h-5 text-emerald-600 mr-2" />
							<h3 className="text-lg font-semibold text-slate-900">Billing Volume Analysis</h3>
						</div>
						<p className="text-sm text-slate-600">
							Estimated myocarditis patient volume based on current billing data and conversion opportunities
						</p>
					</div>

					{/* Current vs Potential */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 border border-slate-200 shadow-sm">
							<h4 className="font-semibold text-slate-900 mb-4 flex items-center">
								<div className="w-3 h-3 bg-slate-500 rounded-full mr-2"></div>
								Current Performance
							</h4>
							<div className="space-y-4">
								<div className="flex justify-between items-center">
									<span className="text-sm text-slate-700">Myocarditis Cases (Annual)</span>
									<span className="font-bold text-slate-900">{mockMyocarditisData.basedOnBillingVolume}</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm text-slate-700">Structural Procedures</span>
									<span className="font-bold text-slate-900">{mockMyocarditisData.currentCapture}</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm text-slate-700">Conversion Rate</span>
									<span className="font-bold text-slate-900">
										{((mockMyocarditisData.currentCapture / mockMyocarditisData.basedOnBillingVolume) * 100).toFixed(1)}%
									</span>
								</div>
								<div className="pt-2 border-t border-slate-200">
									<div className="flex justify-between items-center">
										<span className="text-sm text-slate-700">Annual Revenue</span>
										<span className="font-bold text-slate-900">
											${((mockMyocarditisData.currentCapture * 50000) / 1000000).toFixed(1)}M
										</span>
									</div>
								</div>
							</div>
						</div>

						<div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-6 border border-emerald-200 shadow-sm">
							<h4 className="font-semibold text-emerald-900 mb-4 flex items-center">
								<div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
								Improvement Potential
							</h4>
							<div className="space-y-4">
								<div className="flex justify-between items-center">
									<span className="text-sm text-emerald-700">Target Conversion Rate</span>
									<span className="font-bold text-emerald-900">70%</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm text-emerald-700">Potential Procedures</span>
									<span className="font-bold text-emerald-900">{mockMyocarditisData.potentialCapture}</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm text-emerald-700">Additional Cases</span>
									<span className="font-bold text-emerald-900 flex items-center">
										<span className="text-emerald-600 mr-1">+</span>{mockMyocarditisData.potentialCapture - mockMyocarditisData.currentCapture}
									</span>
								</div>
								<div className="pt-2 border-t border-emerald-200">
									<div className="flex justify-between items-center">
										<span className="text-sm text-emerald-700">Revenue Opportunity</span>
										<span className="font-bold text-emerald-900 flex items-center">
											<span className="text-emerald-600 mr-1">+</span>${(mockMyocarditisData.revenueOpportunity / 1000000).toFixed(1)}M
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Conversion Funnel */}
					<div className="bg-gradient-to-br from-slate-50 to-stone-50 border border-slate-200 rounded-lg p-6 shadow-sm">
						<h4 className="font-semibold text-slate-900 mb-4 flex items-center">
							<FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 text-slate-600 mr-2" />
							Patient Conversion Funnel
						</h4>
						<div className="space-y-4">
							<div className="flex items-center">
								<div className="w-16 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
									{mockMyocarditisData.basedOnBillingVolume}
								</div>
								<div className="flex-1 mx-4">
									<div className="flex items-center">
										<div className="flex-1 h-3 bg-slate-200 rounded-full shadow-inner">
											<div className="h-3 bg-gradient-to-r from-slate-500 to-slate-600 rounded-full shadow-sm" style={{ width: '100%' }}></div>
										</div>
										<FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 text-neutral-400 mx-2" />
									</div>
									<p className="text-xs text-slate-700 mt-1 font-medium">Myocarditis Diagnoses</p>
								</div>
								<div className="w-16 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
									{mockMyocarditisData.currentCapture}
								</div>
								<div className="flex-1 mx-4">
									<div className="flex items-center">
										<div className="flex-1 h-3 bg-amber-200 rounded-full shadow-inner">
											<div className="h-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full shadow-sm" style={{ 
												width: `${(mockMyocarditisData.currentCapture / mockMyocarditisData.potentialCapture) * 100}%` 
											}}></div>
										</div>
										<FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 text-neutral-400 mx-2" />
									</div>
									<p className="text-xs text-amber-700 mt-1 font-medium">Current Procedures</p>
								</div>
								<div className="w-16 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
									{mockMyocarditisData.potentialCapture}
								</div>
								<div className="ml-4">
									<p className="text-xs text-emerald-700 font-medium">Target Procedures</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}