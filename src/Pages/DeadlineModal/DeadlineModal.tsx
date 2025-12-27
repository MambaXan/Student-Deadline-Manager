import React, { useState } from "react";
import "./DeadlineModal.scss";

// Interfaces
interface Course {
  id: string;
  title: string;
}

interface Deadline {
  id: string;
  taskName: string;
  courseId: string;
  type: "assignment" | "quiz" | "exam" | "project";
  dueDate: Date;
  priority: "low" | "medium" | "high";
  description: string;
  status: "upcoming" | "overdue" | "completed";
}

interface DeadlineModalProps {
  courses: Course[];
  deadline?: Deadline;
  onSave: (deadline: Omit<Deadline, "id">) => void;
  onClose: () => void;
  preselectedCourseId?: string;
}

export function DeadlineModal({
  courses,
  deadline,
  onSave,
  onClose,
  preselectedCourseId,
}: DeadlineModalProps) {
  const [taskName, setTaskName] = useState(deadline?.taskName || "");
  const [courseId, setCourseId] = useState(
    deadline?.courseId || preselectedCourseId || ""
  );
  const [type, setType] = useState<"assignment" | "quiz" | "exam" | "project">(
    deadline?.type || "assignment"
  );
  const [dueDate, setDueDate] = useState(
    deadline?.dueDate
      ? new Date(deadline.dueDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [priority, setPriority] = useState<"low" | "medium" | "high">(
    deadline?.priority || "medium"
  );
  const [description, setDescription] = useState(deadline?.description || "");

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
      status: "upcoming",
    });

    onClose();
  };

  return (
    <div className="deadline-modal-overlay" onClick={onClose}>
      <div className="deadline-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="deadline-modal__header">
          <h2 className="deadline-modal__title">
            {deadline ? "Edit Deadline" : "Add New Deadline"}
          </h2>
          <button onClick={onClose} className="deadline-modal__close-btn">
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="deadline-modal__form">
          {/* Task Name */}
          <div className="form-group">
            <label className="form-label">Task Name *</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="e.g., Lab Report #3"
              className="form-input"
              required
            />
          </div>

          {/* Course and Type Row */}
          <div className="form-row">
            {/* Course */}
            <div className="form-group">
              <label className="form-label">Course *</label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="form-select"
                required
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div className="form-group">
              <label className="form-label">Type *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="form-select"
              >
                <option value="assignment">Assignment</option>
                <option value="quiz">Quiz</option>
                <option value="exam">Exam</option>
                <option value="project">Project</option>
              </select>
            </div>
          </div>

          {/* Due Date and Priority Row */}
          <div className="form-row">
            {/* Due Date */}
            <div className="form-group">
              <label className="form-label">Due Date *</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {/* Priority */}
            <div className="form-group">
              <label className="form-label">Priority *</label>
              <div className="priority-buttons">
                <button
                  type="button"
                  onClick={() => setPriority("low")}
                  className={`priority-btn ${
                    priority === "low"
                      ? "priority-btn--low priority-btn--selected"
                      : ""
                  }`}
                >
                  Low
                </button>
                <button
                  type="button"
                  onClick={() => setPriority("medium")}
                  className={`priority-btn ${
                    priority === "medium"
                      ? "priority-btn--medium priority-btn--selected"
                      : ""
                  }`}
                >
                  Med
                </button>
                <button
                  type="button"
                  onClick={() => setPriority("high")}
                  className={`priority-btn ${
                    priority === "high"
                      ? "priority-btn--high priority-btn--selected"
                      : ""
                  }`}
                >
                  High
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add notes or details about this task..."
              rows={4}
              className="form-textarea"
            />
          </div>

          {/* Actions */}
          <div className="deadline-modal__actions">
            <button
              type="button"
              onClick={onClose}
              className="btn btn--secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              {deadline ? "Save Changes" : "Add Deadline"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}