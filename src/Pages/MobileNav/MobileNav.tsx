import React from 'react';
// import { LayoutDashboard, Clock, BookOpen, Calendar, Settings, LogOut, X } from 'lucide-react';

interface MobileNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ currentPage, onNavigate, onLogout, isOpen, onClose }: MobileNavProps) {
  // const menuItems = [
  //   { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  //   { id: 'deadlines', label: 'Deadlines', icon: Clock },
  //   { id: 'courses', label: 'Courses', icon: BookOpen },
  //   { id: 'calendar', label: 'Calendar', icon: Calendar },
  //   { id: 'settings', label: 'Settings', icon: Settings },
  // ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
        onClick={onClose}
      />
      
      {/* Mobile Menu */}
      <div className="fixed inset-y-0 left-0 w-72 bg-white z-50 lg:hidden shadow-2xl animate-slide-in-left">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              {/* <Calendar className="w-6 h-6 text-white" /> */}
            </div>
            <span className="text-xl text-gray-900">DeadlineTracker</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            {/* <X className="w-6 h-6 text-gray-600" /> */}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1">
          {/* {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })} */}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            {/* <LogOut className="w-5 h-5" /> */}
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
}
