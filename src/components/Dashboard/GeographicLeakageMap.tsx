'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faHospital, 
  faArrowRight,
  faChartLine,
  faUsers,
  faDollarSign
} from '@fortawesome/free-solid-svg-icons';

interface GeographicLocation {
	region: string;
	lat: number;
	lng: number;
	facilities: number;
	echoVolume: number;
	cmrVolume: number;
	leakageScore: number;
	patientTransfers: number;
	nearestCmrCenter: string;
	distanceToCenter: number;
	opportunityValue: string;
}

const geographicData: GeographicLocation[] = [
	{
		region: 'Metropolitan Area',
		lat: 40.7128,
		lng: -74.006,
		facilities: 12,
		echoVolume: 1250,
		cmrVolume: 45,
		leakageScore: 88,
		patientTransfers: 234,
		nearestCmrCenter: 'NYC Academic Medical Center',
		distanceToCenter: 0,
		opportunityValue: '$18.2M',
	},
	{
		region: 'Northern Suburbs',
		lat: 40.8176,
		lng: -73.9482,
		facilities: 8,
		echoVolume: 680,
		cmrVolume: 12,
		leakageScore: 92,
		patientTransfers: 156,
		nearestCmrCenter: 'NYC Academic Medical Center',
		distanceToCenter: 15,
		opportunityValue: '$12.4M',
	},
	{
		region: 'Western Districts',
		lat: 40.6892,
		lng: -74.0445,
		facilities: 6,
		echoVolume: 420,
		cmrVolume: 8,
		leakageScore: 85,
		patientTransfers: 98,
		nearestCmrCenter: 'Regional Heart Institute',
		distanceToCenter: 25,
		opportunityValue: '$8.7M',
	},
	{
		region: 'Eastern Corridor',
		lat: 40.7505,
		lng: -73.8067,
		facilities: 9,
		echoVolume: 890,
		cmrVolume: 18,
		leakageScore: 90,
		patientTransfers: 187,
		nearestCmrCenter: 'University Medical Center',
		distanceToCenter: 20,
		opportunityValue: '$14.6M',
	},
	{
		region: 'Southern Zone',
		lat: 40.6501,
		lng: -73.9496,
		facilities: 5,
		echoVolume: 340,
		cmrVolume: 5,
		leakageScore: 95,
		patientTransfers: 142,
		nearestCmrCenter: 'Metro Cardiac Center',
		distanceToCenter: 30,
		opportunityValue: '$11.2M',
	},
];

