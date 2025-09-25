'use client';

import { useState, use } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowLeft,
	faHospital,
	faMapMarkerAlt,
	faPhone,
	faGlobe,
	faUsers,
	faBed,
	faHeart,
	faBuilding,
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { FixedHeader } from '@/components/FixedHeader';
import { 
	ReferringVolumeAnalytics, 
	CMRGrowthProjections, 
	StructuralHeartCapture, 
	OrganizationalChart,
	CedarsSinaiFacilityProfile,
	ExpansionOpportunities
} from '@/components/CedarsSinai';

// Hospital profile data (in a real app, this would come from an API)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hospitalProfiles: Record<string, any> = {
	'csmc': {
		id: 'csmc',
		name: 'Cedars-Sinai Medical Center',
		location: 'West Hollywood, CA',
		address: '8700 Beverly Blvd, Los Angeles, CA 90048',
		phone: '(310) 423-3277',
		website: 'cedars-sinai.org',
		type: 'Academic Medical Center',
		founded: 1902,
		beds: 886,
		cardiacBeds: 156,
		staff: '2,100+',
		healthSystem: 'Cedars-Sinai Health System',
		designation: 'Magnet',
		traumaLevel: 'Level I',
		keyPrograms: [
			'Smidt Heart Institute',
			'Transplant Center',
			'Cancer Center',
			'Neurosciences',
		],
		yearlyData: {
			2024: { cmrVolume: 145, chestMriVolume: 89, marketShare: 28.5, revenue: 12500000 },
			2025: { cmrVolume: 138, chestMriVolume: 85, marketShare: 27.1, revenue: 11900000 },
			2026: { cmrVolume: 165, chestMriVolume: 112, marketShare: 21.2, revenue: 15200000 },
			2027: { cmrVolume: 185, chestMriVolume: 135, marketShare: 24.1, revenue: 17800000 },
		},
	},
	'csmc-marina': {
		id: 'csmc-marina',
		name: 'Cedars-Sinai Marina del Rey Hospital',
		location: 'Marina del Rey, CA',
		address: '4650 Lincoln Blvd, Marina del Rey, CA 90292',
		phone: '(310) 823-8911',
		website: 'cedars-sinai.org/marina',
		type: 'Community Hospital',
		founded: 1969,
		beds: 145,
		cardiacBeds: 24,
		staff: '480+',
		healthSystem: 'Cedars-Sinai Health System',
		designation: 'Joint Commission Accredited',
		traumaLevel: 'Level III',
		keyPrograms: [
			'Emergency Services',
			'Cardiac Care',
			'Women\'s Health',
			'Orthopedics',
		],
		yearlyData: {
			2024: { cmrVolume: 34, chestMriVolume: 28, marketShare: 4.9, revenue: 2100000 },
			2025: { cmrVolume: 28, chestMriVolume: 22, marketShare: 4.0, revenue: 1750000 },
			2026: { cmrVolume: 45, chestMriVolume: 38, marketShare: 6.3, revenue: 2950000 },
			2027: { cmrVolume: 58, chestMriVolume: 48, marketShare: 8.0, revenue: 3800000 },
		},
	},
	'ucla-main': {
		id: 'ucla-main',
		name: 'UCLA Medical Center',
		location: 'Westwood, CA',
		address: '757 Westwood Plaza, Los Angeles, CA 90095',
		phone: '(310) 825-9111',
		website: 'uclahealth.org',
		type: 'Academic Medical Center',
		founded: 1955,
		beds: 466,
		cardiacBeds: 78,
		staff: '1,800+',
		healthSystem: 'UCLA Health System',
		designation: 'Magnet',
		traumaLevel: 'Level I',
		keyPrograms: [
			'UCLA Heart Center',
			'Jonsson Comprehensive Cancer Center',
			'Mattel Children\'s Hospital',
			'Brain Tumor Center',
		],
		yearlyData: {
			2024: { cmrVolume: 128, chestMriVolume: 156, marketShare: 22.4, revenue: 14200000 },
			2025: { cmrVolume: 142, chestMriVolume: 168, marketShare: 24.7, revenue: 15800000 },
			2026: { cmrVolume: 135, chestMriVolume: 158, marketShare: 22.4, revenue: 14900000 },
			2027: { cmrVolume: 128, chestMriVolume: 148, marketShare: 20.8, revenue: 14100000 },
		},
	},
	'ucla-santa-monica': {
		id: 'ucla-santa-monica',
		name: 'UCLA Santa Monica Medical Center',
		location: 'Santa Monica, CA',
		address: '1250 16th St, Santa Monica, CA 90404',
		phone: '(310) 319-4000',
		website: 'uclahealth.org/santa-monica',
		type: 'Community Hospital',
		founded: 1926,
		beds: 266,
		cardiacBeds: 42,
		staff: '950+',
		healthSystem: 'UCLA Health System',
		designation: 'Joint Commission Accredited',
		traumaLevel: 'Level II',
		keyPrograms: [
			'Emergency Services',
			'Cardiac Services',
			'Orthopedic Institute',
			'Women\'s Services',
		],
		yearlyData: {
			2024: { cmrVolume: 67, chestMriVolume: 84, marketShare: 11.9, revenue: 6800000 },
			2025: { cmrVolume: 78, chestMriVolume: 95, marketShare: 13.8, revenue: 7900000 },
			2026: { cmrVolume: 72, chestMriVolume: 89, marketShare: 12.3, revenue: 7300000 },
			2027: { cmrVolume: 65, chestMriVolume: 82, marketShare: 11.1, revenue: 6700000 },
		},
	},
	'providence-main': {
		id: 'providence-main',
		name: 'Providence Saint Joseph Medical Center',
		location: 'Burbank, CA',
		address: '501 S Buena Vista St, Burbank, CA 91505',
		phone: '(818) 843-5111',
		website: 'providence.org/locations/california/saint-joseph-medical-center-burbank',
		type: 'Community Hospital',
		founded: 1943,
		beds: 431,
		cardiacBeds: 64,
		staff: '1,200+',
		healthSystem: 'Providence Health System',
		designation: 'Joint Commission Accredited',
		traumaLevel: 'Level II',
		keyPrograms: [
			'Heart & Vascular Institute',
			'Cancer Center',
			'Neuroscience Institute',
			'Women & Children Services',
		],
		yearlyData: {
			2024: { cmrVolume: 78, chestMriVolume: 45, marketShare: 9.7, revenue: 4200000 },
			2025: { cmrVolume: 72, chestMriVolume: 41, marketShare: 9.0, revenue: 3850000 },
			2026: { cmrVolume: 68, chestMriVolume: 39, marketShare: 8.2, revenue: 3600000 },
			2027: { cmrVolume: 62, chestMriVolume: 35, marketShare: 7.3, revenue: 3300000 },
		},
	},
	'providence-tarzana': {
		id: 'providence-tarzana',
		name: 'Providence Tarzana Medical Center',
		location: 'Tarzana, CA',
		address: '18321 Clark St, Tarzana, CA 91356',
		phone: '(818) 881-0800',
		website: 'providence.org/locations/california/tarzana-medical-center',
		type: 'Community Hospital',
		founded: 1973,
		beds: 249,
		cardiacBeds: 36,
		staff: '780+',
		healthSystem: 'Providence Health System',
		designation: 'Joint Commission Accredited',
		traumaLevel: 'Level III',
		keyPrograms: [
			'Emergency Services',
			'Cardiac Services',
			'Surgical Services',
			'Rehabilitation Services',
		],
		yearlyData: {
			2024: { cmrVolume: 45, chestMriVolume: 38, marketShare: 6.5, revenue: 2800000 },
			2025: { cmrVolume: 38, chestMriVolume: 32, marketShare: 5.6, revenue: 2350000 },
			2026: { cmrVolume: 42, chestMriVolume: 35, marketShare: 5.9, revenue: 2600000 },
			2027: { cmrVolume: 38, chestMriVolume: 31, marketShare: 5.2, revenue: 2350000 },
		},
	},
};

