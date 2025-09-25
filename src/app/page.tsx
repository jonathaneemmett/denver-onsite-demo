'use client';

import {
	CedarsSinaiFacilityProfile,
	ReferringVolumeAnalytics,
	CMRGrowthProjections,
	StructuralHeartCapture,
	ExpansionOpportunities,
	OrganizationalChart,
} from '@/components/CedarsSinai';
import { FixedHeader } from '@/components/FixedHeader';
import { useState } from 'react';

export default function Home() {
	const [selectedYear, setSelectedYear] = useState<number>(2025);
	const availableYears = [2024, 2025, 2026, 2027];
	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
			<FixedHeader
				title='Cedars-Sinai Medical Center - Cardiac Imaging Profile'
				subtitle='Comprehensive facility overview and cardiac services analysis'
				selectedYear={selectedYear}
				availableYears={availableYears}
				onYearChange={setSelectedYear}
			/>

			{/* Main Content with top padding to account for fixed header */}
			<div className='pt-40 max-w-7xl mx-auto p-6'>
				<main className='flex flex-col lg:flex-row gap-6'>
					{/* LEFT COLUMN - Main Content Area - 2/3 width */}
					<div className='flex-1 flex flex-col lg:w-2/3 space-y-6'>
						<CMRGrowthProjections selectedYear={selectedYear} />
						<ReferringVolumeAnalytics selectedYear={selectedYear} />
						<StructuralHeartCapture selectedYear={selectedYear} />
						<ExpansionOpportunities selectedYear={selectedYear} />
					</div>

					{/* RIGHT COLUMN - Sidebar - 1/3 width */}
					<div className='flex flex-col lg:w-1/3 space-y-6'>
						<OrganizationalChart />
						<CedarsSinaiFacilityProfile
							selectedYear={selectedYear}
						/>
					</div>
				</main>
			</div>
		</div>
	);
}
