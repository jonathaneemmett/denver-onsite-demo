'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHospital,
	faMapMarkerAlt,
	faHeart,
	faLungs,
	faArrowUp,
	faArrowDown,
	faChevronRight,
	faBuilding,
	faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface HospitalData {
	id: string;
	name: string;
	location: string;
	distance: number;
	structure: string; // Health system they belong to
	cmrVolume: number;
	chestMriVolume: number;
	totalVolume: number;
	marketShare: number;
	growthTrend: 'increasing' | 'stable' | 'decreasing';
	growthPercent: number;
	opportunity: 'high' | 'medium' | 'low';
}

// Year-based data showing expansion opportunities
const hospitalDataByYear: Record<number, HospitalData[]> = {
	2024: [
		{
			id: 'csmc',
			name: 'Cedars-Sinai Medical Center',
			location: 'West Hollywood, CA',
			distance: 0,
			structure: 'Cedars-Sinai Health System',
			cmrVolume: 145,
			chestMriVolume: 89,
			totalVolume: 234,
			marketShare: 18.5,
			growthTrend: 'stable',
			growthPercent: 2.1,
			opportunity: 'medium',
		},
		{
			id: 'csmc-marina',
			name: 'Cedars-Sinai Marina del Rey Hospital',
			location: 'Marina del Rey, CA',
			distance: 12,
			structure: 'Cedars-Sinai Health System',
			cmrVolume: 34,
			chestMriVolume: 28,
			totalVolume: 62,
			marketShare: 4.9,
			growthTrend: 'decreasing',
			growthPercent: -8.3,
			opportunity: 'high',
		},
		{
			id: 'ucla-main',
			name: 'UCLA Medical Center',
			location: 'Westwood, CA',
			distance: 8,
			structure: 'UCLA Health System',
			cmrVolume: 128,
			chestMriVolume: 156,
			totalVolume: 284,
			marketShare: 22.4,
			growthTrend: 'increasing',
			growthPercent: 12.7,
			opportunity: 'medium',
		},
		{
			id: 'ucla-santa-monica',
			name: 'UCLA Santa Monica Medical Center',
			location: 'Santa Monica, CA',
			distance: 15,
			structure: 'UCLA Health System',
			cmrVolume: 67,
			chestMriVolume: 84,
			totalVolume: 151,
			marketShare: 11.9,
			growthTrend: 'increasing',
			growthPercent: 15.2,
			opportunity: 'high',
		},
		{
			id: 'providence-main',
			name: 'Providence Saint Joseph Medical Center',
			location: 'Burbank, CA',
			distance: 18,
			structure: 'Providence Health System',
			cmrVolume: 78,
			chestMriVolume: 45,
			totalVolume: 123,
			marketShare: 9.7,
			growthTrend: 'stable',
			growthPercent: 1.8,
			opportunity: 'medium',
		},
		{
			id: 'providence-tarzana',
			name: 'Providence Tarzana Medical Center',
			location: 'Tarzana, CA',
			distance: 24,
			structure: 'Providence Health System',
			cmrVolume: 45,
			chestMriVolume: 38,
			totalVolume: 83,
			marketShare: 6.5,
			growthTrend: 'decreasing',
			growthPercent: -5.4,
			opportunity: 'high',
		},
	],
	2025: [
		{
			id: 'csmc',
			name: 'Cedars-Sinai Medical Center',
			location: 'West Hollywood, CA',
			distance: 0,
			structure: 'Cedars-Sinai Health System',
			cmrVolume: 138,
			chestMriVolume: 85,
			totalVolume: 223,
			marketShare: 17.8,
			growthTrend: 'decreasing',
			growthPercent: -4.7,
			opportunity: 'medium',
		},
		{
			id: 'csmc-marina',
			name: 'Cedars-Sinai Marina del Rey Hospital',
			location: 'Marina del Rey, CA',
			distance: 12,
			structure: 'Cedars-Sinai Health System',
			cmrVolume: 28,
			chestMriVolume: 22,
			totalVolume: 50,
			marketShare: 4.0,
			growthTrend: 'decreasing',
			growthPercent: -19.4,
			opportunity: 'high',
		},
		{
			id: 'ucla-main',
			name: 'UCLA Medical Center',
			location: 'Westwood, CA',
			distance: 8,
			structure: 'UCLA Health System',
			cmrVolume: 142,
			chestMriVolume: 168,
			totalVolume: 310,
			marketShare: 24.7,
			growthTrend: 'increasing',
			growthPercent: 9.2,
			opportunity: 'low',
		},
		{
			id: 'ucla-santa-monica',
			name: 'UCLA Santa Monica Medical Center',
			location: 'Santa Monica, CA',
			distance: 15,
			structure: 'UCLA Health System',
			cmrVolume: 78,
			chestMriVolume: 95,
			totalVolume: 173,
			marketShare: 13.8,
			growthTrend: 'increasing',
			growthPercent: 14.6,
			opportunity: 'medium',
		},
		{
			id: 'providence-main',
			name: 'Providence Saint Joseph Medical Center',
			location: 'Burbank, CA',
			distance: 18,
			structure: 'Providence Health System',
			cmrVolume: 72,
			chestMriVolume: 41,
			totalVolume: 113,
			marketShare: 9.0,
			growthTrend: 'decreasing',
			growthPercent: -8.1,
			opportunity: 'high',
		},
		{
			id: 'providence-tarzana',
			name: 'Providence Tarzana Medical Center',
			location: 'Tarzana, CA',
			distance: 24,
			structure: 'Providence Health System',
			cmrVolume: 38,
			chestMriVolume: 32,
			totalVolume: 70,
			marketShare: 5.6,
			growthTrend: 'decreasing',
			growthPercent: -15.7,
			opportunity: 'high',
		},
	],
	2026: [
		{
			id: 'csmc',
			name: 'Cedars-Sinai Medical Center',
			location: 'West Hollywood, CA',
			distance: 0,
			structure: 'Cedars-Sinai Health System',
			cmrVolume: 165,
			chestMriVolume: 112,
			totalVolume: 277,
			marketShare: 21.2,
			growthTrend: 'increasing',
			growthPercent: 24.2,
			opportunity: 'low',
		},
		{
			id: 'csmc-marina',
			name: 'Cedars-Sinai Marina del Rey Hospital',
			location: 'Marina del Rey, CA',
			distance: 12,
			structure: 'Cedars-Sinai Health System',
			cmrVolume: 45,
			chestMriVolume: 38,
			totalVolume: 83,
			marketShare: 6.3,
			growthTrend: 'increasing',
			growthPercent: 66.0,
			opportunity: 'medium',
		},
		{
			id: 'ucla-main',
			name: 'UCLA Medical Center',
			location: 'Westwood, CA',
			distance: 8,
			structure: 'UCLA Health System',
			cmrVolume: 135,
			chestMriVolume: 158,
			totalVolume: 293,
			marketShare: 22.4,
			growthTrend: 'decreasing',
			growthPercent: -5.5,
			opportunity: 'medium',
		},
		{
			id: 'ucla-santa-monica',
			name: 'UCLA Santa Monica Medical Center',
			location: 'Santa Monica, CA',
			distance: 15,
			structure: 'UCLA Health System',
			cmrVolume: 72,
			chestMriVolume: 89,
			totalVolume: 161,
			marketShare: 12.3,
			growthTrend: 'decreasing',
			growthPercent: -6.9,
			opportunity: 'high',
		},
		{
			id: 'providence-main',
			name: 'Providence Saint Joseph Medical Center',
			location: 'Burbank, CA',
			distance: 18,
			structure: 'Providence Health System',
			cmrVolume: 68,
			chestMriVolume: 39,
			totalVolume: 107,
			marketShare: 8.2,
			growthTrend: 'decreasing',
			growthPercent: -5.3,
			opportunity: 'high',
		},
		{
			id: 'providence-tarzana',
			name: 'Providence Tarzana Medical Center',
			location: 'Tarzana, CA',
			distance: 24,
			structure: 'Providence Health System',
			cmrVolume: 42,
			chestMriVolume: 35,
			totalVolume: 77,
			marketShare: 5.9,
			growthTrend: 'increasing',
			growthPercent: 10.0,
			opportunity: 'medium',
		},
	],
	2027: [
		{
			id: 'csmc',
			name: 'Cedars-Sinai Medical Center',
			location: 'West Hollywood, CA',
			distance: 0,
			structure: 'Cedars-Sinai Health System',
			cmrVolume: 185,
			chestMriVolume: 135,
			totalVolume: 320,
			marketShare: 24.1,
			growthTrend: 'increasing',
			growthPercent: 15.5,
			opportunity: 'low',
		},
		{
			id: 'csmc-marina',
			name: 'Cedars-Sinai Marina del Rey Hospital',
			location: 'Marina del Rey, CA',
			distance: 12,
			structure: 'Cedars-Sinai Health System',
			cmrVolume: 58,
			chestMriVolume: 48,
			totalVolume: 106,
			marketShare: 8.0,
			growthTrend: 'increasing',
			growthPercent: 27.7,
			opportunity: 'low',
		},
		{
			id: 'ucla-main',
			name: 'UCLA Medical Center',
			location: 'Westwood, CA',
			distance: 8,
			structure: 'UCLA Health System',
			cmrVolume: 128,
			chestMriVolume: 148,
			totalVolume: 276,
			marketShare: 20.8,
			growthTrend: 'decreasing',
			growthPercent: -5.8,
			opportunity: 'high',
		},
		{
			id: 'ucla-santa-monica',
			name: 'UCLA Santa Monica Medical Center',
			location: 'Santa Monica, CA',
			distance: 15,
			structure: 'UCLA Health System',
			cmrVolume: 65,
			chestMriVolume: 82,
			totalVolume: 147,
			marketShare: 11.1,
			growthTrend: 'decreasing',
			growthPercent: -8.7,
			opportunity: 'high',
		},
		{
			id: 'providence-main',
			name: 'Providence Saint Joseph Medical Center',
			location: 'Burbank, CA',
			distance: 18,
			structure: 'Providence Health System',
			cmrVolume: 62,
			chestMriVolume: 35,
			totalVolume: 97,
			marketShare: 7.3,
			growthTrend: 'decreasing',
			growthPercent: -9.3,
			opportunity: 'high',
		},
		{
			id: 'providence-tarzana',
			name: 'Providence Tarzana Medical Center',
			location: 'Tarzana, CA',
			distance: 24,
			structure: 'Providence Health System',
			cmrVolume: 38,
			chestMriVolume: 31,
			totalVolume: 69,
			marketShare: 5.2,
			growthTrend: 'decreasing',
			growthPercent: -10.4,
			opportunity: 'high',
		},
	],
};

