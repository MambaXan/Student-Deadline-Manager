import React, { useState } from "react";
import "./DeadlinesPage.scss";
import { Sidebar } from "../../сomponents/Sidebar";

// Interface
interface Course {
  id: string;
  title: string;
  color: string;
}

interface Deadline {
  id: string;
  courseId: string;
  taskName: string;
  type: "assignment" | "quiz" | "exam" | "project";
  dueDate: Date;
  status: "upcoming" | "overdue" | "completed";
  priority: "low" | "medium" | "high";
}

interface DeadlinesPageProps {
  currentPage: string;
  userName: string;
  deadlines: Deadline[];
  courses: Course[];
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onAddDeadline: (deadline: Omit<Deadline, "id">) => void;
  onUpdateDeadline: (id: string, deadline: Partial<Deadline>) => void;
  onDeleteDeadline: (id: string) => void;
}

// Components
const TopBar: React.FC<{
  userName: string;
  onMenuClick?: () => void;
}> = ({ userName, onMenuClick }) => {
  return (
    <div className="deadlines-page-topbar">
      <div className="deadlines-page-topbar__content">
        <div className="deadlines-page-topbar__left">
          {onMenuClick && (
            <button onClick={onMenuClick} className="deadlines-page-topbar__menu-btn">
              ☰
            </button>
          )}
          <h1 className="deadlines-page-topbar__title">Deadlines</h1>
        </div>
        <div className="deadlines-page-topbar__user">
          <span className="deadlines-page-topbar__user-name">Welcome {userName}!</span>
        </div>
      </div>
    </div>
  );
};

