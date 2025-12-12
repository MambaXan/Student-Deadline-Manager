import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';

interface TopBarProps {
  userName: string;
  onMenuClick?: () => void;
}

export function TopBar({ userName, onMenuClick }: TopBarProps) {
  return (
    <div className="h-16 lg:h-20 bg-white border-b border-gray-200 px-4 lg:px-8 flex items-center justify-between">
      {/* Left Side - Mobile Menu + Greeting */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        )}
        
        {/* Greeting */}
        <div>
          <h1 className="text-lg lg:text-2xl text-gray-900">Welcome back, {userName}! 👋</h1>
          <p className="text-xs lg:text-sm text-gray-500 mt-0.5 hidden sm:block">Here's what's happening with your deadlines today</p>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Search Bar - Hidden on mobile */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search deadlines..."
            className="w-48 lg:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <Bell className="w-5 lg:w-6 h-5 lg:h-6 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile - Hidden on small mobile */}
        <button className="hidden sm:flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 hover:bg-gray-100 rounded-xl transition-colors">
          <div className="w-8 lg:w-10 h-8 lg:h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-4 lg:w-6 h-4 lg:h-6 text-white" />
          </div>
          <span className="text-sm lg:text-base text-gray-700 hidden md:block">{userName}</span>
        </button>
      </div>
    </div>
  );
}