export function GeographicLeakageMap() {
	const getLeakageColor = (score: number) => {
		if (score >= 90) return 'bg-red-100 text-red-800 border border-red-200';
		if (score >= 85) return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
		return 'bg-blue-100 text-blue-800 border border-blue-200';
	};

	return (
		<div className='bg-white rounded-lg shadow-lg'>
			<div className='px-6 py-4 bg-gray-50 border-b rounded-t-lg'>
				<div className='flex flex-col gap-1'>
					<h2 className='text-xl font-semibold text-gray-800'>
						CMR Opportunity Leakage Map
					</h2>
					<p className='text-sm text-gray-600'>
						Geographic analysis of CMR underutilization and patient transfer patterns
					</p>
				</div>
			</div>

			<div className='p-6'>
				<div className='flex flex-col gap-6'>
					{/* Visual Map Representation */}
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
						<div className='lg:col-span-2'>
							<div className='bg-gradient-to-br from-blue-50 to-gray-100 rounded-lg border border-gray-200 p-6 min-h-96'>
								<div className='relative'>
									{/* Title */}
									<div className='text-center mb-8'>
										<h3 className='text-lg font-semibold text-gray-800 mb-2'>Regional Leakage Intensity</h3>
										<p className='text-sm text-gray-600'>Hover over regions for details</p>
									</div>

									{/* Grid Layout for Regions */}
									<div className='grid grid-cols-3 gap-4 h-64'>
										{/* Metropolitan Area - Center Top */}
										<div className='col-start-2 row-start-1 relative group cursor-pointer transition-all duration-300 hover:scale-105'>
											<div className='w-16 h-16 bg-red-500 rounded-full mx-auto flex items-center justify-center shadow-lg relative'>
												<FontAwesomeIcon icon={faMapMarkerAlt} className='text-white text-lg' />
												<div className='absolute -top-2 -right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-800 shadow-md'>
													88
												</div>
												<div className='absolute top-0 right-0 transform translate-x-4 -translate-y-2'>
													<FontAwesomeIcon icon={faArrowRight} className='text-red-500 text-sm animate-pulse' />
													<span className='absolute -top-4 left-4 text-xs font-semibold text-red-600 bg-white px-1 rounded'>
														234
													</span>
												</div>
											</div>
											<div className='text-center mt-2'>
												<div className='text-xs font-medium text-gray-800'>Metropolitan Area</div>
												<div className='text-xs px-2 py-1 rounded-full mt-1 bg-yellow-100 text-yellow-800 border border-yellow-200'>
													High Risk
												</div>
											</div>
											{/* Hover Tooltip */}
											<div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10'>
												<div className='bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg min-w-48'>
													<div className='font-semibold mb-2'>Metropolitan Area</div>
													<div className='space-y-1'>
														<div className='flex justify-between'><span>ECHO Volume:</span><span className='font-medium'>1250</span></div>
														<div className='flex justify-between'><span>CMR Volume:</span><span className='font-medium'>45</span></div>
														<div className='flex justify-between'><span>Transfers:</span><span className='font-medium text-red-400'>234</span></div>
														<div className='flex justify-between'><span>Distance:</span><span className='font-medium'>0mi</span></div>
													</div>
												</div>
											</div>
										</div>

										{/* Northern Suburbs - Center Middle */}
										<div className='col-start-2 row-start-2 relative group cursor-pointer transition-all duration-300 hover:scale-105'>
											<div className='w-12 h-12 bg-red-500 rounded-full mx-auto flex items-center justify-center shadow-lg relative'>
												<FontAwesomeIcon icon={faMapMarkerAlt} className='text-white text-lg' />
												<div className='absolute -top-2 -right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-800 shadow-md'>
													92
												</div>
												<div className='absolute top-0 right-0 transform translate-x-4 -translate-y-2'>
													<FontAwesomeIcon icon={faArrowRight} className='text-red-500 text-sm animate-pulse' />
													<span className='absolute -top-4 left-4 text-xs font-semibold text-red-600 bg-white px-1 rounded'>
														156
													</span>
												</div>
											</div>
											<div className='text-center mt-2'>
												<div className='text-xs font-medium text-gray-800'>Northern Suburbs</div>
												<div className='text-xs px-2 py-1 rounded-full mt-1 bg-red-100 text-red-800 border border-red-200'>
													Critical Risk
												</div>
											</div>
											{/* Hover Tooltip */}
											<div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10'>
												<div className='bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg min-w-48'>
													<div className='font-semibold mb-2'>Northern Suburbs</div>
													<div className='space-y-1'>
														<div className='flex justify-between'><span>ECHO Volume:</span><span className='font-medium'>680</span></div>
														<div className='flex justify-between'><span>CMR Volume:</span><span className='font-medium'>12</span></div>
														<div className='flex justify-between'><span>Transfers:</span><span className='font-medium text-red-400'>156</span></div>
														<div className='flex justify-between'><span>Distance:</span><span className='font-medium'>15mi</span></div>
													</div>
												</div>
											</div>
										</div>

										{/* Western Districts - Left Middle */}
										<div className='col-start-1 row-start-2 relative group cursor-pointer transition-all duration-300 hover:scale-105'>
											<div className='w-8 h-8 bg-yellow-500 rounded-full mx-auto flex items-center justify-center shadow-lg relative'>
												<FontAwesomeIcon icon={faMapMarkerAlt} className='text-white text-lg' />
												<div className='absolute -top-2 -right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-800 shadow-md'>
													85
												</div>
											</div>
											<div className='text-center mt-2'>
												<div className='text-xs font-medium text-gray-800'>Western Districts</div>
												<div className='text-xs px-2 py-1 rounded-full mt-1 bg-yellow-100 text-yellow-800 border border-yellow-200'>
													High Risk
												</div>
											</div>
											{/* Hover Tooltip */}
											<div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10'>
												<div className='bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg min-w-48'>
													<div className='font-semibold mb-2'>Western Districts</div>
													<div className='space-y-1'>
														<div className='flex justify-between'><span>ECHO Volume:</span><span className='font-medium'>420</span></div>
														<div className='flex justify-between'><span>CMR Volume:</span><span className='font-medium'>8</span></div>
														<div className='flex justify-between'><span>Transfers:</span><span className='font-medium text-red-400'>98</span></div>
														<div className='flex justify-between'><span>Distance:</span><span className='font-medium'>25mi</span></div>
													</div>
												</div>
											</div>
										</div>

										{/* Eastern Corridor - Right Middle */}
										<div className='col-start-3 row-start-2 relative group cursor-pointer transition-all duration-300 hover:scale-105'>
											<div className='w-12 h-12 bg-red-500 rounded-full mx-auto flex items-center justify-center shadow-lg relative'>
												<FontAwesomeIcon icon={faMapMarkerAlt} className='text-white text-lg' />
												<div className='absolute -top-2 -right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-800 shadow-md'>
													90
												</div>
												<div className='absolute top-0 right-0 transform translate-x-4 -translate-y-2'>
													<FontAwesomeIcon icon={faArrowRight} className='text-red-500 text-sm animate-pulse' />
													<span className='absolute -top-4 left-4 text-xs font-semibold text-red-600 bg-white px-1 rounded'>
														187
													</span>
												</div>
											</div>
											<div className='text-center mt-2'>
												<div className='text-xs font-medium text-gray-800'>Eastern Corridor</div>
												<div className='text-xs px-2 py-1 rounded-full mt-1 bg-red-100 text-red-800 border border-red-200'>
													Critical Risk
												</div>
											</div>
											{/* Hover Tooltip */}
											<div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10'>
												<div className='bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg min-w-48'>
													<div className='font-semibold mb-2'>Eastern Corridor</div>
													<div className='space-y-1'>
														<div className='flex justify-between'><span>ECHO Volume:</span><span className='font-medium'>890</span></div>
														<div className='flex justify-between'><span>CMR Volume:</span><span className='font-medium'>18</span></div>
														<div className='flex justify-between'><span>Transfers:</span><span className='font-medium text-red-400'>187</span></div>
														<div className='flex justify-between'><span>Distance:</span><span className='font-medium'>20mi</span></div>
													</div>
												</div>
											</div>
										</div>

										{/* Southern Zone - Center Bottom */}
										<div className='col-start-2 row-start-3 relative group cursor-pointer transition-all duration-300 hover:scale-105'>
											<div className='w-8 h-8 bg-red-500 rounded-full mx-auto flex items-center justify-center shadow-lg relative'>
												<FontAwesomeIcon icon={faMapMarkerAlt} className='text-white text-lg' />
												<div className='absolute -top-2 -right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-800 shadow-md'>
													95
												</div>
												<div className='absolute top-0 right-0 transform translate-x-4 -translate-y-2'>
													<FontAwesomeIcon icon={faArrowRight} className='text-red-500 text-sm animate-pulse' />
													<span className='absolute -top-4 left-4 text-xs font-semibold text-red-600 bg-white px-1 rounded'>
														142
													</span>
												</div>
											</div>
											<div className='text-center mt-2'>
												<div className='text-xs font-medium text-gray-800'>Southern Zone</div>
												<div className='text-xs px-2 py-1 rounded-full mt-1 bg-red-100 text-red-800 border border-red-200'>
													Critical Risk
												</div>
											</div>
											{/* Hover Tooltip */}
											<div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10'>
												<div className='bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg min-w-48'>
													<div className='font-semibold mb-2'>Southern Zone</div>
													<div className='space-y-1'>
														<div className='flex justify-between'><span>ECHO Volume:</span><span className='font-medium'>340</span></div>
														<div className='flex justify-between'><span>CMR Volume:</span><span className='font-medium'>5</span></div>
														<div className='flex justify-between'><span>Transfers:</span><span className='font-medium text-red-400'>142</span></div>
														<div className='flex justify-between'><span>Distance:</span><span className='font-medium'>30mi</span></div>
													</div>
												</div>
											</div>
										</div>
									</div>

									{/* Legend */}
									<div className='mt-8 bg-white rounded-lg border border-gray-200 p-4'>
										<h4 className='font-semibold text-gray-800 mb-3'>Legend</h4>
										<div className='grid grid-cols-2 gap-4'>
											<div className='space-y-2'>
												<div className='flex items-center gap-2'>
													<div className='w-4 h-4 bg-red-500 rounded-full'></div>
													<span className='text-xs text-gray-600'>Critical Risk (≥90% leakage)</span>
												</div>
												<div className='flex items-center gap-2'>
													<div className='w-4 h-4 bg-yellow-500 rounded-full'></div>
													<span className='text-xs text-gray-600'>High Risk (85-89% leakage)</span>
												</div>
												<div className='flex items-center gap-2'>
													<div className='w-4 h-4 bg-blue-500 rounded-full'></div>
													<span className='text-xs text-gray-600'>Moderate Risk (&lt;85% leakage)</span>
												</div>
											</div>
											<div className='space-y-2'>
												<div className='flex items-center gap-2'>
													<FontAwesomeIcon icon={faArrowRight} className='text-red-500 text-sm' />
													<span className='text-xs text-gray-600'>Patient transfers (animated)</span>
												</div>
												<div className='flex items-center gap-2'>
													<div className='w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center'>
														<span className='text-xs font-bold'>95</span>
													</div>
													<span className='text-xs text-gray-600'>Leakage percentage</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Regional Analysis Panel */}
						<div className='flex flex-col gap-4'>
							<div>
								<div className='flex flex-col gap-2'>
									<h3 className='text-lg font-semibold text-gray-800'>
										Regional Analysis
									</h3>
									<p className='text-sm text-gray-600'>
										Ranked by leakage severity
									</p>
								</div>
							</div>

							<div className='flex flex-col gap-3 max-h-96 overflow-y-auto'>
								{geographicData
									.sort((a, b) => b.leakageScore - a.leakageScore)
									.map((location, index) => (
										<div
											key={index}
											className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'
										>
											<div className='flex flex-col gap-3'>
												<div className='flex justify-between items-start'>
													<div className='flex items-center gap-2'>
														<FontAwesomeIcon icon={faMapMarkerAlt} className='text-gray-500' />
														<h4 className='font-semibold text-gray-800'>
															{location.region}
														</h4>
													</div>
													<span
														className={`px-3 py-1 text-xs font-bold rounded-full ${getLeakageColor(
															location.leakageScore,
														)}`}
													>
														{location.leakageScore}% Leakage
													</span>
												</div>

												<div className='grid grid-cols-2 gap-3 text-sm'>
													<div className='flex justify-between'>
														<span className='text-gray-600 flex items-center gap-1'>
															<FontAwesomeIcon icon={faChartLine} className='w-3 h-3' />
															ECHO:
														</span>
														<span className='font-semibold text-blue-600'>
															{location.echoVolume}
														</span>
													</div>
													<div className='flex justify-between'>
														<span className='text-gray-600 flex items-center gap-1'>
															<FontAwesomeIcon icon={faHospital} className='w-3 h-3' />
															CMR:
														</span>
														<span className='font-semibold text-green-600'>
															{location.cmrVolume}
														</span>
													</div>
													<div className='flex justify-between'>
														<span className='text-gray-600 flex items-center gap-1'>
															<FontAwesomeIcon icon={faUsers} className='w-3 h-3' />
															Transfers:
														</span>
														<span className='font-semibold text-red-600'>
															{location.patientTransfers}
														</span>
													</div>
													<div className='flex justify-between'>
														<span className='text-gray-600 flex items-center gap-1'>
															<FontAwesomeIcon icon={faMapMarkerAlt} className='w-3 h-3' />
															Distance:
														</span>
														<span className='font-semibold text-gray-800'>
															{location.distanceToCenter}mi
														</span>
													</div>
												</div>

												<div className='border-t pt-2'>
													<div className='flex justify-between items-center'>
														<span className='text-sm font-semibold text-green-700 flex items-center gap-1'>
															<FontAwesomeIcon icon={faDollarSign} className='w-3 h-3' />
															{location.opportunityValue}
														</span>
														<span className='text-xs text-gray-500'>
															Revenue opportunity
														</span>
													</div>
												</div>

												{/* Facilities Count */}
												<div className='flex items-center gap-2 text-xs text-gray-600 border-t pt-2'>
													<FontAwesomeIcon icon={faHospital} />
													<span>{location.facilities} facilities in region</span>
													<span className='ml-auto'>
														Nearest: {location.nearestCmrCenter}
													</span>
												</div>
											</div>
										</div>
									))}
							</div>
						</div>
					</div>

					{/* Summary Statistics */}
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border'>
						<div className='text-center'>
							<div className='text-lg font-bold text-red-600'>
								{geographicData.filter(l => l.leakageScore >= 90).length}
							</div>
							<div className='text-xs text-gray-500'>Critical Risk Regions</div>
						</div>
						<div className='text-center'>
							<div className='text-lg font-bold text-blue-600'>
								{geographicData.reduce((sum, l) => sum + l.patientTransfers, 0).toLocaleString()}
							</div>
							<div className='text-xs text-gray-500'>Total Transfers/Month</div>
						</div>
						<div className='text-center'>
							<div className='text-lg font-bold text-green-600'>
								$65.1M
							</div>
							<div className='text-xs text-gray-500'>Total Opportunity</div>
						</div>
						<div className='text-center'>
							<div className='text-lg font-bold text-gray-800'>
								{Math.round(geographicData.reduce((sum, l) => sum + l.leakageScore, 0) / geographicData.length)}%
							</div>
							<div className='text-xs text-gray-500'>Avg Leakage Score</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}