const DeadlineModal: React.FC<{
  courses: Course[];
  deadline?: Deadline;
  onSave: (deadline: Omit<Deadline, "id">) => void;
  onClose: () => void;
}> = ({ courses, deadline, onSave, onClose }) => {
  const [taskName, setTaskName] = useState(deadline?.taskName || "");
  const [courseId, setCourseId] = useState(deadline?.courseId || "");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskName || !courseId) return;

    onSave({
      taskName,
      courseId,
      type,
      dueDate: new Date(dueDate),
      priority,
      status: "upcoming",
    });

    onClose();
  };

  return (
    <div className="deadlines-page-modal-overlay" onClick={onClose}>
      <div className="deadlines-page-modal" onClick={(e) => e.stopPropagation()}>
        <div className="deadlines-page-modal__header">
          <h3 className="deadlines-page-modal__title">
            {deadline ? "Edit Deadline" : "Add New Deadline"}
          </h3>
          <button onClick={onClose} className="deadlines-page-modal__close-btn">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="deadlines-page-modal__form">
          <div className="deadlines-page-form-group">
            <label className="deadlines-page-form-label">Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="deadlines-page-form-input"
              placeholder="e.g., Lab Report #3"
              required
            />
          </div>
          <div className="deadlines-page-form-group">
            <label className="deadlines-page-form-label">Course</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="deadlines-page-form-select"
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
          <div className="deadlines-page-form-group">
            <label className="deadlines-page-form-label">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="deadlines-page-form-select"
              required
            >
              <option value="assignment">Assignment</option>
              <option value="quiz">Quiz</option>
              <option value="exam">Exam</option>
              <option value="project">Project</option>
            </select>
          </div>
          <div className="deadlines-page-form-group">
            <label className="deadlines-page-form-label">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="deadlines-page-form-select"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="deadlines-page-form-group">
            <label className="deadlines-page-form-label">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="deadlines-page-form-input"
              required
            />
          </div>
          <div className="deadlines-page-modal__actions">
            <button
              type="button"
              className="deadlines-page-btn deadlines-page-btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="deadlines-page-btn deadlines-page-btn--primary">
              {deadline ? "Save Changes" : "Add Deadline"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MobileNav: React.FC<{
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}> = ({ currentPage, onNavigate, onLogout, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="deadlines-page-mobile-nav-overlay" onClick={onClose}>
      <div className="deadlines-page-mobile-nav" onClick={(e) => e.stopPropagation()}>
        <div className="deadlines-page-mobile-nav__header">
          <h3 className="deadlines-page-mobile-nav__title">Menu</h3>
          <button onClick={onClose} className="deadlines-page-mobile-nav__close-btn">
            ×
          </button>
        </div>
        <nav className="deadlines-page-mobile-nav__list">
          <button
            onClick={() => {
              onNavigate("dashboard");
              onClose();
            }}
            className="deadlines-page-mobile-nav__item"
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => {
              onNavigate("calendar");
              onClose();
            }}
            className="deadlines-page-mobile-nav__item"
          >
            📅 Calendar
          </button>
          <button
            onClick={() => {
              onNavigate("courses");
              onClose();
            }}
            className="deadlines-page-mobile-nav__item"
          >
            📚 Courses
          </button>
          <button
            onClick={() => {
              onNavigate("deadlines");
              onClose();
            }}
            className={`deadlines-page-mobile-nav__item ${
              currentPage === "deadlines" ? "deadlines-page-mobile-nav__item--active" : ""
            }`}
          >
            📝 Deadlines
          </button>
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="deadlines-page-mobile-nav__item deadlines-page-mobile-nav__item--logout"
          >
            👤 Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export function DeadlinesPage({
  currentPage,
  userName,
  deadlines,
  courses,
  onNavigate,
  onLogout,
  onAddDeadline,
  onUpdateDeadline,
  onDeleteDeadline,
}: DeadlinesPageProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDeadline, setEditingDeadline] = useState<Deadline | null>(null);
  const [filterCourse, setFilterCourse] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getCourseById = (courseId: string) => {
    return courses.find((c) => c.id === courseId);
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "deadlines-page-badge deadlines-page-badge--high";
      case "medium":
        return "deadlines-page-badge deadlines-page-badge--medium";
      case "low":
        return "deadlines-page-badge deadlines-page-badge--low";
      default:
        return "deadlines-page-badge";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed":
        return "deadlines-page-badge deadlines-page-badge--completed";
      case "overdue":
        return "deadlines-page-badge deadlines-page-badge--overdue";
      case "upcoming":
        return "deadlines-page-badge deadlines-page-badge--upcoming";
      default:
        return "deadlines-page-badge";
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

  // Filter deadlines
  const filteredDeadlines = deadlines.filter((deadline) => {
    if (filterCourse !== "all" && deadline.courseId !== filterCourse)
      return false;
    if (filterStatus !== "all" && deadline.status !== filterStatus)
      return false;
    return true;
  });

  const handleEdit = (deadline: Deadline) => {
    setEditingDeadline(deadline);
    setOpenMenuId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this deadline?")) {
      onDeleteDeadline(id);
      setOpenMenuId(null);
    }
  };

  const handleUpdateDeadline = (deadline: Omit<Deadline, "id">) => {
    if (editingDeadline) {
      onUpdateDeadline(editingDeadline.id, deadline);
      setEditingDeadline(null);
    }
  };

  return (
    <div className="deadlines-page-container">
      <Sidebar
        currentPage={currentPage}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      <MobileNav
        currentPage="deadlines"
        onNavigate={onNavigate}
        onLogout={onLogout}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="deadlines-page-main-content">
        <TopBar userName={userName} onMenuClick={() => setMobileMenuOpen(true)} />

        <main className="deadlines-page-content">
          {/* Header */}
          <div className="deadlines-page-header">
            <div className="deadlines-page-header__text">
              <h1 className="deadlines-page-header__title">All Deadlines</h1>
              <p className="deadlines-page-header__subtitle">
                Manage and track all your upcoming tasks
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="deadlines-page-btn deadlines-page-btn--add-deadline"
            >
              <span className="deadlines-page-btn__icon">+</span>
              Add Deadline
            </button>
          </div>

          {/* Filters */}
          <div className="deadlines-page-filters-card">
            <div className="deadlines-page-filters">
              <span className="deadlines-page-filters__label">Filters:</span>

              {/* Course Filter */}
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="deadlines-page-filters__select"
              >
                <option value="all">All Courses</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="deadlines-page-filters__select"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="overdue">Overdue</option>
                <option value="completed">Completed</option>
              </select>

              <span className="deadlines-page-filters__count">
                {filteredDeadlines.length}{" "}
                {filteredDeadlines.length === 1 ? "deadline" : "deadlines"}
              </span>
            </div>
          </div>

          {/* Deadlines Table */}
          <div className="deadlines-page-table-container">
            <div className="deadlines-page-table-wrapper">
              <table className="deadlines-page-table">
                <thead className="deadlines-page-table__head">
                  <tr>
                    <th className="deadlines-page-table__header">Task</th>
                    <th className="deadlines-page-table__header">Course</th>
                    <th className="deadlines-page-table__header">Type</th>
                    <th className="deadlines-page-table__header">Due Date</th>
                    <th className="deadlines-page-table__header">Status</th>
                    <th className="deadlines-page-table__header">Priority</th>
                    <th className="deadlines-page-table__header">Actions</th>
                  </tr>
                </thead>
                <tbody className="deadlines-page-table__body">
                  {filteredDeadlines.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="deadlines-page-table__empty">
                        No deadlines found
                      </td>
                    </tr>
                  ) : (
                    filteredDeadlines.map((deadline) => {
                      const course = getCourseById(deadline.courseId);
                      return (
                        <tr key={deadline.id} className="deadlines-page-table__row">
                          <td className="deadlines-page-table__cell deadlines-page-table__cell--task">
                            <div className="deadlines-page-task-cell">
                              <input
                                type="checkbox"
                                checked={deadline.status === "completed"}
                                onChange={() => {
                                  onUpdateDeadline(deadline.id, {
                                    status:
                                      deadline.status === "completed"
                                        ? "upcoming"
                                        : "completed",
                                  });
                                }}
                                className="deadlines-page-task-cell__checkbox"
                              />
                              <span
                                className={`deadlines-page-task-cell__text ${
                                  deadline.status === "completed"
                                    ? "deadlines-page-task-cell__text--completed"
                                    : ""
                                }`}
                              >
                                {deadline.taskName}
                              </span>
                            </div>
                          </td>
                          <td className="deadlines-page-table__cell">
                            {course && (
                              <span
                                className="deadlines-page-course-badge"
                                style={{
                                  backgroundColor: `${course.color}20`,
                                  color: course.color,
                                }}
                              >
                                {course.title}
                              </span>
                            )}
                          </td>
                          <td className="deadlines-page-table__cell">
                            <span className="deadlines-page-type-cell">
                              <span className="deadlines-page-type-cell__icon">
                                {getTypeIcon(deadline.type)}
                              </span>
                              <span className="deadlines-page-type-cell__text">
                                {deadline.type}
                              </span>
                            </span>
                          </td>
                          <td className="deadlines-page-table__cell deadlines-page-table__cell--date">
                            {new Date(deadline.dueDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </td>
                          <td className="deadlines-page-table__cell">
                            <span className={getStatusClass(deadline.status)}>
                              {deadline.status}
                            </span>
                          </td>
                          <td className="deadlines-page-table__cell">
                            <span
                              className={getPriorityClass(deadline.priority)}
                            >
                              {deadline.priority}
                            </span>
                          </td>
                          <td className="deadlines-page-table__cell deadlines-page-table__cell--actions">
                            <div className="deadlines-page-actions-cell">
                              <button
                                onClick={() =>
                                  setOpenMenuId(
                                    openMenuId === deadline.id
                                      ? null
                                      : deadline.id
                                  )
                                }
                                className="deadlines-page-actions-cell__menu-btn"
                              >
                                ⋮
                              </button>

                              {openMenuId === deadline.id && (
                                <div className="deadlines-page-actions-menu">
                                  <button
                                    onClick={() => handleEdit(deadline)}
                                    className="deadlines-page-actions-menu__item"
                                  >
                                    <span className="deadlines-page-actions-menu__icon">
                                      ✏️
                                    </span>
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDelete(deadline.id)}
                                    className="deadlines-page-actions-menu__item deadlines-page-actions-menu__item--delete"
                                  >
                                    <span className="deadlines-page-actions-menu__icon">
                                      🗑️
                                    </span>
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