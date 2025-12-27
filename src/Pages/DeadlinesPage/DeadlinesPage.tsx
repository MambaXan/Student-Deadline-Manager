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
    <div className="topbar">
      <div className="topbar__content">
        <div className="topbar__left">
          {onMenuClick && (
            <button onClick={onMenuClick} className="topbar__menu-btn">
              ☰
            </button>
          )}
          <h1 className="topbar__title">Deadlines</h1>
        </div>
        <div className="topbar__user">
          <span className="topbar__user-name">Welcome {userName}</span>
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">
            {deadline ? "Edit Deadline" : "Add New Deadline"}
          </h3>
          <button onClick={onClose} className="modal__close-btn">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal__form">
          <div className="form-group">
            <label className="form-label">Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="form-input"
              placeholder="e.g., Lab Report #3"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Course</label>
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
          <div className="form-group">
            <label className="form-label">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="form-select"
              required
            >
              <option value="assignment">Assignment</option>
              <option value="quiz">Quiz</option>
              <option value="exam">Exam</option>
              <option value="project">Project</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="form-select"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="modal__actions">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onClose}
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
    <div className="mobile-nav-overlay" onClick={onClose}>
      <div className="mobile-nav" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-nav__header">
          <h3 className="mobile-nav__title">Menu</h3>
          <button onClick={onClose} className="mobile-nav__close-btn">
            ×
          </button>
        </div>
        <nav className="mobile-nav__list">
          <button
            onClick={() => {
              onNavigate("dashboard");
              onClose();
            }}
            className="mobile-nav__item"
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => {
              onNavigate("calendar");
              onClose();
            }}
            className="mobile-nav__item"
          >
            📅 Calendar
          </button>
          <button
            onClick={() => {
              onNavigate("courses");
              onClose();
            }}
            className="mobile-nav__item"
          >
            📚 Courses
          </button>
          <button
            onClick={() => {
              onNavigate("deadlines");
              onClose();
            }}
            className={`mobile-nav__item ${
              currentPage === "deadlines" ? "mobile-nav__item--active" : ""
            }`}
          >
            📝 Deadlines
          </button>
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="mobile-nav__item mobile-nav__item--logout"
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
        return "badge badge--high";
      case "medium":
        return "badge badge--medium";
      case "low":
        return "badge badge--low";
      default:
        return "badge";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed":
        return "badge badge--completed";
      case "overdue":
        return "badge badge--overdue";
      case "upcoming":
        return "badge badge--upcoming";
      default:
        return "badge";
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
    <div className="deadlines-page">
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

      <div className="main-content">
        <TopBar userName="Alex" onMenuClick={() => setMobileMenuOpen(true)} />

        <main className="content">
          {/* Header */}
          <div className="deadlines-header">
            <div className="deadlines-header__text">
              <h1 className="deadlines-header__title">All Deadlines</h1>
              <p className="deadlines-header__subtitle">
                Manage and track all your upcoming tasks
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn--add-deadline"
            >
              <span className="btn__icon">+</span>
              Add Deadline
            </button>
          </div>

          {/* Filters */}
          <div className="filters-card">
            <div className="filters">
              <span className="filters__label">Filters:</span>

              {/* Course Filter */}
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="filters__select"
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
                className="filters__select"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="overdue">Overdue</option>
                <option value="completed">Completed</option>
              </select>

              <span className="filters__count">
                {filteredDeadlines.length}{" "}
                {filteredDeadlines.length === 1 ? "deadline" : "deadlines"}
              </span>
            </div>
          </div>

          {/* Deadlines Table */}
          <div className="deadlines-table-container">
            <div className="deadlines-table-wrapper">
              <table className="deadlines-table">
                <thead className="deadlines-table__head">
                  <tr>
                    <th className="deadlines-table__header">Task</th>
                    <th className="deadlines-table__header">Course</th>
                    <th className="deadlines-table__header">Type</th>
                    <th className="deadlines-table__header">Due Date</th>
                    <th className="deadlines-table__header">Status</th>
                    <th className="deadlines-table__header">Priority</th>
                    <th className="deadlines-table__header">Actions</th>
                  </tr>
                </thead>
                <tbody className="deadlines-table__body">
                  {filteredDeadlines.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="deadlines-table__empty">
                        No deadlines found
                      </td>
                    </tr>
                  ) : (
                    filteredDeadlines.map((deadline) => {
                      const course = getCourseById(deadline.courseId);
                      return (
                        <tr key={deadline.id} className="deadlines-table__row">
                          <td className="deadlines-table__cell deadlines-table__cell--task">
                            <div className="task-cell">
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
                                className="task-cell__checkbox"
                              />
                              <span
                                className={`task-cell__text ${
                                  deadline.status === "completed"
                                    ? "task-cell__text--completed"
                                    : ""
                                }`}
                              >
                                {deadline.taskName}
                              </span>
                            </div>
                          </td>
                          <td className="deadlines-table__cell">
                            {course && (
                              <span
                                className="course-badge"
                                style={{
                                  backgroundColor: `${course.color}20`,
                                  color: course.color,
                                }}
                              >
                                {course.title}
                              </span>
                            )}
                          </td>
                          <td className="deadlines-table__cell">
                            <span className="type-cell">
                              <span className="type-cell__icon">
                                {getTypeIcon(deadline.type)}
                              </span>
                              <span className="type-cell__text">
                                {deadline.type}
                              </span>
                            </span>
                          </td>
                          <td className="deadlines-table__cell deadlines-table__cell--date">
                            {new Date(deadline.dueDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </td>
                          <td className="deadlines-table__cell">
                            <span className={getStatusClass(deadline.status)}>
                              {deadline.status}
                            </span>
                          </td>
                          <td className="deadlines-table__cell">
                            <span
                              className={getPriorityClass(deadline.priority)}
                            >
                              {deadline.priority}
                            </span>
                          </td>
                          <td className="deadlines-table__cell deadlines-table__cell--actions">
                            <div className="actions-cell">
                              <button
                                onClick={() =>
                                  setOpenMenuId(
                                    openMenuId === deadline.id
                                      ? null
                                      : deadline.id
                                  )
                                }
                                className="actions-cell__menu-btn"
                              >
                                ⋮
                              </button>

                              {openMenuId === deadline.id && (
                                <div className="actions-menu">
                                  <button
                                    onClick={() => handleEdit(deadline)}
                                    className="actions-menu__item"
                                  >
                                    <span className="actions-menu__icon">
                                      ✏️
                                    </span>
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDelete(deadline.id)}
                                    className="actions-menu__item actions-menu__item--delete"
                                  >
                                    <span className="actions-menu__icon">
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
