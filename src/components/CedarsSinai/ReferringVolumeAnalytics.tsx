'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowDown,
	faArrowUp,
	faChevronDown,
	faChevronRight,
	faHeart,
	faBuilding,
	faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface CompetitorTrend {
	hospitalName: string;
	monthlyVolume: number;
	trend: 'increasing' | 'stable' | 'decreasing';
	percentChange: number;
}

interface YearlyData {
	cedarsSinaiVolume: {
		current: number;
		previous: number;
		trend: number[];
	};
	cmrReferrals: number;
	competitorActivity: CompetitorTrend[];
	riskLevel: 'high' | 'medium' | 'low';
}

interface ReferringPhysician {
	id: string;
	name: string;
	specialty: string;
	practice: string;
	yearlyData: {
		[year: number]: YearlyData;
	};
}

const mockPhysicians: ReferringPhysician[] = [
	{
		id: '1',
		name: 'Dr. Michael Thompson',
		specialty: 'Cardiology',
		practice: 'UCLA Cardiology Associates',
		yearlyData: {
			2024: {
				cedarsSinaiVolume: {
					current: 18,
					previous: 22,
					trend: [25, 24, 23, 21, 22, 18],
				},
				cmrReferrals: 12,
				riskLevel: 'high',
				competitorActivity: [
					{
						hospitalName: 'Kaiser Permanente West LA',
						monthlyVolume: 10,
						trend: 'increasing',
						percentChange: 25,
					},
					{
						hospitalName: 'UCLA Medical Center',
						monthlyVolume: 5,
						trend: 'increasing',
						percentChange: 15,
					},
				],
			},
			2025: {
				cedarsSinaiVolume: {
					current: 12,
					previous: 18,
					trend: [22, 20, 19, 16, 18, 12],
				},
				cmrReferrals: 8,
				riskLevel: 'high',
				competitorActivity: [
					{
						hospitalName: 'Kaiser Permanente West LA',
						monthlyVolume: 15,
						trend: 'increasing',
						percentChange: 35,
					},
					{
						hospitalName: 'UCLA Medical Center',
						monthlyVolume: 8,
						trend: 'increasing',
						percentChange: 20,
					},
				],
			},
			2026: {
				cedarsSinaiVolume: {
					current: 15,
					previous: 12,
					trend: [12, 13, 14, 15, 16, 15],
				},
				cmrReferrals: 10,
				riskLevel: 'medium',
				competitorActivity: [
					{
						hospitalName: 'Kaiser Permanente West LA',
						monthlyVolume: 12,
						trend: 'decreasing',
						percentChange: -20,
					},
					{
						hospitalName: 'UCLA Medical Center',
						monthlyVolume: 6,
						trend: 'decreasing',
						percentChange: -25,
					},
				],
			},
			2027: {
				cedarsSinaiVolume: {
					current: 20,
					previous: 15,
					trend: [15, 16, 17, 18, 19, 20],
				},
				cmrReferrals: 14,
				riskLevel: 'low',
				competitorActivity: [
					{
						hospitalName: 'Kaiser Permanente West LA',
						monthlyVolume: 8,
						trend: 'decreasing',
						percentChange: -33,
					},
					{
						hospitalName: 'UCLA Medical Center',
						monthlyVolume: 4,
						trend: 'decreasing',
						percentChange: -33,
					},
				],
			},
		},
	},
	{
		id: '2',
		name: 'Dr. Lisa Rodriguez',
		specialty: 'Internal Medicine',
		practice: 'Santa Monica Medical Group',
		yearlyData: {
			2024: {
				cedarsSinaiVolume: {
					current: 15,
					previous: 18,
					trend: [20, 19, 18, 17, 18, 15],
				},
				cmrReferrals: 10,
				riskLevel: 'medium',
				competitorActivity: [
					{
						hospitalName: 'Providence Saint Joseph',
						monthlyVolume: 8,
						trend: 'increasing',
						percentChange: 30,
					},
				],
			},
			2025: {
				cedarsSinaiVolume: {
					current: 8,
					previous: 15,
					trend: [18, 16, 14, 12, 15, 8],
				},
				cmrReferrals: 5,
				riskLevel: 'high',
				competitorActivity: [
					{
						hospitalName: 'Providence Saint Joseph',
						monthlyVolume: 12,
						trend: 'increasing',
						percentChange: 50,
					},
				],
			},
			2026: {
				cedarsSinaiVolume: {
					current: 12,
					previous: 8,
					trend: [8, 9, 10, 11, 12, 12],
				},
				cmrReferrals: 8,
				riskLevel: 'medium',
				competitorActivity: [
					{
						hospitalName: 'Providence Saint Joseph',
						monthlyVolume: 9,
						trend: 'decreasing',
						percentChange: -25,
					},
				],
			},
			2027: {
				cedarsSinaiVolume: {
					current: 18,
					previous: 12,
					trend: [12, 14, 15, 16, 17, 18],
				},
				cmrReferrals: 12,
				riskLevel: 'low',
				competitorActivity: [
					{
						hospitalName: 'Providence Saint Joseph',
						monthlyVolume: 6,
						trend: 'decreasing',
						percentChange: -33,
					},
				],
			},
		},
	},
	{
		id: '3',
		name: 'Dr. James Park',
		specialty: 'Interventional Cardiology',
		practice: 'Beverly Hills Heart Institute',
		yearlyData: {
			2024: {
				cedarsSinaiVolume: {
					current: 12,
					previous: 10,
					trend: [8, 9, 10, 11, 10, 12],
				},
				cmrReferrals: 8,
				riskLevel: 'low',
				competitorActivity: [
					{
						hospitalName: 'Good Samaritan Hospital',
						monthlyVolume: 7,
						trend: 'stable',
						percentChange: 5,
					},
				],
			},
			2025: {
				cedarsSinaiVolume: {
					current: 14,
					previous: 12,
					trend: [10, 11, 12, 13, 12, 14],
				},
				cmrReferrals: 9,
				riskLevel: 'low',
				competitorActivity: [
					{
						hospitalName: 'Good Samaritan Hospital',
						monthlyVolume: 6,
						trend: 'stable',
						percentChange: 0,
					},
				],
			},
			2026: {
				cedarsSinaiVolume: {
					current: 17,
					previous: 14,
					trend: [14, 15, 16, 16, 17, 17],
				},
				cmrReferrals: 12,
				riskLevel: 'low',
				competitorActivity: [
					{
						hospitalName: 'Good Samaritan Hospital',
						monthlyVolume: 5,
						trend: 'decreasing',
						percentChange: -17,
					},
				],
			},
			2027: {
				cedarsSinaiVolume: {
					current: 22,
					previous: 17,
					trend: [17, 18, 19, 20, 21, 22],
				},
				cmrReferrals: 16,
				riskLevel: 'low',
				competitorActivity: [
					{
						hospitalName: 'Good Samaritan Hospital',
						monthlyVolume: 4,
						trend: 'decreasing',
						percentChange: -20,
					},
				],
			},
		},
	},
];

