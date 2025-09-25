'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHospital,
	faMapMarkerAlt,
	faPhone,
	faGlobe,
	faStar,
	faUsers,
	faBed,
	faAward,
	faStethoscope,
	faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';

interface FacilityProfileProps {
	selectedYear: number;
}

export function CedarsSinaiFacilityProfile({ selectedYear }: FacilityProfileProps) {
	return (
		<div className='bg-white rounded-lg shadow-lg overflow-hidden'>
					{/* Hospital Header */}
					<div className='bg-gradient-to-r from-neutral-700 to-neutral-800 text-white p-4'>
						<div className='flex items-center gap-3'>
							<div className='w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0'>
								<FontAwesomeIcon
									icon={faHospital}
									className='w-6 h-6'
								/>
							</div>
							<div className='min-w-0 flex-1'>
								<h2 className='text-lg font-bold truncate'>
									Cedars-Sinai Medical Center
								</h2>
								<div className='flex items-center gap-1 text-neutral-600 text-sm mt-1'>
									<FontAwesomeIcon
										icon={faMapMarkerAlt}
										className='w-3 h-3'
									/>
									<span className='truncate'>
										West Hollywood, CA
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Quick Stats */}
					<div className='p-4 bg-neutral-50 border-b'>
						<div className='grid grid-cols-2 gap-3'>
							<div className='text-center p-3 bg-neutral-100 rounded-lg'>
								<FontAwesomeIcon
									icon={faBed}
									className='w-4 h-4 text-neutral-600 mb-1'
								/>
								<div className='text-lg font-bold text-neutral-800'>
									886
								</div>
								<div className='text-xs text-neutral-600'>
									Total Beds
								</div>
							</div>
							<div className='text-center p-3 bg-neutral-100 rounded-lg'>
								<FontAwesomeIcon
									icon={faStethoscope}
									className='w-4 h-4 text-neutral-600 mb-1'
								/>
								<div className='text-lg font-bold text-neutral-800'>
									156
								</div>
								<div className='text-xs text-neutral-600'>
									Cardiac Beds
								</div>
							</div>
						</div>
					</div>

					{/* Facility Details */}
					<div className='p-4 space-y-4'>
						<div>
							<h3 className='font-semibold text-neutral-800 mb-3 flex items-center gap-2'>
								<FontAwesomeIcon
									icon={faHospital}
									className='w-4 h-4 text-neutral-600'
								/>
								Facility Details
							</h3>
							<div className='space-y-2 text-sm'>
								<div className='flex justify-between'>
									<span className='text-neutral-600'>
										Type:
									</span>
									<span className='font-medium'>
										Academic Medical Center
									</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-neutral-600'>
										Founded:
									</span>
									<span className='font-medium'>1902</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-neutral-600'>
										Designation:
									</span>
									<span className='font-medium flex items-center gap-1'>
										<FontAwesomeIcon
											icon={faStar}
											className='w-3 h-3 text-yellow-500'
										/>
										Magnet
									</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-neutral-600'>
										Trauma Level:
									</span>
									<span className='font-medium'>Level I</span>
								</div>
							</div>
						</div>

						{/* Key Programs */}
						<div>
							<h3 className='font-semibold text-neutral-800 mb-3 flex items-center gap-2'>
								<FontAwesomeIcon
									icon={faAward}
									className='w-4 h-4 text-neutral-600'
								/>
								Key Programs
							</h3>
							<div className='space-y-2 text-sm text-neutral-600'>
								<div className='flex items-center gap-2'>
									<div className='w-2 h-2 bg-neutral-400 rounded-full'></div>
									<span>Smidt Heart Institute</span>
								</div>
								<div className='flex items-center gap-2'>
									<div className='w-2 h-2 bg-neutral-500 rounded-full'></div>
									<span>Transplant Center</span>
								</div>
								<div className='flex items-center gap-2'>
									<div className='w-2 h-2 bg-neutral-400 rounded-full'></div>
									<span>Cancer Center</span>
								</div>
								<div className='flex items-center gap-2'>
									<div className='w-2 h-2 bg-neutral-500 rounded-full'></div>
									<span>Neurosciences</span>
								</div>
							</div>
						</div>

						{/* Recognition */}
						<div className='p-3 bg-neutral-100 rounded-lg'>
							<div className='text-xs text-neutral-600 font-medium mb-1'>
								Recognition
							</div>
							<div className='text-sm text-neutral-800 font-semibold'>
								U.S. News Best Hospital
							</div>
							<div className='text-xs text-neutral-600'>
								Cardiology & Heart Surgery
							</div>
						</div>

						{/* Contact Info */}
						<div>
							<h3 className='font-semibold text-neutral-800 mb-3 flex items-center gap-2'>
								<FontAwesomeIcon
									icon={faPhone}
									className='w-4 h-4 text-neutral-600'
								/>
								Contact
							</h3>
							<div className='space-y-2 text-sm text-neutral-400'>
								<div className='flex items-center gap-2'>
									<FontAwesomeIcon
										icon={faPhone}
										className='w-3 h-3 text-neutral-400'
									/>
									<span>(310) 423-3277</span>
								</div>
								<div className='flex items-center gap-2 text-neutral-400'>
									<FontAwesomeIcon
										icon={faGlobe}
										className='w-3 h-3 text-neutral-400'
									/>
									<span className='text-neutral-700'>
										cedars-sinai.org
									</span>
								</div>
								<div className='flex items-start gap-2 text-neutral-400'>
									<FontAwesomeIcon
										icon={faMapMarkerAlt}
										className='w-3 h-3 text-neutral-400 mt-0.5'
									/>
									<span className='text-xs leading-relaxed'>
										8700 Beverly Blvd
										<br />
										Los Angeles, CA 90048
									</span>
								</div>
							</div>
						</div>

						{/* Academic Affiliation */}
						<div className='pt-3 border-t border-neutral-200'>
							<div className='flex items-center gap-2 text-sm'>
								<FontAwesomeIcon
									icon={faGraduationCap}
									className='w-4 h-4 text-neutral-600'
								/>
								<span className='text-neutral-600'>
									Academic Partner:
								</span>
								<span className='font-medium text-neutral-800'>
									UCLA
								</span>
							</div>
						</div>

						{/* Staff Count */}
						<div className='bg-neutral-50 rounded-lg p-3'>
							<div className='flex items-center justify-between text-sm'>
								<div className='flex items-center gap-2'>
									<FontAwesomeIcon
										icon={faUsers}
										className='w-4 h-4 text-neutral-600'
									/>
									<span className='text-neutral-600'>
										Medical Staff:
									</span>
								</div>
								<span className='font-bold text-neutral-800'>
									2,100+
								</span>
							</div>
						</div>
					</div>
		</div>
	);
}