interface HospitalProfilePageProps {
	params: Promise<{
		id: string;
	}>;
}

export default function HospitalProfilePage({ params }: HospitalProfilePageProps) {
	const [selectedYear, setSelectedYear] = useState<number>(2025);
	const availableYears = [2024, 2025, 2026, 2027];
	const router = useRouter();
	
	const { id } = use(params);
	const hospital = hospitalProfiles[id];
	
	if (!hospital) {
		return (
			<div className="min-h-screen bg-slate-50 flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-semibold text-slate-900 mb-2">Hospital Not Found</h1>
					<p className="text-slate-600 mb-4">The requested hospital profile could not be found.</p>
					<button
						onClick={() => router.back()}
						className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg transition-colors"
					>
						Go Back
					</button>
				</div>
			</div>
		);
	}


	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
			<FixedHeader 
				title={`${hospital.name} - Profile`}
				subtitle="Detailed hospital profile and analytics"
				selectedYear={selectedYear}
				availableYears={availableYears}
				onYearChange={setSelectedYear}
			/>

			<div className="pt-40 max-w-7xl mx-auto p-6">

				<main className="flex flex-col lg:flex-row gap-6">
					{/* LEFT COLUMN - Main Content Area - 2/3 width */}
					<div className="flex-1 flex flex-col lg:w-2/3 space-y-6">
						<CMRGrowthProjections selectedYear={selectedYear} hospitalName={hospital.name} />
						<ReferringVolumeAnalytics selectedYear={selectedYear} hospitalName={hospital.name} />
						<StructuralHeartCapture selectedYear={selectedYear} hospitalName={hospital.name} />
						<ExpansionOpportunities selectedYear={selectedYear} currentHospitalId={id} currentHealthSystem={hospital.healthSystem} />
					</div>

					{/* RIGHT COLUMN - Sidebar - 1/3 width */}
					<div className="flex flex-col lg:w-1/3 space-y-6">
						<OrganizationalChart hospitalName={hospital.name} />
						<CedarsSinaiFacilityProfile selectedYear={selectedYear} />
						
						{/* Hospital Info Card */}
						<div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
							{/* Header */}
							<div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-6">
								<div className="flex items-center gap-4">
									<div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
										<FontAwesomeIcon icon={faHospital} className="w-6 h-6" />
									</div>
									<div>
										<h1 className="text-xl font-bold">{hospital.name}</h1>
										<div className="flex items-center text-slate-300 text-sm mt-1">
											<FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3 mr-1" />
											<span>{hospital.location}</span>
										</div>
									</div>
								</div>
							</div>

							{/* Quick Stats */}
							<div className="p-4 bg-slate-50 border-b border-slate-100">
								<div className="grid grid-cols-2 gap-3">
									<div className="text-center p-3 bg-white rounded-lg border border-slate-100">
										<FontAwesomeIcon icon={faBed} className="w-4 h-4 text-slate-500 mb-1" />
										<div className="text-lg font-semibold text-slate-800">{hospital.beds}</div>
										<div className="text-xs text-slate-500">Total Beds</div>
									</div>
									<div className="text-center p-3 bg-white rounded-lg border border-slate-100">
										<FontAwesomeIcon icon={faHeart} className="w-4 h-4 text-slate-400 mb-1" />
										<div className="text-lg font-semibold text-slate-800">{hospital.cardiacBeds}</div>
										<div className="text-xs text-slate-500">Cardiac Beds</div>
									</div>
								</div>
							</div>

							{/* Details */}
							<div className="p-4 space-y-4">
								<div>
									<h3 className="font-medium text-slate-800 mb-3 text-sm">Facility Details</h3>
									<div className="space-y-2 text-sm">
										<div className="flex justify-between">
											<span className="text-slate-500">Type:</span>
											<span className="font-medium text-slate-800">{hospital.type}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-slate-500">Founded:</span>
											<span className="font-medium text-slate-800">{hospital.founded}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-slate-500">Designation:</span>
											<span className="font-medium text-slate-800">{hospital.designation}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-slate-500">Trauma Level:</span>
											<span className="font-medium text-slate-800">{hospital.traumaLevel}</span>
										</div>
									</div>
								</div>

								<div>
									<h3 className="font-medium text-slate-800 mb-3 text-sm">Health System</h3>
									<div className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
										<FontAwesomeIcon icon={faBuilding} className="w-4 h-4 text-slate-500 mr-2" />
										<span className="text-sm font-medium text-slate-800">{hospital.healthSystem}</span>
									</div>
								</div>

								<div>
									<h3 className="font-medium text-slate-800 mb-3 text-sm">Key Programs</h3>
									<div className="space-y-1">
										{hospital.keyPrograms.map((program: string, index: number) => (
											<div key={index} className="flex items-center text-sm text-slate-600">
												<div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2"></div>
												<span>{program}</span>
											</div>
										))}
									</div>
								</div>

								<div>
									<h3 className="font-medium text-slate-800 mb-3 text-sm">Contact Information</h3>
									<div className="space-y-2 text-sm">
										<div className="flex items-center text-slate-600">
											<FontAwesomeIcon icon={faPhone} className="w-3 h-3 mr-2" />
											<span>{hospital.phone}</span>
										</div>
										<div className="flex items-center text-slate-600">
											<FontAwesomeIcon icon={faGlobe} className="w-3 h-3 mr-2" />
											<span className="text-slate-700">{hospital.website}</span>
										</div>
										<div className="flex items-start text-slate-600">
											<FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3 mr-2 mt-0.5" />
											<span className="text-xs leading-relaxed">{hospital.address}</span>
										</div>
									</div>
								</div>

								<div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
									<div className="flex items-center justify-between text-sm">
										<div className="flex items-center">
											<FontAwesomeIcon icon={faUsers} className="w-4 h-4 text-slate-500 mr-2" />
											<span className="text-slate-600">Medical Staff:</span>
										</div>
										<span className="font-semibold text-slate-800">{hospital.staff}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}