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
      <div className="deadline-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="deadline-modal-container__header">
          <h2 className="deadline-modal-container__title">
            {deadline ? "Edit Deadline" : "Add New Deadline"}
          </h2>
          <button className="deadline-modal-container__close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="deadline-modal-container__form" onSubmit={handleSubmit}>
          {/* Task Name */}
          <div className="deadline-modal-field">
            <label className="deadline-modal-label">Task Name *</label>
            <input
              className="deadline-modal-input"
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
              required
            />
          </div>

          {/* Course Selector */}
          <div className="deadline-modal-field">
            <label className="deadline-modal-label">Course *</label>
            <select
              className="deadline-modal-select"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
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

          {/* Type and Priority Row */}
          <div className="deadline-modal-field deadline-modal-field--row">
            {/* Task Type */}
            <div>
              <label className="deadline-modal-label">Task Type</label>
              <select
                className="deadline-modal-select"
                value={type}
                onChange={(e) => setType(e.target.value as any)}
              >
                <option value="assignment">Assignment</option>
                <option value="quiz">Quiz</option>
                <option value="exam">Exam</option>
                <option value="project">Project</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="deadline-modal-label">Priority</label>
              <div className="deadline-modal-priority-buttons">
                <button
                  type="button"
                  className={`deadline-modal-priority-btn deadline-modal-priority-btn--low ${
                    priority === "low" ? "deadline-modal-priority-btn--selected" : ""
                  }`}
                  onClick={() => setPriority("low")}
                >
                  Low
                </button>
                <button
                  type="button"
                  className={`deadline-modal-priority-btn deadline-modal-priority-btn--medium ${
                    priority === "medium" ? "deadline-modal-priority-btn--selected" : ""
                  }`}
                  onClick={() => setPriority("medium")}
                >
                  Medium
                </button>
                <button
                  type="button"
                  className={`deadline-modal-priority-btn deadline-modal-priority-btn--high ${
                    priority === "high" ? "deadline-modal-priority-btn--selected" : ""
                  }`}
                  onClick={() => setPriority("high")}
                >
                  High
                </button>
              </div>
            </div>
          </div>

          {/* Due Date */}
          <div className="deadline-modal-field">
            <label className="deadline-modal-label">Due Date *</label>
            <input
              className="deadline-modal-input"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="deadline-modal-field">
            <label className="deadline-modal-label">Description</label>
            <textarea
              className="deadline-modal-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description or notes..."
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="deadline-modal-container__actions">
            <button
              type="button"
              className="deadline-modal-btn deadline-modal-btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="deadline-modal-btn deadline-modal-btn--primary">
              {deadline ? "Update Deadline" : "Add Deadline"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}