'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHeart,
	faDollarSign,
	faChartLine,
	faArrowTrendUp,
} from '@fortawesome/free-solid-svg-icons';

// Year-based CMR data showing growth over time
const yearlyDataMap: Record<number, {
	monthlyVolume: number;
	reimbursementPerStudy: number;
}> = {
	2024: { monthlyVolume: 110, reimbursementPerStudy: 3300 },
	2025: { monthlyVolume: 125, reimbursementPerStudy: 3500 },
	2026: { monthlyVolume: 145, reimbursementPerStudy: 3650 },
	2027: { monthlyVolume: 165, reimbursementPerStudy: 3800 },
};

const calculate1YearProjection = (growthRate: number, baseVolume: number, reimbursementRate: number) => {
	const annualVolume = baseVolume * 12;
	const currentAnnualRevenue = annualVolume * reimbursementRate;
	const newVolume = Math.round(annualVolume * (1 + growthRate / 100));
	const newReimbursement = newVolume * reimbursementRate;
	const additionalVolume = newVolume - annualVolume;
	const additionalRevenue = newReimbursement - currentAnnualRevenue;
	
	return {
		growthRate,
		currentVolume: annualVolume,
		projectedVolume: newVolume,
		additionalVolume,
		currentRevenue: currentAnnualRevenue,
		projectedRevenue: newReimbursement,
		additionalRevenue,
	};
};

interface CMRGrowthProjectionsProps {
	selectedYear: number;
	hospitalName?: string;
}

