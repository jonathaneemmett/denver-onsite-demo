'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHospital,
	faMapMarkerAlt,
	faHeart,
	faLungs,
	faChartLine,
	faUsers,
	faStar,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Hospital data for the map interface
interface HospitalMapData {
	id: string;
	name: string;
	location: string;
	type: 'flagship' | 'primary' | 'secondary';
	coordinates: { lat: number; lng: number };
	annualData: {
		cmrVolume: number;
		chestMriVolume: number;
		marketShare: number;
		revenue: number;
	};
	keyMetrics: {
		beds: number;
		cardiacBeds: number;
		designation?: string;
	};
	status: 'excellent' | 'good' | 'needs-attention';
}

const hospitalLocations: HospitalMapData[] = [
	{
		id: 'csmc',
		name: 'Cedars-Sinai Medical Center',
		location: 'West Hollywood, CA',
		type: 'flagship',
		coordinates: { lat: 34.0759, lng: -118.3865 },
		annualData: {
			cmrVolume: 165,
			chestMriVolume: 112,
			marketShare: 21.2,
			revenue: 15200000,
		},
		keyMetrics: {
			beds: 886,
			cardiacBeds: 156,
			designation: 'Magnet',
		},
		status: 'excellent',
	},
	{
		id: 'csmc-marina',
		name: 'Cedars-Sinai Marina del Rey',
		location: 'Marina del Rey, CA',
		type: 'secondary',
		coordinates: { lat: 33.9806, lng: -118.4517 },
		annualData: {
			cmrVolume: 45,
			chestMriVolume: 38,
			marketShare: 6.3,
			revenue: 2950000,
		},
		keyMetrics: {
			beds: 145,
			cardiacBeds: 24,
		},
		status: 'good',
	},
	{
		id: 'ucla-main',
		name: 'UCLA Medical Center',
		location: 'Westwood, CA',
		type: 'primary',
		coordinates: { lat: 34.0689, lng: -118.4452 },
		annualData: {
			cmrVolume: 135,
			chestMriVolume: 158,
			marketShare: 22.4,
			revenue: 14900000,
		},
		keyMetrics: {
			beds: 466,
			cardiacBeds: 78,
			designation: 'Magnet',
		},
		status: 'needs-attention',
	},
	{
		id: 'ucla-santa-monica',
		name: 'UCLA Santa Monica',
		location: 'Santa Monica, CA',
		type: 'secondary',
		coordinates: { lat: 34.0195, lng: -118.4912 },
		annualData: {
			cmrVolume: 72,
			chestMriVolume: 89,
			marketShare: 12.3,
			revenue: 7300000,
		},
		keyMetrics: {
			beds: 266,
			cardiacBeds: 42,
		},
		status: 'good',
	},
	{
		id: 'providence-main',
		name: 'Providence Saint Joseph',
		location: 'Burbank, CA',
		type: 'secondary',
		coordinates: { lat: 34.2009, lng: -118.3090 },
		annualData: {
			cmrVolume: 68,
			chestMriVolume: 39,
			marketShare: 8.2,
			revenue: 3600000,
		},
		keyMetrics: {
			beds: 431,
			cardiacBeds: 64,
		},
		status: 'needs-attention',
	},
	{
		id: 'providence-tarzana',
		name: 'Providence Tarzana',
		location: 'Tarzana, CA',
		type: 'secondary',
		coordinates: { lat: 34.1684, lng: -118.5354 },
		annualData: {
			cmrVolume: 42,
			chestMriVolume: 35,
			marketShare: 5.9,
			revenue: 2600000,
		},
		keyMetrics: {
			beds: 249,
			cardiacBeds: 36,
		},
		status: 'good',
	},
];

