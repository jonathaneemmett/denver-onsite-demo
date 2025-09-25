'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';

interface FixedHeaderProps {
	title: string;
	subtitle: string;
	selectedYear: number;
	availableYears: number[];
	onYearChange: (year: number) => void;
}

export function FixedHeader({ title, subtitle, selectedYear, availableYears, onYearChange }: FixedHeaderProps) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleYearSelect = (year: number) => {
		onYearChange(year);
		setIsDropdownOpen(false);
	};

	return (
		<header className='fixed top-14 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm'>
			<div className='max-w-7xl mx-auto p-4'>
				<div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
					<div className='text-center sm:text-left'>
						<h1 className='text-2xl font-bold text-gray-900'>
							{title}
						</h1>
						<p className='text-gray-600'>
							{subtitle}
						</p>
					</div>
					<div className='flex items-center space-x-3 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200'>
						<FontAwesomeIcon
							icon={faCalendarAlt}
							className='w-5 h-5 text-gray-500'
						/>
						<span className='text-sm font-medium text-gray-700'>
							Analysis Year:
						</span>
						
						{/* Custom Dropdown */}
						<div className='relative' ref={dropdownRef}>
							<button
								onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								className='flex items-center justify-between bg-white border border-gray-300 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-500 min-w-[100px] transition-colors'
							>
								<span>{selectedYear}</span>
								<FontAwesomeIcon
									icon={faChevronDown}
									className={`w-3 h-3 text-gray-400 ml-2 transition-transform duration-200 ${
										isDropdownOpen ? 'rotate-180' : ''
									}`}
								/>
							</button>
							
							{isDropdownOpen && (
								<div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden'>
									{availableYears.map((year) => (
										<button
											key={year}
											onClick={() => handleYearSelect(year)}
											className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${
												year === selectedYear ? 'bg-slate-50 text-slate-700' : 'text-gray-700'
											}`}
										>
											<span>{year}</span>
											{year === selectedYear && (
												<FontAwesomeIcon
													icon={faCheck}
													className='w-3 h-3 text-slate-600'
												/>
											)}
										</button>
									))}
								</div>
							)}
						</div>
						
						{selectedYear >= 2026 && (
							<span className='bg-slate-100 text-slate-800 text-xs font-medium px-2 py-1 rounded-full'>
								Projected Data
							</span>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}