interface NavigationItem {
  label: string;
  href: string;
  active: boolean;
  hasDropdown?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
}

export function MobileMenu({ isOpen, onClose, navigationItems }: MobileMenuProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile menu panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Header with close button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 11H7v8h2v-8zm4 0h-2v8h2v-8zm4 0h-2v8h2v-8zm2.33-4.68l-1.19-1.19L15 7.27V4h-2v4.27l-1.84-1.84-.75.75-.75-.75L8.82 7.27V4H6.82l3.32 3.32L12 5.46l1.86 1.86L17.18 4h-2.36v3.27l2.14 2.14-1.19 1.19L18.5 8.86V11h2V9.27l1.33-1.33z"/>
                </svg>
              </div>
              <span className="text-lg font-semibold text-gray-900">Brand</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Search bar for mobile */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation items */}
          <nav className="space-y-2 mb-8">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  item.active 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{item.label}</span>
                {item.hasDropdown && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </a>
            ))}
          </nav>

          {/* User profile section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="space-y-2">
              <a
                href="/profile"
                onClick={onClose}
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Jon Emmett - Profile
              </a>
              <a
                href="/settings"
                onClick={onClose}
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Settings
              </a>
              <button
                onClick={onClose}
                className="block w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}