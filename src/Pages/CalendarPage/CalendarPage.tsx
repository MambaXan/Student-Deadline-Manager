import React, { useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { TopBar } from '../Topbar/Topbar';
import { DeadlineModal } from '../DeadlineModal/DeadlineModal';
// import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import type { Course } from '../../Types/course';
import type { Deadline } from '../../Types/deadline';

interface CalendarPageProps {
  deadlines: Deadline[];
  courses: Course[];
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onAddDeadline: (deadline: Omit<Deadline, 'id'>) => void;
}

export function CalendarPage({
  deadlines,
  courses,
  onNavigate,
  onLogout,
  onAddDeadline
}: CalendarPageProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getCourseById = (courseId: string) => {
    return courses.find(c => c.id === courseId);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getDeadlinesForDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    date.setHours(0, 0, 0, 0);
    
    return deadlines.filter(deadline => {
      const dueDate = new Date(deadline.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() === date.getTime();
    });
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  // Generate calendar days
  const days = [];
  const totalDays = daysInMonth(currentDate);
  const startDay = firstDayOfMonth(currentDate);

  // Empty cells for days before the first day of month
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  // Actual days
  for (let day = 1; day <= totalDays; day++) {
    days.push(day);
  }

  // Get this week's deadlines for sidebar
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekEnd = new Date(today);
  weekEnd.setDate(weekEnd.getDate() + 7);
  
  const thisWeekDeadlines = deadlines.filter(deadline => {
    const dueDate = new Date(deadline.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate >= today && dueDate <= weekEnd && deadline.status === 'upcoming';
  }).sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage="calendar" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar userName="Alex" />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-gray-900">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={previousMonth}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    {/* <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Today
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> */}
                    Add
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-xl overflow-hidden">
                {/* Day Headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="bg-gray-50 p-3 text-center text-sm text-gray-600">
                    {day}
                  </div>
                ))}

                {/* Calendar Days */}
                {days.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="bg-white p-3 min-h-[120px]" />;
                  }

                  const dayDeadlines = getDeadlinesForDate(day);
                  const isTodayDate = isToday(day);

                  return (
                    <div
                      key={day}
                      className={`bg-white p-3 min-h-[120px] hover:bg-gray-50 transition-colors cursor-pointer ${
                        isTodayDate ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                    >
                      <div className={`text-sm mb-2 ${isTodayDate ? 'text-blue-600' : 'text-gray-700'}`}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayDeadlines.slice(0, 3).map(deadline => {
                          const course = getCourseById(deadline.courseId);
                          return (
                            <div
                              key={deadline.id}
                              className="text-xs px-2 py-1 rounded truncate"
                              style={{
                                backgroundColor: course?.color ? course.color + '20' : '#f3f4f6',
                                color: course?.color || '#6b7280'
                              }}
                              title={deadline.taskName}
                            >
                              {deadline.taskName}
                            </div>
                          );
                        })}
                        {dayDeadlines.length > 3 && (
                          <div className="text-xs text-gray-500 px-2">
                            +{dayDeadlines.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* This Week Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg text-gray-900 mb-4">This Week</h3>
                
                {thisWeekDeadlines.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No deadlines this week
                  </p>
                ) : (
                  <div className="space-y-3">
                    {thisWeekDeadlines.map(deadline => {
                      const course = getCourseById(deadline.courseId);
                      return (
                        <div key={deadline.id} className="p-3 bg-gray-50 rounded-xl">
                          <div className="text-gray-900 mb-2">
                            {deadline.taskName}
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            {course && (
                              <span
                                className="px-2 py-1 rounded"
                                style={{
                                  backgroundColor: course.color + '20',
                                  color: course.color
                                }}
                              >
                                {course.title.split(' ')[0]}
                              </span>
                            )}
                            <span className="text-gray-600">
                              {deadline.dueDate.toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Color Legend */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg text-gray-900 mb-4">Courses</h3>
                <div className="space-y-2">
                  {courses.slice(0, 5).map(course => (
                    <div key={course.id} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: course.color }}
                      />
                      <span className="text-sm text-gray-700 truncate">
                        {course.title}
                      </span>
                    </div>
                  ))}
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
