import React, { useState } from 'react';
// import { Sidebar } from './Sidebar';
// import { TopBar } from './TopBar';
// import { MobileNav } from './MobileNav';
// import { DeadlineModal } from './DeadlineModal';
// import { Plus, Filter, MoreVertical, Edit2, Trash2 } from 'lucide-react';
// import type { Deadline, Course } from '../App';
import { Sidebar } from '../Sidebar/Sidebar';
import { TopBar } from '../Topbar/Topbar';
import { MobileNav } from '../MobileNav/MobileNav';
import { DeadlineModal } from '../DeadlineModal/DeadlineModal';
// import { Plus, BookOpen, User, Clock } from 'lucide-react';
import type { Course } from '../../Types/course';
import type { Deadline } from '../../Types/deadline';

interface DeadlinesPageProps {
  deadlines: Deadline[];
  courses: Course[];
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onAddDeadline: (deadline: Omit<Deadline, 'id'>) => void;
  onUpdateDeadline: (id: string, deadline: Partial<Deadline>) => void;
  onDeleteDeadline: (id: string) => void;
}

export function DeadlinesPage({
  deadlines,
  courses,
  onNavigate,
  onLogout,
  onAddDeadline,
  onUpdateDeadline,
  onDeleteDeadline
}: DeadlinesPageProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDeadline, setEditingDeadline] = useState<Deadline | null>(null);
  const [filterCourse, setFilterCourse] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getCourseById = (courseId: string) => {
    return courses.find(c => c.id === courseId);
  };

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

  // Filter deadlines
  const filteredDeadlines = deadlines.filter(deadline => {
    if (filterCourse !== 'all' && deadline.courseId !== filterCourse) return false;
    if (filterStatus !== 'all' && deadline.status !== filterStatus) return false;
    return true;
  });

  const handleEdit = (deadline: Deadline) => {
    setEditingDeadline(deadline);
    setOpenMenuId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this deadline?')) {
      onDeleteDeadline(id);
      setOpenMenuId(null);
    }
  };

  const handleUpdateDeadline = (deadline: Omit<Deadline, 'id'>) => {
    if (editingDeadline) {
      onUpdateDeadline(editingDeadline.id, deadline);
      setEditingDeadline(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage="deadlines" onNavigate={onNavigate} onLogout={onLogout} />
      <MobileNav 
        currentPage="deadlines" 
        onNavigate={onNavigate} 
        onLogout={onLogout}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar userName="Alex" onMenuClick={() => setMobileMenuOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 lg:mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl text-gray-900 mb-1 lg:mb-2">All Deadlines</h1>
              <p className="text-sm lg:text-base text-gray-600">Manage and track all your upcoming tasks</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full sm:w-auto px-4 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              {/* <Plus className="w-4 lg:w-5 h-4 lg:h-5" /> */}
              Add Deadline
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-200 shadow-sm mb-4 lg:mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4">
              {/* <Filter className="w-5 h-5 text-gray-600 hidden sm:block" /> */}
              <span className="text-sm lg:text-base text-gray-700">Filters:</span>
              
              {/* Course Filter */}
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="w-full sm:w-auto px-3 lg:px-4 py-2 text-sm lg:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full sm:w-auto px-3 lg:px-4 py-2 text-sm lg:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="overdue">Overdue</option>
                <option value="completed">Completed</option>
              </select>

              <span className="text-sm text-gray-500 sm:ml-auto">
                {filteredDeadlines.length} {filteredDeadlines.length === 1 ? 'deadline' : 'deadlines'}
              </span>
            </div>
          </div>

          {/* Deadlines Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Task</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Course</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Type</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Due Date</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Status</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Priority</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredDeadlines.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        No deadlines found
                      </td>
                    </tr>
                  ) : (
                    filteredDeadlines.map(deadline => {
                      const course = getCourseById(deadline.courseId);
                      return (
                        <tr key={deadline.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={deadline.status === 'completed'}
                                onChange={() => {
                                  onUpdateDeadline(deadline.id, {
                                    status: deadline.status === 'completed' ? 'upcoming' : 'completed'
                                  });
                                }}
                                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className={deadline.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'}>
                                {deadline.taskName}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {course && (
                              <span
                                className="px-3 py-1 rounded-lg text-sm"
                                style={{ backgroundColor: course.color + '20', color: course.color }}
                              >
                                {course.title}
                              </span>
                            )}
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
                          <td className="px-6 py-4">
                            <div className="relative">
                              <button
                                onClick={() => setOpenMenuId(openMenuId === deadline.id ? null : deadline.id)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                {/* <MoreVertical className="w-5 h-5 text-gray-600" /> */}
                              </button>
                              
                              {openMenuId === deadline.id && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
                                  <button
                                    onClick={() => handleEdit(deadline)}
                                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                                  >
                                    {/* <Edit2 className="w-4 h-4" /> */}
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDelete(deadline.id)}
                                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                                  >
                                    {/* <Trash2 className="w-4 h-4" /> */}
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
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

      {editingDeadline && (
        <DeadlineModal
          courses={courses}
          deadline={editingDeadline}
          onSave={handleUpdateDeadline}
          onClose={() => setEditingDeadline(null)}
        />
      )}
    </div>
  );
}