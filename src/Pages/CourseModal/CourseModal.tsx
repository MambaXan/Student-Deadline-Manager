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
      <div className="course-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="course-modal__header">
          <h2 className="course-modal__title">Add New Course</h2>
          <button onClick={onClose} className="course-modal__close-btn">
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="course-modal__form">
          {/* Course Title */}
          <div className="form-group">
            <label className="form-label">Course Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Computer Science 101"
              className="form-input"
              required
            />
          </div>

          {/* Instructor */}
          <div className="form-group">
            <label className="form-label">Instructor Name *</label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              placeholder="e.g., Dr. Smith"
              className="form-input"
              required
            />
          </div>

          {/* Semester */}
          <div className="form-group">
            <label className="form-label">Semester *</label>
            <input
              type="text"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              placeholder="e.g., Fall 2024"
              className="form-input"
              required
            />
          </div>

          {/* Color Picker */}
          <div className="form-group">
            <label className="form-label">Course Color *</label>
            <div className="color-picker">
              {PRESET_COLORS.map((presetColor) => (
                <button
                  key={presetColor}
                  type="button"
                  onClick={() => setColor(presetColor)}
                  className={`color-picker__item ${
                    color === presetColor ? "color-picker__item--selected" : ""
                  }`}
                  style={{ backgroundColor: presetColor }}
                  title={presetColor}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="preview">
            <label className="form-label">Preview</label>
            <div className="preview__card">
              <div
                className="preview__banner"
                style={{ backgroundColor: color }}
              />
              <div className="preview__content">
                <p className="preview__title">{title || "Course Title"}</p>
                <p className="preview__instructor">
                  {instructor || "Instructor Name"}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="course-modal__actions">
            <button
              type="button"
              onClick={onClose}
              className="btn btn--secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
