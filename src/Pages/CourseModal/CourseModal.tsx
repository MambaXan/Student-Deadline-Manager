import React, { useState } from 'react';
// import { X } from 'lucide-react';
import type { Course } from '../../Types/course';

interface CourseModalProps {
  onSave: (course: Omit<Course, 'id'>) => void;
  onClose: () => void;
}

const PRESET_COLORS = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // amber
  '#8B5CF6', // purple
  '#EF4444', // red
  '#EC4899', // pink
  '#14B8A6', // teal
  '#F97316', // orange
];

export function CourseModal({ onSave, onClose }: CourseModalProps) {
  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [semester, setSemester] = useState('');
  const [color, setColor] = useState(PRESET_COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !instructor || !semester) return;

    onSave({
      title,
      instructor,
      semester,
      color
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl text-gray-900">Add New Course</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            {/* <X className="w-6 h-6 text-gray-600" /> */}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Course Title */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Course Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Computer Science 101"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Instructor */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Instructor Name *
            </label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              placeholder="e.g., Dr. Smith"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Semester */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Semester *
            </label>
            <input
              type="text"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              placeholder="e.g., Fall 2024"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-sm text-gray-700 mb-3">
              Course Color *
            </label>
            <div className="grid grid-cols-8 gap-3">
              {PRESET_COLORS.map(presetColor => (
                <button
                  key={presetColor}
                  type="button"
                  onClick={() => setColor(presetColor)}
                  className={`w-10 h-10 rounded-xl transition-all ${
                    color === presetColor
                      ? 'ring-4 ring-offset-2 ring-gray-400 scale-110'
                      : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: presetColor }}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="pt-4">
            <label className="block text-sm text-gray-700 mb-3">
              Preview
            </label>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div
                className="h-24"
                style={{ backgroundColor: color }}
              />
              <div className="p-4 bg-white">
                <p className="text-gray-900">{title || 'Course Title'}</p>
                <p className="text-sm text-gray-600 mt-1">{instructor || 'Instructor Name'}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