export function CMRGrowthProjections({ selectedYear, hospitalName = 'Cedars-Sinai Medical Center' }: CMRGrowthProjectionsProps) {
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	};

	const formatVolume = (volume: number) => {
		return new Intl.NumberFormat('en-US').format(volume);
	};

	// Get data for selected year
	const currentYearData = yearlyDataMap[selectedYear] || yearlyDataMap[2025];
	const currentCMRVolume = currentYearData.monthlyVolume;
	const currentReimbursementPerCMR = currentYearData.reimbursementPerStudy;
	const annualCMRVolume = currentCMRVolume * 12;
	const currentAnnualReimbursement = annualCMRVolume * currentReimbursementPerCMR;

	// Calculate projections based on current year data
	const growth20Profile = calculate1YearProjection(20, currentCMRVolume, currentReimbursementPerCMR);
	const growth30Profile = calculate1YearProjection(30, currentCMRVolume, currentReimbursementPerCMR);

	const isPredictiveYear = selectedYear >= 2026;
	const getTitle = () => {
		const shortName = hospitalName?.split(' ')[0] || 'Cedars-Sinai';
		return `${shortName} CMR Growth Projections & Revenue Impact`;
	};

	const getSubtitle = () => {
		const baseSubtitle = "Current CMR volume with projected growth scenarios and associated reimbursement increases";
		if (isPredictiveYear) {
			return `${baseSubtitle} (Statistical projections based on historical trends and market analysis)`;
		}
		return baseSubtitle;
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<div className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center">
					<FontAwesomeIcon icon={faChartLine} className="w-6 h-6 text-slate-600 mr-3" />
					{getTitle()}
					{isPredictiveYear && (
						<span className="ml-3 bg-slate-100 text-slate-800 text-xs font-medium px-2 py-1 rounded-full">
							Projected
						</span>
					)}
				</h2>
				<p className="text-gray-600">
					{getSubtitle()}
				</p>
			</div>

			{/* Current State */}
			<div className="bg-slate-50 rounded-lg p-6 mb-6">
				<h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
					<FontAwesomeIcon icon={faHeart} className="w-5 h-5 mr-2" />
					Current CMR Performance ({selectedYear})
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="text-center">
						<p className="text-3xl font-bold text-slate-700 mb-1">{currentCMRVolume}</p>
						<p className="text-sm text-slate-600">Monthly CMR Volume</p>
					</div>
					<div className="text-center">
						<p className="text-3xl font-bold text-slate-700 mb-1">{formatVolume(annualCMRVolume)}</p>
						<p className="text-sm text-slate-600">Annual CMR Volume</p>
					</div>
					<div className="text-center">
						<p className="text-3xl font-bold text-slate-700 mb-1">{formatCurrency(currentAnnualReimbursement)}</p>
						<p className="text-sm text-slate-600">Annual CMR Revenue</p>
					</div>
				</div>
			</div>

			{/* Growth Scenarios - Single Year Profiles */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* 20% Growth Profile */}
				<div className="border border-gray-200 rounded-lg p-6">
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-lg font-semibold text-gray-900 flex items-center">
							<FontAwesomeIcon icon={faArrowTrendUp} className="w-5 h-5 text-slate-600 mr-2" />
							20% Growth Profile
						</h3>
						<span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
							Conservative
						</span>
					</div>
					
					<div className="space-y-6">
						{/* Current vs Projected - Single column */}
						<div className="space-y-4">
							<div className="bg-gray-50 rounded-lg p-4 text-center">
								<p className="text-sm text-gray-600 mb-1">Current Annual</p>
								<p className="text-2xl font-bold text-gray-900">{formatVolume(growth20Profile.currentVolume)}</p>
								<p className="text-xs text-gray-500">CMR Studies</p>
							</div>
							<div className="bg-emerald-50 rounded-lg p-4 text-center border border-emerald-100">
								<p className="text-sm text-emerald-700 mb-1">With 20% Growth</p>
								<p className="text-2xl font-bold text-emerald-800">{formatVolume(growth20Profile.projectedVolume)}</p>
								<p className="text-xs text-emerald-600">CMR Studies</p>
							</div>
						</div>

						{/* Revenue Impact */}
						<div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
							<div className="flex items-center justify-between mb-3">
								<h4 className="font-semibold text-emerald-800">Revenue Impact</h4>
							</div>
							<div className="space-y-2">
								<div className="flex justify-between">
									<span className="text-sm text-emerald-700">Current Revenue:</span>
									<span className="font-bold text-emerald-800">{formatCurrency(growth20Profile.currentRevenue)}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-emerald-700">Projected Revenue:</span>
									<span className="font-bold text-emerald-800">{formatCurrency(growth20Profile.projectedRevenue)}</span>
								</div>
								<div className="pt-2 border-t border-emerald-200">
									<div className="flex justify-between">
										<span className="font-medium text-emerald-800">Additional Revenue:</span>
										<span className="text-lg font-bold text-emerald-900">
											+{formatCurrency(growth20Profile.additionalRevenue)}
										</span>
									</div>
									<div className="flex justify-between mt-1">
										<span className="text-sm text-emerald-700">Additional Studies:</span>
										<span className="font-semibold text-emerald-800">
											+{formatVolume(growth20Profile.additionalVolume)} CMR
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 30% Growth Profile */}
				<div className="border border-gray-200 rounded-lg p-6">
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-lg font-semibold text-gray-900 flex items-center">
							<FontAwesomeIcon icon={faArrowTrendUp} className="w-5 h-5 text-purple-600 mr-2" />
							30% Growth Profile
						</h3>
						<span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
							Aggressive
						</span>
					</div>
					
					<div className="space-y-6">
						{/* Current vs Projected - Single column */}
						<div className="space-y-4">
							<div className="bg-gray-50 rounded-lg p-4 text-center">
								<p className="text-sm text-gray-600 mb-1">Current Annual</p>
								<p className="text-2xl font-bold text-gray-900">{formatVolume(growth30Profile.currentVolume)}</p>
								<p className="text-xs text-gray-500">CMR Studies</p>
							</div>
							<div className="bg-purple-50 rounded-lg p-4 text-center">
								<p className="text-sm text-purple-600 mb-1">With 30% Growth</p>
								<p className="text-2xl font-bold text-purple-800">{formatVolume(growth30Profile.projectedVolume)}</p>
								<p className="text-xs text-purple-600">CMR Studies</p>
							</div>
						</div>

						{/* Revenue Impact */}
						<div className="bg-purple-100 rounded-lg p-4">
							<div className="flex items-center justify-between mb-3">
								<h4 className="font-semibold text-purple-800">Revenue Impact</h4>
							</div>
							<div className="space-y-2">
								<div className="flex justify-between">
									<span className="text-sm text-purple-700">Current Revenue:</span>
									<span className="font-bold text-purple-800">{formatCurrency(growth30Profile.currentRevenue)}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-purple-700">Projected Revenue:</span>
									<span className="font-bold text-purple-800">{formatCurrency(growth30Profile.projectedRevenue)}</span>
								</div>
								<div className="pt-2 border-t border-purple-200">
									<div className="flex justify-between">
										<span className="font-medium text-purple-800">Additional Revenue:</span>
										<span className="text-lg font-bold text-purple-900">
											+{formatCurrency(growth30Profile.additionalRevenue)}
										</span>
									</div>
									<div className="flex justify-between mt-1">
										<span className="text-sm text-purple-700">Additional Studies:</span>
										<span className="font-semibold text-purple-800">
											+{formatVolume(growth30Profile.additionalVolume)} CMR
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Key Assumptions */}
			<div className="mt-6 bg-gray-50 rounded-lg p-4">
				<h4 className="font-semibold text-gray-900 mb-2 flex items-center">
					<FontAwesomeIcon icon={faDollarSign} className="w-4 h-4 text-gray-600 mr-2" />
					Reimbursement Assumptions
				</h4>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
					<div>
						<span className="font-medium">Average CMR Reimbursement:</span>
						<p className="text-gray-900 font-semibold">{formatCurrency(currentReimbursementPerCMR)} per study</p>
					</div>
					<div>
						<span className="font-medium">Current Monthly Volume:</span>
						<p className="text-gray-900 font-semibold">{currentCMRVolume} CMR studies</p>
					</div>
					<div>
						<span className="font-medium">Growth Compounding:</span>
						<p className="text-gray-900 font-semibold">Annual compound interest</p>
					</div>
				</div>
			</div>
		</div>
	);
}