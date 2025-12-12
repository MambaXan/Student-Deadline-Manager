import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { DeadlineModal } from './DeadlineModal';
import { ArrowLeft, Plus, BookOpen, User, Clock, Calendar } from 'lucide-react';
import type { Course, Deadline } from '../App';

interface CourseDetailsPageProps {
  course: Course;
  deadlines: Deadline[];
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onAddDeadline: (deadline: Omit<Deadline, 'id'>) => void;
  onBack: () => void;
}

export function CourseDetailsPage({
  course,
  deadlines,
  onNavigate,
  onLogout,
  onAddDeadline,
  onBack
}: CourseDetailsPageProps) {
  const [showAddModal, setShowAddModal] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'overdue': return 'text-red-600 bg-red-50';
      case 'upcoming': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment': return '📝';
      case 'quiz': return '❓';
      case 'exam': return '📋';
      case 'project': return '💼';
      default: return '📄';
    }
  };

  const upcomingDeadlines = deadlines.filter(d => d.status === 'upcoming').length;
  const overdueDeadlines = deadlines.filter(d => d.status === 'overdue').length;
  const completedDeadlines = deadlines.filter(d => d.status === 'completed').length;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage="courses" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar userName="Alex" />
        
        <main className="flex-1 overflow-y-auto p-8">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Courses
          </button>

          {/* Course Header */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
            <div
              className="h-40 relative"
              style={{ backgroundColor: course.color }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <h1 className="text-3xl text-white mb-2">
                      {course.title}
                    </h1>
                    <div className="flex items-center gap-4 text-white/90">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{course.instructor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{course.semester}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-6 py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    Add Deadline
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="p-6 grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl text-gray-900 mb-1">{upcomingDeadlines}</div>
                <div className="text-sm text-gray-600">Upcoming</div>
              </div>
              <div className="text-center border-x border-gray-200">
                <div className="text-2xl text-gray-900 mb-1">{overdueDeadlines}</div>
                <div className="text-sm text-gray-600">Overdue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-gray-900 mb-1">{completedDeadlines}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>

          {/* Deadlines Section */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl text-gray-900">Course Deadlines</h2>
            </div>

            {deadlines.length === 0 ? (
              <div className="p-12 text-center">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">No deadlines for this course yet</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add First Deadline
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm text-gray-600">Task</th>
                      <th className="px-6 py-4 text-left text-sm text-gray-600">Type</th>
                      <th className="px-6 py-4 text-left text-sm text-gray-600">Due Date</th>
                      <th className="px-6 py-4 text-left text-sm text-gray-600">Status</th>
                      <th className="px-6 py-4 text-left text-sm text-gray-600">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {deadlines.map(deadline => (
                      <tr key={deadline.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className={deadline.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'}>
                            {deadline.taskName}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-2 text-gray-700">
                            <span>{getTypeIcon(deadline.type)}</span>
                            <span className="capitalize">{deadline.type}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {deadline.dueDate.toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-lg text-sm capitalize ${getStatusColor(deadline.status)}`}>
                            {deadline.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-lg text-sm capitalize ${getPriorityColor(deadline.priority)}`}>
                            {deadline.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {showAddModal && (
        <DeadlineModal
          courses={[course]}
          preselectedCourseId={course.id}
          onSave={onAddDeadline}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}