interface ReferringVolumeAnalyticsProps {
	selectedYear: number;
	hospitalName?: string;
}

export function ReferringVolumeAnalytics({ selectedYear, hospitalName = 'Cedars-Sinai' }: ReferringVolumeAnalyticsProps) {
	const [expandedPhysician, setExpandedPhysician] = useState<string | null>(null);
	
	// Get current year data for all physicians
	const currentYearData = mockPhysicians.map(physician => ({
		...physician,
		currentData: physician.yearlyData[selectedYear]
	}));

	const totalCurrentVolume = currentYearData.reduce((sum, p) => sum + p.currentData.cedarsSinaiVolume.current, 0);
	const totalPreviousVolume = currentYearData.reduce((sum, p) => sum + p.currentData.cedarsSinaiVolume.previous, 0);
	const volumeChange = totalCurrentVolume - totalPreviousVolume;
	const volumeChangePercent = totalPreviousVolume > 0 ? ((volumeChange / totalPreviousVolume) * 100).toFixed(1) : '0.0';

	const highRiskPhysicians = currentYearData.filter(p => p.currentData.riskLevel === 'high').length;
	const totalCMRAtRisk = currentYearData
		.filter(p => p.currentData.riskLevel === 'high')
		.reduce((sum, p) => sum + p.currentData.cmrReferrals, 0);

	const isPredictiveYear = selectedYear >= 2026;
	const getTitle = () => {
		const shortName = hospitalName?.split(' ')[0] || 'Cedars-Sinai';
		return `${shortName} Referring Physician Analytics`;
	};

	const getSubtitle = () => {
		const baseSubtitle = "Track physicians referring to Cedars-Sinai and monitor competitive activity";
		if (isPredictiveYear) {
			return `${baseSubtitle} (Statistical projections based on historical trends and market analysis)`;
		}
		return baseSubtitle;
	};

	const getRiskColor = (risk: string) => {
		switch (risk) {
			case 'high': return 'bg-red-50 border-red-200 text-red-800';
			case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
			case 'low': return 'bg-green-50 border-green-200 text-green-800';
			default: return 'bg-gray-50 border-gray-200 text-gray-800';
		}
	};

	const getTrendIcon = (current: number, previous: number) => {
		if (current > previous) return { icon: faArrowUp, color: 'text-green-600' };
		if (current < previous) return { icon: faArrowDown, color: 'text-red-600' };
		return { icon: faArrowUp, color: 'text-gray-400' };
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<div className="mb-6">
				<div className="flex items-center justify-between mb-4">
					<div>
						<h2 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center">
							{getTitle()}
							{isPredictiveYear && (
								<span className="ml-3 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
									Projected
								</span>
							)}
						</h2>
						<p className="text-gray-600">
							{getSubtitle()}
						</p>
					</div>
				</div>
			</div>

			{/* Key Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				<div className="bg-gray-50 rounded-lg p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600 mb-1">Total Monthly Referrals</p>
							<p className="text-2xl font-bold text-gray-900">{totalCurrentVolume}</p>
							<div className="flex items-center mt-1">
								<FontAwesomeIcon
									icon={volumeChange >= 0 ? faArrowUp : faArrowDown}
									className={`w-3 h-3 mr-1 ${volumeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}
								/>
								<span className={`text-sm font-medium ${volumeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
									{Math.abs(Number(volumeChangePercent))}% vs last month
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className="bg-red-50 rounded-lg p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-red-600 mb-1">High Risk Physicians</p>
							<p className="text-2xl font-bold text-red-800">{highRiskPhysicians}</p>
							<p className="text-sm text-red-600 mt-1">Declining referral volume</p>
						</div>
						<FontAwesomeIcon icon={faExclamationTriangle} className="w-6 h-6 text-red-500" />
					</div>
				</div>

				<div className="bg-blue-50 rounded-lg p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-blue-600 mb-1">CMR Referrals at Risk</p>
							<p className="text-2xl font-bold text-blue-800">{totalCMRAtRisk}</p>
							<p className="text-sm text-blue-600 mt-1">From high-risk physicians</p>
						</div>
						<FontAwesomeIcon icon={faHeart} className="w-6 h-6 text-blue-500" />
					</div>
				</div>
			</div>

			{/* Physician List */}
			<div>
				<h3 className="text-lg font-semibold text-gray-900 mb-4">Referring Physicians</h3>
				<div className="space-y-3">
					{currentYearData.map((physician) => {
						const isExpanded = expandedPhysician === physician.id;
						const volumeChange = physician.currentData.cedarsSinaiVolume.current - physician.currentData.cedarsSinaiVolume.previous;
						const changePercent = physician.currentData.cedarsSinaiVolume.previous > 0 
							? ((volumeChange / physician.currentData.cedarsSinaiVolume.previous) * 100).toFixed(1)
							: '0.0';
						const trendIcon = getTrendIcon(physician.currentData.cedarsSinaiVolume.current, physician.currentData.cedarsSinaiVolume.previous);

						return (
							<div key={physician.id} className="border border-gray-200 rounded-lg overflow-hidden">
								{/* Main Physician Row */}
								<div
									className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
										isExpanded ? 'bg-gray-50' : ''
									}`}
									onClick={() => setExpandedPhysician(isExpanded ? null : physician.id)}
								>
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-4">
											<FontAwesomeIcon
												icon={isExpanded ? faChevronDown : faChevronRight}
												className="w-4 h-4 text-gray-400"
											/>
											<div>
												<h4 className="font-medium text-gray-900">{physician.name}</h4>
												<p className="text-sm text-gray-600">
													{physician.specialty} • {physician.practice}
												</p>
											</div>
										</div>

										<div className="flex items-center space-x-3">
											<div className="text-right flex-shrink-0">
												<p className="text-xs text-gray-500 whitespace-nowrap">Current Month</p>
												<p className="font-semibold text-gray-900">{physician.currentData.cedarsSinaiVolume.current}</p>
											</div>
											<div className="text-right flex-shrink-0">
												<p className="text-xs text-gray-500 whitespace-nowrap">CMR Referrals</p>
												<p className="font-semibold text-blue-700">{physician.currentData.cmrReferrals}</p>
											</div>
											<div className="text-right flex-shrink-0">
												<div className="flex items-center justify-end">
													<FontAwesomeIcon
														icon={trendIcon.icon}
														className={`w-3 h-3 mr-1 ${trendIcon.color}`}
													/>
													<span className={`text-xs font-medium ${trendIcon.color} whitespace-nowrap`}>
														{Math.abs(Number(changePercent))}%
													</span>
												</div>
											</div>
											<div className="flex-shrink-0">
												<span className={`px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getRiskColor(physician.currentData.riskLevel)}`}>
													{physician.currentData.riskLevel} risk
												</span>
											</div>
										</div>
									</div>
								</div>

								{/* Expanded Details */}
								{isExpanded && (
									<div className="border-t border-gray-200 bg-white p-4">
										<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
											{/* Referral Trend to Cedars-Sinai */}
											<div>
												<h5 className="font-medium text-gray-900 mb-3">
													Referrals to Cedars-Sinai (6 months) - {selectedYear}
												</h5>
												<div className="bg-gradient-to-b from-blue-50 to-white rounded-lg p-4 pt-8 border border-blue-100">
													<div className="flex items-end justify-between h-24 mb-3 px-2">
														{physician.currentData.cedarsSinaiVolume.trend.map((volume, index) => {
															const maxVolume = Math.max(...physician.currentData.cedarsSinaiVolume.trend);
															const height = Math.max((volume / maxVolume) * 70, 8);
													const isLastMonth = index === physician.currentData.cedarsSinaiVolume.trend.length - 1;
													const isIncreasing = index > 0 && volume > physician.currentData.cedarsSinaiVolume.trend[index - 1];
													const isDecreasing = index > 0 && volume < physician.currentData.cedarsSinaiVolume.trend[index - 1];
															return (
																<div key={index} className="flex flex-col items-center group relative">
																	<div
																		className={`rounded-t-md w-10 transition-all duration-300 group-hover:shadow-lg ${
																			isLastMonth ? 'bg-gradient-to-t from-blue-600 to-blue-400 ring-2 ring-blue-200' :
																			isIncreasing ? 'bg-gradient-to-t from-emerald-500 to-emerald-400' :
																			isDecreasing ? 'bg-gradient-to-t from-red-500 to-red-400' :
																			'bg-gradient-to-t from-slate-400 to-slate-300'
																		}`}
																		style={{ height: `${height}px` }}
																	/>
																	<span className="text-xs text-slate-700 mt-2 font-medium">{volume}</span>
																	<span className="text-xs text-slate-500 mt-1">M{index + 1}</span>
																	
																	{/* Tooltip */}
																	<div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
																		Month {index + 1}: {volume} referrals
																		<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
																	</div>
																</div>
															);
														})}
													</div>
													
													{/* Legend */}
													<div className="flex items-center justify-center gap-4 text-xs mt-3">
														<div className="flex items-center gap-1">
															<div className="w-3 h-3 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded"></div>
															<span className="text-slate-600">Increasing</span>
														</div>
														<div className="flex items-center gap-1">
															<div className="w-3 h-3 bg-gradient-to-t from-red-500 to-red-400 rounded"></div>
															<span className="text-slate-600">Decreasing</span>
														</div>
														<div className="flex items-center gap-1">
															<div className="w-3 h-3 bg-gradient-to-t from-blue-600 to-blue-400 rounded ring-1 ring-blue-200"></div>
															<span className="text-slate-600">Current Month</span>
														</div>
													</div>
												</div>
											</div>

											{/* Competitor Activity */}
											<div>
												<h5 className="font-medium text-gray-900 mb-3">
													Activity at Competing Hospitals - {selectedYear}
													<span className="text-xs text-gray-500 block mt-1">
														Green = confirmed referral activity at competitors
													</span>
												</h5>
												<div className="space-y-3">
													{physician.currentData.competitorActivity.map((competitor, index) => (
														<div key={index} className="bg-gray-50 rounded-lg p-3">
															<div className="flex items-center justify-between">
																<div className="flex items-center">
																	<FontAwesomeIcon
																		icon={faBuilding}
																		className="w-4 h-4 text-gray-500 mr-2"
																	/>
																	<div>
																		<p className="font-medium text-gray-900 text-sm">
																			{competitor.hospitalName}
																		</p>
																		<p className="text-xs text-gray-600">
																			{competitor.monthlyVolume} monthly referrals
																		</p>
																	</div>
																</div>
																<div className="flex items-center">
																	<FontAwesomeIcon
																		icon={competitor.trend === 'increasing' ? faArrowUp : 
																			  competitor.trend === 'decreasing' ? faArrowDown : faArrowUp}
																		className={`w-3 h-3 mr-1 ${
																			competitor.trend === 'increasing' ? 'text-green-600' :
																			competitor.trend === 'decreasing' ? 'text-red-600' : 'text-gray-400'
																		}`}
																	/>
																	<span className={`text-sm font-medium ${
																		competitor.trend === 'increasing' ? 'text-green-600' :
																		competitor.trend === 'decreasing' ? 'text-red-600' : 'text-gray-400'
																	}`}>
																		{competitor.percentChange > 0 ? '+' : ''}{competitor.percentChange}%
																	</span>
																</div>
															</div>
														</div>
													))}
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}