interface ExpansionOpportunitiesProps {
	selectedYear: number;
	currentHospitalId?: string;
	currentHealthSystem?: string;
}

export function ExpansionOpportunities({
	selectedYear,
	currentHospitalId,
	currentHealthSystem,
}: ExpansionOpportunitiesProps) {
	const [selectedHospital, setSelectedHospital] = useState<string | null>(
		null,
	);

	const hospitalData =
		hospitalDataByYear[selectedYear] || hospitalDataByYear[2025];

	// Filter to only show hospitals in the same health system, excluding the current hospital
	const filteredHospitalData =
		currentHealthSystem && currentHospitalId
			? hospitalData.filter(
					(hospital) =>
						hospital.structure === currentHealthSystem &&
						hospital.id !== currentHospitalId,
			  )
			: currentHospitalId
			? hospitalData.filter(
					(hospital) => hospital.id !== currentHospitalId,
			  )
			: hospitalData;

	// Group hospitals by structure
	const groupedHospitals = filteredHospitalData.reduce((acc, hospital) => {
		if (!acc[hospital.structure]) {
			acc[hospital.structure] = [];
		}
		acc[hospital.structure].push(hospital);
		return acc;
	}, {} as Record<string, HospitalData[]>);

	const isPredictiveYear = selectedYear >= 2026;

	const getOpportunityColor = (opportunity: string) => {
		switch (opportunity) {
			case 'high':
				return 'bg-red-50 border border-red-100 text-red-700';
			case 'medium':
				return 'bg-amber-50 border border-amber-100 text-amber-700';
			case 'low':
				return 'bg-emerald-50 border border-emerald-100 text-emerald-700';
			default:
				return 'bg-slate-50 border border-slate-100 text-slate-700';
		}
	};

	const getTrendIcon = (trend: string, percent: number) => {
		if (trend === 'increasing' || percent > 0)
			return { icon: faArrowUp, color: 'text-emerald-600' };
		if (trend === 'decreasing' || percent < 0)
			return { icon: faArrowDown, color: 'text-red-500' };
		return { icon: faArrowUp, color: 'text-slate-400' };
	};

	const getStructureColor = (structure: string) => {
		if (structure.includes('Cedars-Sinai'))
			return 'from-slate-600 to-slate-700';
		if (structure.includes('UCLA')) return 'from-slate-500 to-slate-600';
		if (structure.includes('Providence'))
			return 'from-slate-600 to-slate-700';
		return 'from-slate-500 to-slate-600';
	};

	const handleHospitalClick = (hospitalId: string) => {
		setSelectedHospital(
			selectedHospital === hospitalId ? null : hospitalId,
		);
	};

	const openHospitalProfile = (
		hospital: HospitalData,
		event: React.MouseEvent,
	) => {
		event.stopPropagation();
		// Navigate to hospital profile in same tab
		const profileUrl = `/hospital-profile/${hospital.id}`;
		window.location.href = profileUrl;
	};

	return (
		<div className='bg-white rounded-lg shadow-sm border border-neutral-200 p-6'>
			<div className='mb-6'>
				<h2 className='text-lg font-semibold text-slate-900 mb-2 flex items-center'>
					<FontAwesomeIcon
						icon={faChartLine}
						className='w-4 h-4 text-slate-600 mr-2'
					/>
					Expansion Opportunities
					{isPredictiveYear && (
						<span className='ml-3 bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1 rounded-full'>
							Projected
						</span>
					)}
				</h2>
				<p className='text-slate-500 text-sm leading-tight'>
					{currentHealthSystem
						? `Other locations within ${currentHealthSystem} with CMR and chest MRI volumes - click any hospital to view profile`
						: 'Regional health systems with CMR and chest MRI volumes - click any hospital to view profile'}
					{isPredictiveYear &&
						' (Statistical projections based on market analysis)'}
				</p>
			</div>

			{/* Health System Groups */}
			<div className='space-y-6'>
				{Object.entries(groupedHospitals).length === 0 ? (
					<div className='text-center py-8 bg-slate-50 rounded-lg'>
						<p className='text-slate-600'>
							{currentHealthSystem
								? `No other locations found within ${currentHealthSystem}`
								: 'No expansion opportunities found'}
						</p>
					</div>
				) : (
					Object.entries(groupedHospitals).map(
						([structure, hospitals]) => (
							<div
								key={structure}
								className='border border-slate-200 rounded-xl overflow-hidden bg-white'>
								{/* Health System Header */}
								<div
									className={`bg-gradient-to-r ${getStructureColor(
										structure,
									)} px-4 py-3`}>
									<div className='flex items-center justify-between'>
										<div className='flex items-center'>
											<FontAwesomeIcon
												icon={faBuilding}
												className='w-4 h-4 text-white mr-3'
											/>
											<h3 className='text-base font-medium text-white'>
												{structure}
											</h3>
										</div>
										<div className='text-slate-200 text-xs font-medium'>
											{hospitals.length}{' '}
											{hospitals.length === 1
												? 'location'
												: 'locations'}
										</div>
									</div>
								</div>

								{/* Hospitals in System */}
								<div className='divide-y divide-slate-100'>
									{hospitals.map((hospital) => (
										<div key={hospital.id}>
											{/* Hospital Row */}
											<div
												className='p-4 hover:bg-slate-50 cursor-pointer transition-all duration-200 group'
												onClick={() =>
													handleHospitalClick(
														hospital.id,
													)
												}>
												<div className='flex items-center justify-between'>
													<div className='flex items-center space-x-4 flex-1'>
														<FontAwesomeIcon
															icon={faHospital}
															className={`w-4 h-4 ${
																hospital.id ===
																'csmc'
																	? 'text-slate-700'
																	: 'text-slate-500'
															} group-hover:text-slate-700 transition-colors`}
														/>
														<div className='flex-1'>
															<div className='flex items-center gap-2'>
																<h4 className='font-medium text-slate-900 group-hover:text-slate-700 transition-colors'>
																	{
																		hospital.name
																	}
																</h4>
																{hospital.distance ===
																	0 && (
																	<span className='bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full font-medium'>
																		Primary
																	</span>
																)}
																<button
																	onClick={(
																		e,
																	) =>
																		openHospitalProfile(
																			hospital,
																			e,
																		)
																	}
																	className='ml-2 text-slate-500 hover:text-slate-700 transition-colors opacity-0 group-hover:opacity-100'
																	title='Open hospital profile'>
																	<FontAwesomeIcon
																		icon={
																			faChevronRight
																		}
																		className='w-3 h-3'
																	/>
																	<span className='sr-only'>
																		View
																		profile
																	</span>
																</button>
															</div>
															<div className='flex items-center text-sm text-slate-500 mt-1'>
																<FontAwesomeIcon
																	icon={
																		faMapMarkerAlt
																	}
																	className='w-3 h-3 mr-1'
																/>
																<span>
																	{
																		hospital.location
																	}
																</span>
																{hospital.distance >
																	0 && (
																	<span className='ml-2 text-slate-400'>
																		•{' '}
																		{
																			hospital.distance
																		}{' '}
																		mi
																	</span>
																)}
															</div>
														</div>
													</div>

													<div className='flex items-center space-x-6'>
														{/* CMR Volume */}
														<div className='text-center'>
															<div className='flex items-center text-xs text-slate-500 justify-center'>
																<FontAwesomeIcon
																	icon={
																		faHeart
																	}
																	className='w-3 h-3 text-red-400 mr-1'
																/>
																<span>CMR</span>
															</div>
															<p className='text-sm font-semibold text-slate-800'>
																{
																	hospital.cmrVolume
																}
															</p>
														</div>

														{/* Chest MRI Volume */}
														<div className='text-center'>
															<div className='flex items-center text-xs text-slate-500 justify-center'>
																<FontAwesomeIcon
																	icon={
																		faLungs
																	}
																	className='w-3 h-3 text-blue-400 mr-1'
																/>
																<span>
																	Chest
																</span>
															</div>
															<p className='text-sm font-semibold text-slate-800'>
																{
																	hospital.chestMriVolume
																}
															</p>
														</div>

														{/* Market Share */}
														<div className='text-center'>
															<p className='text-xs text-slate-500'>
																Share
															</p>
															<p className='text-sm font-semibold text-slate-800'>
																{
																	hospital.marketShare
																}
																%
															</p>
														</div>

														{/* Growth Trend */}
														<div className='text-center'>
															<div className='flex items-center justify-center'>
																<FontAwesomeIcon
																	icon={
																		getTrendIcon(
																			hospital.growthTrend,
																			hospital.growthPercent,
																		).icon
																	}
																	className={`w-3 h-3 mr-1 ${
																		getTrendIcon(
																			hospital.growthTrend,
																			hospital.growthPercent,
																		).color
																	}`}
																/>
																<span
																	className={`text-xs font-medium ${
																		getTrendIcon(
																			hospital.growthTrend,
																			hospital.growthPercent,
																		).color
																	}`}>
																	{Math.abs(
																		hospital.growthPercent,
																	)}
																	%
																</span>
															</div>
														</div>

														{/* Opportunity Level */}
														<div
															className={`px-2 py-1 rounded-md text-xs font-medium ${getOpportunityColor(
																hospital.opportunity,
															)}`}>
															{
																hospital.opportunity
															}
														</div>

														<FontAwesomeIcon
															icon={
																faChevronRight
															}
															className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
																selectedHospital ===
																hospital.id
																	? 'rotate-90'
																	: ''
															}`}
														/>
													</div>
												</div>
											</div>

											{/* Expanded Hospital Details */}
											{selectedHospital ===
												hospital.id && (
												<div className='bg-slate-50 border-t border-slate-100 p-6'>
													<div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
														{/* Volume Details */}
														<div className='bg-white rounded-lg p-4 border border-slate-200'>
															<h5 className='font-medium text-slate-900 mb-3 text-sm'>
																Volume Breakdown
															</h5>
															<div className='space-y-2'>
																<div className='flex justify-between items-center'>
																	<span className='text-xs text-slate-600'>
																		CMR
																		Studies:
																	</span>
																	<span className='font-medium text-slate-800 text-sm'>
																		{
																			hospital.cmrVolume
																		}
																	</span>
																</div>
																<div className='flex justify-between items-center'>
																	<span className='text-xs text-slate-600'>
																		Chest
																		MRI:
																	</span>
																	<span className='font-medium text-slate-800 text-sm'>
																		{
																			hospital.chestMriVolume
																		}
																	</span>
																</div>
																<div className='flex justify-between items-center pt-2 border-t border-slate-100'>
																	<span className='text-xs font-medium text-slate-900'>
																		Total:
																	</span>
																	<span className='font-semibold text-slate-900 text-sm'>
																		{
																			hospital.totalVolume
																		}
																	</span>
																</div>
															</div>
														</div>

														{/* Opportunity Analysis */}
														<div className='bg-white rounded-lg p-4 border border-slate-200'>
															<h5 className='font-medium text-slate-900 mb-3 text-sm'>
																Market Analysis
															</h5>
															<div className='space-y-2'>
																<div className='flex items-center justify-between'>
																	<span className='text-xs text-slate-600'>
																		Trend:
																	</span>
																	<div className='flex items-center'>
																		<FontAwesomeIcon
																			icon={
																				getTrendIcon(
																					hospital.growthTrend,
																					hospital.growthPercent,
																				)
																					.icon
																			}
																			className={`w-3 h-3 mr-1 ${
																				getTrendIcon(
																					hospital.growthTrend,
																					hospital.growthPercent,
																				)
																					.color
																			}`}
																		/>
																		<span
																			className={`text-xs font-medium ${
																				getTrendIcon(
																					hospital.growthTrend,
																					hospital.growthPercent,
																				)
																					.color
																			}`}>
																			{hospital.growthPercent >
																			0
																				? '+'
																				: ''}
																			{
																				hospital.growthPercent
																			}
																			%
																		</span>
																	</div>
																</div>
																<div className='flex justify-between items-center'>
																	<span className='text-xs text-slate-600'>
																		Market
																		Share:
																	</span>
																	<span className='font-medium text-slate-800 text-sm'>
																		{
																			hospital.marketShare
																		}
																		%
																	</span>
																</div>
																<div
																	className={`px-2 py-1 rounded text-center mt-2 ${getOpportunityColor(
																		hospital.opportunity,
																	)}`}>
																	<span className='text-xs font-medium'>
																		{
																			hospital.opportunity
																		}{' '}
																		opportunity
																	</span>
																</div>
															</div>
														</div>

														{/* Actions */}
														<div className='bg-white rounded-lg p-4 border border-slate-200 flex flex-col justify-center'>
															<button
																onClick={(e) =>
																	openHospitalProfile(
																		hospital,
																		e,
																	)
																}
																className='bg-slate-700 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer'>
																<FontAwesomeIcon
																	icon={
																		faChevronRight
																	}
																	className='w-3 h-3'
																/>
																View Full
																Profile
															</button>
															<p className='text-xs text-slate-500 mt-2 text-center'>
																Opens profile
																page
															</p>
														</div>
													</div>
												</div>
											)}
										</div>
									))}
								</div>
							</div>
						),
					)
				)}
			</div>

			{/* Summary Stats */}
			<div className='mt-6 bg-slate-50 rounded-xl p-4'>
				<h4 className='font-medium text-slate-900 mb-3 text-sm'>
					{currentHealthSystem
						? `${currentHealthSystem} Network Summary`
						: 'Regional Summary'}
				</h4>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-center'>
					<div>
						<p className='text-lg font-semibold text-slate-700'>
							{filteredHospitalData.reduce(
								(sum, h) => sum + h.cmrVolume,
								0,
							)}
						</p>
						<p className='text-xs text-slate-500'>Total CMR</p>
					</div>
					<div>
						<p className='text-lg font-semibold text-slate-700'>
							{filteredHospitalData.reduce(
								(sum, h) => sum + h.chestMriVolume,
								0,
							)}
						</p>
						<p className='text-xs text-slate-500'>
							Total Chest MRI
						</p>
					</div>
					<div>
						<p className='text-lg font-semibold text-red-600'>
							{
								filteredHospitalData.filter(
									(h) => h.opportunity === 'high',
								).length
							}
						</p>
						<p className='text-xs text-slate-500'>
							High Opportunity
						</p>
					</div>
					<div>
						<p className='text-lg font-semibold text-slate-700'>
							{Object.keys(groupedHospitals).length}
						</p>
						<p className='text-xs text-slate-500'>Health Systems</p>
					</div>
				</div>
			</div>
		</div>
	);
}
