import React, { useState } from "react";
import "./CourseDetailsPage.scss";
import { Sidebar } from "../../components/Sidebar";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";

// Interfaces
interface Course {
  id: string;
  title: string;
  instructor: string;
  semester: string;
  color: string;
}

interface Deadline {
  id: string;
  courseId: string;
  taskName: string;
  type: "assignment" | "quiz" | "exam" | "project";
  dueDate: Date;
  status: "upcoming" | "overdue" | "completed";
  priority: "high" | "medium" | "low";
}

interface CourseDetailsPageProps {
  currentPage: string;
  userName: string;
  course: Course;
  deadlines: Deadline[];
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onAddDeadline: (deadline: Omit<Deadline, "id">) => void;
  onBack: () => void;
}

// Components
const TopBar: React.FC<{ userName: string }> = ({ userName }) => {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="course-details-topbar">
      <div className="course-details-topbar__content">
        <h1 className="course-details-topbar__title">Course Details</h1>
        <div className="course-details-topbar__user">
          <span className="course-details-topbar__user-name">
            {greeting}, {userName}!
          </span>
        </div>
      </div>
    </div>
  );
};

const DeadlineModal: React.FC<{
  courses: Course[];
  preselectedCourseId: string;
  onSave: (deadline: Omit<Deadline, "id">) => void;
  onClose: () => void;
}> = ({ courses, preselectedCourseId, onSave, onClose }) => {
  const [taskName, setTaskName] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(preselectedCourseId);
  const [dueDate, setDueDate] = useState("");
  const [type, setType] = useState("assignment");
  const [priority, setPriority] = useState("medium");

  const courseOptions = courses.map((c) => ({ value: c.id, label: c.title }));

  const typeOptions = [
    { value: "assignment", label: "Assignment" },
    { value: "quiz", label: "Quiz" },
    { value: "exam", label: "Exam" },
    { value: "project", label: "Project" },
  ];

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName || !selectedCourseId || !dueDate) return;

    onSave({
      courseId: selectedCourseId,
      taskName,
      type: type as Deadline["type"],
      dueDate: new Date(dueDate),
      status: "upcoming",
      priority: priority as Deadline["priority"],
    });
    onClose();
  };

  return (
    <div className="course-details-modal-overlay" onClick={onClose}>
      <div
        className="course-details-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="course-details-modal__header">
          <h3 className="course-details-modal__title">Add New Deadline</h3>
          <button onClick={onClose} className="course-details-modal__close-btn">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="course-details-modal__form">
          <div className="course-details-form-group">
            <label className="course-details-form-label">Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="course-details-form-input"
              required
              placeholder="Enter task name"
            />
          </div>
          <div className="course-details-form-group">
            <label className="course-details-form-label">Course</label>
            <CustomDropdown
              value={selectedCourseId}
              onChange={setSelectedCourseId}
              options={courseOptions}
            />
          </div>
          <div className="course-details-form-group">
            <label className="course-details-form-label">Type</label>
            <CustomDropdown
              value={type}
              onChange={setType}
              options={typeOptions}
            />
          </div>
          <div className="course-details-form-group">
            <label className="course-details-form-label">Priority</label>
            <CustomDropdown
              value={priority}
              onChange={setPriority}
              options={priorityOptions}
            />
          </div>
          <div className="course-details-form-group">
            <label className="course-details-form-label">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="course-details-form-input"
              required
            />
          </div>
          <div className="course-details-modal__actions">
            <button
              type="button"
              className="course-details-btn course-details-btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="course-details-btn course-details-btn--primary"
            >
              Save Deadline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export function CourseDetailsPage({
  currentPage,
  course,
  userName,
  deadlines,
  onNavigate,
  onLogout,
  onAddDeadline,
  onBack,
}: CourseDetailsPageProps) {
  const [showAddModal, setShowAddModal] = useState(false);

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "course-details-badge course-details-badge--high";
      case "medium":
        return "course-details-badge course-details-badge--medium";
      case "low":
        return "course-details-badge course-details-badge--low";
      default:
        return "course-details-badge";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed":
        return "course-details-badge course-details-badge--completed";
      case "overdue":
        return "course-details-badge course-details-badge--overdue";
      case "upcoming":
        return "course-details-badge course-details-badge--upcoming";
      default:
        return "course-details-badge";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return "📝";
      case "quiz":
        return "❓";
      case "exam":
        return "📋";
      case "project":
        return "💼";
      default:
        return "📄";
    }
  };

  const upcomingDeadlines = deadlines.filter(
    (d) => d.status === "upcoming"
  ).length;
  const overdueDeadlines = deadlines.filter(
    (d) => d.status === "overdue"
  ).length;
  const completedDeadlines = deadlines.filter(
    (d) => d.status === "completed"
  ).length;

  return (
    <div className="course-details-page">
      <Sidebar
        currentPage={currentPage}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className="course-details-main-content">
        <TopBar userName={userName} />

        <main className="course-details-content">
          {/* Back Button */}
          <button onClick={onBack} className="course-details-back-btn">
            ← Back to Courses
          </button>

          {/* Course Header */}
          <div className="course-details-header">
            <div
              className="course-details-header__banner"
              style={{ backgroundColor: course.color }}
            >
              <div className="course-details-header__overlay" />
              <div className="course-details-header__info">
                <div className="course-details-header__left">
                  <h1 className="course-details-header__title">
                    {course.title}
                  </h1>
                  <div className="course-details-header__meta">
                    <div className="course-details-header__meta-item">
                      <span className="course-details-header__meta-icon">
                        👤
                      </span>
                      <span className="course-details-header__meta-text">
                        {course.instructor}
                      </span>
                    </div>
                    <div className="course-details-header__meta-item">
                      <span className="course-details-header__meta-icon">
                        ⏰
                      </span>
                      <span className="course-details-header__meta-text">
                        {course.semester}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="course-details-btn course-details-btn--add-deadline"
                >
                  <span className="course-details-btn__icon">+</span>
                  Add Deadline
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="course-details-stats">
              <div className="course-details-stats__item">
                <div className="course-details-stats__value">
                  {upcomingDeadlines}
                </div>
                <div className="course-details-stats__label">Upcoming</div>
              </div>
              <div className="course-details-stats__item course-details-stats__item--border">
                <div className="course-details-stats__value">
                  {overdueDeadlines}
                </div>
                <div className="course-details-stats__label">Overdue</div>
              </div>
              <div className="course-details-stats__item">
                <div className="course-details-stats__value">
                  {completedDeadlines}
                </div>
                <div className="course-details-stats__label">Completed</div>
              </div>
            </div>
          </div>

          {/* Deadlines Section */}
          <div className="course-details-deadlines-section">
            <div className="course-details-deadlines-section__header">
              <h2 className="course-details-deadlines-section__title">
                Course Deadlines
              </h2>
            </div>

            {deadlines.length === 0 ? (
              <div className="course-details-empty-state">
                <span className="course-details-empty-state__icon">📅</span>
                <p className="course-details-empty-state__text">
                  No deadlines for this course yet
                </p>
              </div>
            ) : (
              <div className="course-details-table-container">
                <table className="course-details-deadlines-table">
                  <thead className="course-details-deadlines-table__head">
                    <tr>
                      <th className="course-details-deadlines-table__header">
                        Task
                      </th>
                      <th className="course-details-deadlines-table__header">
                        Type
                      </th>
                      <th className="course-details-deadlines-table__header">
                        Due Date
                      </th>
                      <th className="course-details-deadlines-table__header">
                        Status
                      </th>
                      <th className="course-details-deadlines-table__header">
                        Priority
                      </th>
                    </tr>
                  </thead>
                  <tbody className="course-details-deadlines-table__body">
                    {deadlines.map((deadline) => (
                      <tr
                        key={deadline.id}
                        className="course-details-deadlines-table__row"
                      >
                        <td className="course-details-deadlines-table__cell">
                          <span
                            className={`course-details-deadlines-table__task ${
                              deadline.status === "completed"
                                ? "course-details-deadlines-table__task--completed"
                                : ""
                            }`}
                          >
                            {deadline.taskName}
                          </span>
                        </td>
                        <td className="course-details-deadlines-table__cell">
                          <span className="course-details-deadlines-table__type">
                            <span className="course-details-deadlines-table__type-icon">
                              {getTypeIcon(deadline.type)}
                            </span>
                            <span className="course-details-deadlines-table__type-text">
                              {deadline.type}
                            </span>
                          </span>
                        </td>
                        <td className="course-details-deadlines-table__cell course-details-deadlines-table__cell--date">
                          {deadline.dueDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="course-details-deadlines-table__cell">
                          <span className={getStatusClass(deadline.status)}>
                            {deadline.status}
                          </span>
                        </td>
                        <td className="course-details-deadlines-table__cell">
                          <span className={getPriorityClass(deadline.priority)}>
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