export default function Home() {
	const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
	const router = useRouter();

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'excellent': return 'bg-emerald-50 border-emerald-200 text-emerald-800';
			case 'good': return 'bg-blue-50 border-blue-200 text-blue-800';
			case 'needs-attention': return 'bg-amber-50 border-amber-200 text-amber-800';
			default: return 'bg-slate-50 border-slate-200 text-slate-800';
		}
	};

	const getTypeIcon = (type: string) => {
		switch (type) {
			case 'flagship': return { icon: faStar, color: 'text-yellow-500' };
			case 'primary': return { icon: faHospital, color: 'text-blue-600' };
			case 'secondary': return { icon: faHospital, color: 'text-slate-500' };
			default: return { icon: faHospital, color: 'text-slate-500' };
		}
	};

	const openHospitalProfile = (hospitalId: string) => {
		if (hospitalId === 'csmc') {
			// For Cedars-Sinai, we could go to a dedicated dashboard
			router.push(`/hospital-profile/${hospitalId}`);
		} else {
			router.push(`/hospital-profile/${hospitalId}`);
		}
	};

	// Sort hospitals to put Cedars-Sinai first
	const sortedHospitals = [...hospitalLocations].sort((a, b) => {
		if (a.id === 'csmc') return -1;
		if (b.id === 'csmc') return 1;
		if (a.type === 'flagship') return -1;
		if (b.type === 'flagship') return 1;
		if (a.type === 'primary' && b.type === 'secondary') return -1;
		if (a.type === 'secondary' && b.type === 'primary') return 1;
		return 0;
	});

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
			{/* Header */}
			<div className='bg-white border-b border-slate-200 shadow-sm'>
				<div className='max-w-7xl mx-auto p-6'>
					<div className='text-center'>
						<h1 className='text-3xl font-bold text-slate-900 mb-2'>
							Cardiac Imaging Network Analysis
						</h1>
						<p className='text-slate-600 max-w-2xl mx-auto'>
							Regional healthcare facility overview and competitive market analysis for cardiac imaging services
						</p>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto p-6'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Map Area - Left 2/3 */}
					<div className='lg:col-span-2'>
						<div className='bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden'>
							<div className='bg-gradient-to-r from-slate-700 to-slate-800 text-white p-4'>
								<h2 className='text-lg font-semibold flex items-center'>
									<FontAwesomeIcon icon={faMapMarkerAlt} className='w-5 h-5 mr-3' />
									Los Angeles County Medical Centers
								</h2>
								<p className='text-slate-300 text-sm mt-1'>Click any location to view detailed facility profile</p>
							</div>
							
							{/* Hospital List/Map */}
							<div className='p-6 space-y-4'>
								{sortedHospitals.map((hospital) => {
									const typeInfo = getTypeIcon(hospital.type);
									const isSelected = selectedHospital === hospital.id;
									const isCedarsSinai = hospital.id === 'csmc';
									
									return (
										<div
											key={hospital.id}
											className={`group relative border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
												isCedarsSinai 
													? 'border-blue-200 bg-gradient-to-r from-blue-50 to-blue-25 ring-2 ring-blue-100 shadow-md'
													: isSelected 
														? 'border-slate-300 bg-slate-50 shadow-md'
														: 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm'
											}`}
											onClick={() => openHospitalProfile(hospital.id)}
											onMouseEnter={() => setSelectedHospital(hospital.id)}
											onMouseLeave={() => setSelectedHospital(null)}
										>
											{/* Header Row */}
											<div className='flex items-center justify-between mb-3'>
												<div className='flex items-center gap-3'>
													<div className={`p-2 rounded-lg ${
														isCedarsSinai ? 'bg-blue-100' : 'bg-slate-100'
													}`}>
														<FontAwesomeIcon 
															icon={typeInfo.icon} 
															className={`w-5 h-5 ${isCedarsSinai ? 'text-blue-600' : typeInfo.color}`} 
														/>
													</div>
													<div>
														<h3 className={`font-semibold ${isCedarsSinai ? 'text-blue-900' : 'text-slate-900'}`}>
															{hospital.name}
														</h3>
														<p className='text-sm text-slate-600 flex items-center gap-1'>
															<FontAwesomeIcon icon={faMapMarkerAlt} className='w-3 h-3' />
															{hospital.location}
														</p>
													</div>
												</div>
												<div className='flex items-center gap-2'>
													{isCedarsSinai && (
														<span className='bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full'>
															Primary Focus
														</span>
													)}
													<span className={`text-xs font-medium px-2 py-1 rounded-full border ${getStatusColor(hospital.status)}`}>
														{hospital.status.replace('-', ' ')}
													</span>
													<FontAwesomeIcon 
														icon={faChevronRight} 
														className='w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors' 
													/>
												</div>
											</div>

											{/* Metrics Grid */}
											<div className='grid grid-cols-4 gap-4'>
												<div className='text-center'>
													<FontAwesomeIcon icon={faHeart} className='w-4 h-4 text-red-400 mb-1' />
													<p className={`font-semibold ${isCedarsSinai ? 'text-blue-700' : 'text-slate-700'}`}>
														{hospital.annualData.cmrVolume}
													</p>
													<p className='text-xs text-slate-500'>CMR</p>
												</div>
												<div className='text-center'>
													<FontAwesomeIcon icon={faLungs} className='w-4 h-4 text-blue-400 mb-1' />
													<p className={`font-semibold ${isCedarsSinai ? 'text-blue-700' : 'text-slate-700'}`}>
														{hospital.annualData.chestMriVolume}
													</p>
													<p className='text-xs text-slate-500'>Chest MRI</p>
												</div>
												<div className='text-center'>
													<FontAwesomeIcon icon={faChartLine} className='w-4 h-4 text-emerald-500 mb-1' />
													<p className={`font-semibold ${isCedarsSinai ? 'text-blue-700' : 'text-slate-700'}`}>
														{hospital.annualData.marketShare}%
													</p>
													<p className='text-xs text-slate-500'>Market</p>
												</div>
												<div className='text-center'>
													<FontAwesomeIcon icon={faUsers} className='w-4 h-4 text-slate-500 mb-1' />
													<p className={`font-semibold ${isCedarsSinai ? 'text-blue-700' : 'text-slate-700'}`}>
														{hospital.keyMetrics.beds}
													</p>
													<p className='text-xs text-slate-500'>Beds</p>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>

					{/* Summary Panel - Right 1/3 */}
					<div className='lg:col-span-1'>
						<div className='bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-6'>
							<div className='bg-gradient-to-r from-slate-600 to-slate-700 text-white p-4'>
								<h3 className='text-lg font-semibold'>Regional Overview</h3>
								<p className='text-slate-300 text-sm mt-1'>Market analysis & insights</p>
							</div>

							{/* Regional Metrics */}
							<div className='p-4 space-y-4'>
								<div className='grid grid-cols-2 gap-4'>
									<div className='bg-blue-50 rounded-lg p-3 text-center border border-blue-100'>
										<p className='text-2xl font-bold text-blue-700'>
											{hospitalLocations.reduce((sum, h) => sum + h.annualData.cmrVolume, 0)}
										</p>
										<p className='text-xs text-blue-600 font-medium'>Total CMR</p>
									</div>
									<div className='bg-emerald-50 rounded-lg p-3 text-center border border-emerald-100'>
										<p className='text-2xl font-bold text-emerald-700'>
											{hospitalLocations.reduce((sum, h) => sum + h.annualData.chestMriVolume, 0)}
										</p>
										<p className='text-xs text-emerald-600 font-medium'>Chest MRI</p>
									</div>
								</div>

								<div className='bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-100'>
									<div className='text-center'>
										<p className='text-lg font-bold text-amber-800'>
											{formatCurrency(hospitalLocations.reduce((sum, h) => sum + h.annualData.revenue, 0))}
										</p>
										<p className='text-xs text-amber-700 font-medium'>Total Regional Revenue</p>
									</div>
								</div>

								<div className='border-t border-slate-200 pt-4'>
									<h4 className='font-medium text-slate-900 mb-3'>Market Leaders</h4>
									<div className='space-y-2'>
										{sortedHospitals.slice(0, 3).map((hospital, index) => {
											const isCedarsSinai = hospital.id === 'csmc';
											return (
												<div 
													key={hospital.id} 
													className={`flex items-center justify-between p-2 rounded ${
														isCedarsSinai ? 'bg-blue-50' : 'bg-slate-50'
													}`}
												>
													<div className='flex items-center gap-2'>
														<span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
															index === 0 ? 'bg-yellow-100 text-yellow-700' :
															index === 1 ? 'bg-slate-200 text-slate-700' :
															'bg-amber-100 text-amber-700'
														}`}>
															{index + 1}
														</span>
														<span className={`text-sm font-medium ${
															isCedarsSinai ? 'text-blue-800' : 'text-slate-800'
														}`}>
															{hospital.name.split(' ').slice(0, 2).join(' ')}
														</span>
													</div>
													<span className={`text-sm font-semibold ${
														isCedarsSinai ? 'text-blue-700' : 'text-slate-700'
													}`}>
														{hospital.annualData.marketShare}%
													</span>
												</div>
											);
										})}
									</div>
								</div>

								<div className='bg-blue-50 rounded-lg p-3 border border-blue-100'>
									<div className='text-center'>
										<FontAwesomeIcon icon={faStar} className='w-5 h-5 text-blue-600 mb-2' />
										<p className='text-sm font-medium text-blue-800'>Primary Analysis Focus</p>
										<p className='text-xs text-blue-600 mt-1'>Cedars-Sinai Medical Center</p>
										<button 
											onClick={() => openHospitalProfile('csmc')}
											className='mt-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1 rounded transition-colors'
										>
											View Dashboard
										</button>
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
