import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { CourseModal } from './CourseModal';
import { Plus, BookOpen, User, Clock } from 'lucide-react';
import type { Course, Deadline } from '../App';

interface CoursesPageProps {
  courses: Course[];
  deadlines: Deadline[];
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onViewCourse: (courseId: string) => void;
  onAddCourse: (course: Omit<Course, 'id'>) => void;
}

export function CoursesPage({
  courses,
  deadlines,
  onNavigate,
  onLogout,
  onViewCourse,
  onAddCourse
}: CoursesPageProps) {
  const [showAddModal, setShowAddModal] = useState(false);

  const getUpcomingTasksCount = (courseId: string) => {
    return deadlines.filter(d => d.courseId === courseId && d.status === 'upcoming').length;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage="courses" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar userName="Alex" />
        
        <main className="flex-1 overflow-y-auto p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl text-gray-900 mb-2">My Courses</h1>
              <p className="text-gray-600">Organize and track all your university courses</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Course
            </button>
          </div>

          {/* Courses Grid */}
          {courses.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-600 mb-6">Add your first course to get started</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Course
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => {
                const upcomingCount = getUpcomingTasksCount(course.id);
                
                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden"
                    onClick={() => onViewCourse(course.id)}
                  >
                    {/* Color Header */}
                    <div
                      className="h-32 relative"
                      style={{ backgroundColor: course.color }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30" />
                      <div className="absolute top-4 right-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl text-gray-900 mb-3">
                        {course.title}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User className="w-4 h-4" />
                          <span>{course.instructor}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{course.semester}</span>
                        </div>
                      </div>

                      {/* Tasks Badge */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <span className="text-sm text-gray-600">
                          Upcoming tasks
                        </span>
                        <span
                          className="px-3 py-1 rounded-lg text-sm"
                          style={{ 
                            backgroundColor: upcomingCount > 0 ? course.color + '20' : '#f3f4f6',
                            color: upcomingCount > 0 ? course.color : '#6b7280'
                          }}
                        >
                          {upcomingCount}
                        </span>
                      </div>

                      {/* View Details Button */}
                      <button
                        className="w-full mt-4 px-4 py-2 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {showAddModal && (
        <CourseModal
          onSave={onAddCourse}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}
