import React, { useState, useEffect } from 'react';
// import { X } from 'lucide-react';
import type { Course } from '../../Types/course';
import type { Deadline } from '../../Types/deadline';

interface DeadlineModalProps {
  courses: Course[];
  deadline?: Deadline;
  onSave: (deadline: Omit<Deadline, 'id'>) => void;
  onClose: () => void;
  preselectedCourseId?: string;
}

export function DeadlineModal({ courses, deadline, onSave, onClose, preselectedCourseId }: DeadlineModalProps) {
  const [taskName, setTaskName] = useState(deadline?.taskName || '');
  const [courseId, setCourseId] = useState(deadline?.courseId || preselectedCourseId || '');
  const [type, setType] = useState<'assignment' | 'quiz' | 'exam' | 'project'>(deadline?.type || 'assignment');
  const [dueDate, setDueDate] = useState(
    deadline?.dueDate 
      ? deadline.dueDate.toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  );
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(deadline?.priority || 'medium');
  const [description, setDescription] = useState(deadline?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskName || !courseId) return;

    onSave({
      taskName,
      courseId,
      type,
      dueDate: new Date(dueDate),
      priority,
      description,
      status: 'upcoming'
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 lg:p-6 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200">
          <h2 className="text-xl lg:text-2xl text-gray-900">
            {deadline ? 'Edit Deadline' : 'Add New Deadline'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            {/* <X className="w-5 lg:w-6 h-5 lg:h-6 text-gray-600" /> */}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 lg:p-6 space-y-4 lg:space-y-5">
          {/* Task Name */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Task Name *
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="e.g., Lab Report #3"
              className="w-full px-3 lg:px-4 py-2.5 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Course and Type Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Course */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Course *
              </label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full px-3 lg:px-4 py-2.5 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Type *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 lg:px-4 py-2.5 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="assignment">Assignment</option>
                <option value="quiz">Quiz</option>
                <option value="exam">Exam</option>
                <option value="project">Project</option>
              </select>
            </div>
          </div>

          {/* Due Date and Priority Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Due Date */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Due Date *
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 lg:px-4 py-2.5 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Priority *
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPriority('low')}
                  className={`flex-1 px-3 lg:px-4 py-2.5 lg:py-3 text-sm lg:text-base rounded-xl transition-colors ${
                    priority === 'low'
                      ? 'bg-green-100 text-green-700 border-2 border-green-500'
                      : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                  }`}
                >
                  Low
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('medium')}
                  className={`flex-1 px-3 lg:px-4 py-2.5 lg:py-3 text-sm lg:text-base rounded-xl transition-colors ${
                    priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-500'
                      : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                  }`}
                >
                  Med
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('high')}
                  className={`flex-1 px-3 lg:px-4 py-2.5 lg:py-3 text-sm lg:text-base rounded-xl transition-colors ${
                    priority === 'high'
                      ? 'bg-red-100 text-red-700 border-2 border-red-500'
                      : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                  }`}
                >
                  High
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add notes or details about this task..."
              rows={4}
              className="w-full px-3 lg:px-4 py-2.5 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
            >
              {deadline ? 'Save Changes' : 'Add Deadline'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}