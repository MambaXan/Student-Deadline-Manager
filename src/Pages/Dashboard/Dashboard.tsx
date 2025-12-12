import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { DeadlineModal } from './DeadlineModal';
import { AlertTriangle, Calendar, CheckCircle2, Plus, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Deadline, Course } from '../App';

interface DashboardProps {
  userName: string;
  deadlines: Deadline[];
  courses: Course[];
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onAddDeadline: (deadline: Omit<Deadline, 'id'>) => void;
  onUpdateDeadline: (id: string, deadline: Partial<Deadline>) => void;
}

export function Dashboard({
  userName,
  deadlines,
  courses,
  onNavigate,
  onLogout,
  onAddDeadline,
  onUpdateDeadline
}: DashboardProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Calculate statistics
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  const upcomingDeadlines = deadlines
    .filter(d => d.status === 'upcoming')
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    .slice(0, 5);
  
  const overdueDeadlines = deadlines.filter(d => d.status === 'overdue');
  
  const completedCount = deadlines.filter(d => d.status === 'completed').length;

  // Chart data - deadlines per day for the next 7 days
  const chartData = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    const count = deadlines.filter(d => {
      const dueDate = new Date(d.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() === date.getTime() && d.status === 'upcoming';
    }).length;
    
    chartData.push({
      name: date.toLocaleDateString('en-US', { weekday: 'short' }),
      tasks: count
    });
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCourseById = (courseId: string) => {
    return courses.find(c => c.id === courseId);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage="dashboard" onNavigate={onNavigate} onLogout={onLogout} />
      <MobileNav 
        currentPage="dashboard" 
        onNavigate={onNavigate} 
        onLogout={onLogout}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar userName={userName} onMenuClick={() => setMobileMenuOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {/* Upcoming Deadlines Card */}
            <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Upcoming</p>
                  <p className="text-2xl lg:text-3xl text-gray-900">{upcomingDeadlines.length}</p>
                </div>
                <div className="w-10 lg:w-12 h-10 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 lg:w-6 h-5 lg:h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-gray-500">Tasks due soon</p>
            </div>

            {/* Overdue Card */}
            <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Overdue</p>
                  <p className="text-2xl lg:text-3xl text-gray-900">{overdueDeadlines.length}</p>
                </div>
                <div className="w-10 lg:w-12 h-10 lg:h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 lg:w-6 h-5 lg:h-6 text-red-600" />
                </div>
              </div>
              <p className="text-sm text-gray-500">Need attention</p>
            </div>

            {/* Completed Card */}
            <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completed</p>
                  <p className="text-2xl lg:text-3xl text-gray-900">{completedCount}</p>
                </div>
                <div className="w-10 lg:w-12 h-10 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-5 lg:w-6 h-5 lg:h-6 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-gray-500">Tasks finished</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Upcoming Deadlines List */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-4 lg:p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h2 className="text-lg lg:text-xl text-gray-900">Upcoming Deadlines</h2>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-3 lg:px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm lg:text-base"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Deadline</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>

              <div className="space-y-2 lg:space-y-3">
                {upcomingDeadlines.length === 0 ? (
                  <div className="text-center py-8 lg:py-12 text-gray-500">
                    <Calendar className="w-10 lg:w-12 h-10 lg:h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm lg:text-base">No upcoming deadlines</p>
                    <p className="text-xs lg:text-sm mt-1">Add your first deadline to get started</p>
                  </div>
                ) : (
                  upcomingDeadlines.map(deadline => {
                    const course = getCourseById(deadline.courseId);
                    return (
                      <div
                        key={deadline.id}
                        className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => {
                          if (deadline.status === 'upcoming') {
                            onUpdateDeadline(deadline.id, { status: 'completed' });
                          }
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={deadline.status === 'completed'}
                          onChange={() => {}}
                          className="w-4 lg:w-5 h-4 lg:h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm lg:text-base text-gray-900 truncate">{deadline.taskName}</h3>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            {course && (
                              <span 
                                className="text-xs px-2 py-0.5 lg:py-1 rounded-lg truncate max-w-[150px]"
                                style={{ backgroundColor: course.color + '20', color: course.color }}
                              >
                                {course.title}
                              </span>
                            )}
                            <span className="text-xs lg:text-sm text-gray-500">
                              {deadline.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                        </div>
                        <span className={`px-2 lg:px-3 py-1 rounded-lg text-xs ${getPriorityColor(deadline.priority)}`}>
                          {deadline.priority}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4 lg:space-y-6">
              {/* Overdue Tasks Warning */}
              {overdueDeadlines.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 lg:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="w-5 lg:w-6 h-5 lg:h-6 text-red-600" />
                    <h3 className="text-base lg:text-lg text-red-900">Overdue Tasks</h3>
                  </div>
                  <p className="text-sm text-red-700 mb-4">
                    You have {overdueDeadlines.length} overdue {overdueDeadlines.length === 1 ? 'task' : 'tasks'}
                  </p>
                  <button
                    onClick={() => onNavigate('deadlines')}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    View all →
                  </button>
                </div>
              )}

              {/* This Week Overview Chart */}
              <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 lg:w-5 h-4 lg:h-5 text-gray-600" />
                  <h3 className="text-base lg:text-lg text-gray-900">This Week Overview</h3>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" fontSize={11} />
                    <YAxis fontSize={11} />
                    <Tooltip />
                    <Bar dataKey="tasks" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-200 shadow-sm">
                <h3 className="text-base lg:text-lg text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Courses</span>
                    <span className="text-gray-900">{courses.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Deadlines</span>
                    <span className="text-gray-900">{deadlines.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Completion Rate</span>
                    <span className="text-gray-900">
                      {deadlines.length > 0 
                        ? Math.round((completedCount / deadlines.length) * 100) 
                        : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showAddModal && (
        <DeadlineModal
          courses={courses}
          onSave={onAddDeadline}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}