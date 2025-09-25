'use client';

import { useState } from 'react';
import { HamburgerButton } from './HamburgerButton';
import { MobileMenu } from './MobileMenu';
import { SearchBar } from './SearchBar';
import { UserProfile } from './UserProfile';

const navigationItems = [
  { label: 'Home', href: '/', active: true },
  { label: 'Discovery', href: '/discovery', active: false },
  { label: 'Activity', href: '/activity', active: false },
  { label: 'Lists', href: '/lists', active: false },
  { label: 'Analytics', href: '/analytics', active: false, hasDropdown: true },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                  </svg>
                </div>
                <span className="text-lg font-semibold text-gray-900">MedScout</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
              {navigationItems.map((item) => (
                <div key={item.href} className="relative">
                  <a
                    href={item.href}
                    className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                      item.active 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <svg className="ml-1 w-3 h-3 inline opacity-60" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </a>
                </div>
              ))}
            </div>

            {/* Right side - Search and Profile */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:block">
                <SearchBar />
              </div>
              <UserProfile />
              
              {/* Mobile menu button */}
              <div className="lg:hidden">
                <HamburgerButton
                  isOpen={isMobileMenuOpen}
                  onClick={toggleMobileMenu}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigationItems={navigationItems}
      />
    </>
  );
}