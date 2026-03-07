import React, { useState } from "react";
import "./CourseModal.scss";

// Interfaces
interface Course {
  id: string;
  title: string;
  instructor: string;
  semester: string;
  color: string;
}

interface CourseModalProps {
  onSave: (course: Omit<Course, "id">) => void;
  onClose: () => void;
}

const PRESET_COLORS = [
  "#3B82F6", // blue
  "#10B981", // green
  "#F59E0B", // amber
  "#8B5CF6", // purple
  "#EF4444", // red
  "#EC4899", // pink
  "#14B8A6", // teal
  "#F97316", // orange
];

export function CourseModal({ onSave, onClose }: CourseModalProps) {
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [semester, setSemester] = useState("");
  const [color, setColor] = useState(PRESET_COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !instructor || !semester) return;

    onSave({
      title,
      instructor,
      semester,
      color,
    });

    onClose();
  };

  return (
    <div className="course-modal-overlay" onClick={onClose}>
      <div className="course-modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="course-modal-window__header">
          <h2 className="course-modal-window__title">Add New Course</h2>
          <button onClick={onClose} className="course-modal-window__close-btn">
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="course-modal-window__form">
          {/* Course Title */}
          <div className="course-modal-form-group">
            <label className="course-modal-form-label">Course Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Computer Science 101"
              className="course-modal-form-input"
              required
            />
          </div>

          {/* Instructor */}
          <div className="course-modal-form-group">
            <label className="course-modal-form-label">Instructor Name *</label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              placeholder="e.g., Dr. Smith"
              className="course-modal-form-input"
              required
            />
          </div>

          {/* Semester */}
          <div className="course-modal-form-group">
            <label className="course-modal-form-label">Semester *</label>
            <input
              type="text"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              placeholder="e.g., Fall 2024"
              className="course-modal-form-input"
              required
            />
          </div>

          {/* Color Picker */}
          <div className="course-modal-form-group">
            <label className="course-modal-form-label">Course Color *</label>
            <div className="course-modal-color-picker">
              {PRESET_COLORS.map((presetColor) => (
                <button
                  key={presetColor}
                  type="button"
                  onClick={() => setColor(presetColor)}
                  className={`course-modal-color-picker__item ${
                    color === presetColor
                      ? "course-modal-color-picker__item--selected"
                      : ""
                  }`}
                  style={{ backgroundColor: presetColor }}
                  title={presetColor}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="course-modal-preview">
            <label className="course-modal-form-label">Preview</label>
            <div className="course-modal-preview__card">
              <div
                className="course-modal-preview__banner"
                style={{ backgroundColor: color }}
              />
              <div className="course-modal-preview__content">
                <p className="course-modal-preview__title">
                  {title || "Course Title"}
                </p>
                <p className="course-modal-preview__instructor">
                  {instructor || "Instructor Name"}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="course-modal-window__actions">
            <button
              type="button"
              onClick={onClose}
              className="course-modal-btn course-modal-btn--secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="course-modal-btn course-modal-btn--primary"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
