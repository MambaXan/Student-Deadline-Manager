import React, { useState } from "react";
import "./Dashboard.scss";
import { Sidebar } from "../../сomponents/Sidebar";

// Interfaces
interface Course {
  id: string;
  title: string;
  color: string;
}

interface Deadline {
  id: string;
  courseId: string;
  taskName: string;
  dueDate: Date;
  status: "upcoming" | "overdue" | "completed";
  priority: "high" | "medium" | "low";
}

interface DashboardProps {
  currentPage: string;
  userName: string;
  deadlines: Deadline[];
  courses: Course[];
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onAddDeadline: (deadline: Omit<Deadline, "id">) => void;
  onUpdateDeadline: (id: string, deadline: Partial<Deadline>) => void;
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
          <h1 className="topbar__title">Dashboard</h1>
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
  onSave: (deadline: Omit<Deadline, "id">) => void;
  onClose: () => void;
}> = ({ courses, onSave, onClose }) => {
  const [taskName, setTaskName] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName || !selectedCourseId || !dueDate) return;

    onSave({
      courseId: selectedCourseId,
      taskName,
      dueDate: new Date(dueDate),
      status: "upcoming",
      priority: priority as Deadline["priority"],
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">Add New Deadline</h3>
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
              required
              placeholder="Enter task name"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Course</label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
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
            <label className="form-label">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
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
              Save Deadline
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
            className={`mobile-nav__item ${
              currentPage === "dashboard" ? "mobile-nav__item--active" : ""
            }`}
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
            className="mobile-nav__item"
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

const SimpleBarChart: React.FC<{
  data: Array<{ name: string; tasks: number }>;
}> = ({ data }) => {
  const maxTasks = Math.max(...data.map((d) => d.tasks), 1);

  return (
    <div className="bar-chart">
      <div className="bar-chart__bars">
        {data.map((item, index) => (
          <div key={index} className="bar-chart__column">
            <div
              className="bar-chart__bar"
              style={{
                height: `${(item.tasks / maxTasks) * 140}px`,
                minHeight: item.tasks > 0 ? "4px" : "0",
              }}
              title={`${item.tasks} task${item.tasks !== 1 ? "s" : ""}`}
            />
            <span className="bar-chart__day">{item.name}</span>
            <span className="bar-chart__count">{item.tasks}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export function Dashboard({
  currentPage,
  userName,
  deadlines,
  courses,
  onNavigate,
  onLogout,
  onAddDeadline,
  onUpdateDeadline,
}: DashboardProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Calculate statistics
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const upcomingDeadlines = deadlines
    .filter((d) => d.status === "upcoming")
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    )
    .slice(0, 5);

  const overdueDeadlines = deadlines.filter((d) => d.status === "overdue");

  const completedCount = deadlines.filter(
    (d) => d.status === "completed"
  ).length;

  // Chart data - deadlines per day for the next 7 days
  const chartData = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    const count = deadlines.filter((d) => {
      const dueDate = new Date(d.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() === date.getTime() && d.status === "upcoming";
    }).length;

    chartData.push({
      name: date.toLocaleDateString("en-US", { weekday: "short" }),
      tasks: count,
    });
  }

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

  const getCourseById = (courseId: string) => {
    return courses.find((c) => c.id === courseId);
  };

  return (
    <div className="dashboard">
      <Sidebar
        currentPage={currentPage}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      <MobileNav
        currentPage="dashboard"
        onNavigate={onNavigate}
        onLogout={onLogout}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="main-content">
        <TopBar
          userName={userName}
          onMenuClick={() => setMobileMenuOpen(true)}
        />

        <main className="content">
          {/* Stats Cards */}
          <div className="stats-grid">
            {/* Upcoming Deadlines Card */}
            <div className="stats-card">
              <div className="stats-card__header">
                <div>
                  <p className="stats-card__label">Upcoming</p>
                  <p className="stats-card__value">
                    {upcomingDeadlines.length}
                  </p>
                </div>
                <div className="stats-card__icon stats-card__icon--blue">
                  📅
                </div>
              </div>
              <p className="stats-card__description">Tasks due soon</p>
            </div>

            {/* Overdue Card */}
            <div className="stats-card">
              <div className="stats-card__header">
                <div>
                  <p className="stats-card__label">Overdue</p>
                  <p className="stats-card__value">{overdueDeadlines.length}</p>
                </div>
                <div className="stats-card__icon stats-card__icon--red">⚠️</div>
              </div>
              <p className="stats-card__description">Need attention</p>
            </div>

            {/* Completed Card */}
            <div className="stats-card">
              <div className="stats-card__header">
                <div>
                  <p className="stats-card__label">Completed</p>
                  <p className="stats-card__value">{completedCount}</p>
                </div>
                <div className="stats-card__icon stats-card__icon--green">
                  ✅
                </div>
              </div>
              <p className="stats-card__description">Tasks finished</p>
            </div>
          </div>

          <div className="dashboard-grid">
            {/* Upcoming Deadlines List */}
            <div className="upcoming-card">
              <div className="upcoming-card__header">
                <h2 className="upcoming-card__title">Upcoming Deadlines</h2>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn btn--primary btn--small"
                >
                  <span className="btn__icon">+</span>
                  <span className="btn__text">Add Deadline</span>
                </button>
              </div>

              <div className="upcoming-list">
                {upcomingDeadlines.length === 0 ? (
                  <div className="empty-state">
                    <span className="empty-state__icon">📅</span>
                    <p className="empty-state__text">No upcoming deadlines</p>
                    <p className="empty-state__subtext">
                      Add your first deadline to get started
                    </p>
                  </div>
                ) : (
                  upcomingDeadlines.map((deadline) => {
                    const course = getCourseById(deadline.courseId);
                    return (
                      <div
                        key={deadline.id}
                        className="upcoming-item"
                        onClick={() => {
                          if (deadline.status === "upcoming") {
                            onUpdateDeadline(deadline.id, {
                              status: "completed",
                            });
                          }
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={deadline.status === "completed"}
                          onChange={() => {}}
                          className="upcoming-item__checkbox"
                        />
                        <div className="upcoming-item__content">
                          <h3 className="upcoming-item__title">
                            {deadline.taskName}
                          </h3>
                          <div className="upcoming-item__details">
                            {course && (
                              <span
                                className="upcoming-item__course"
                                style={{
                                  backgroundColor: `${course.color}20`,
                                  color: course.color,
                                }}
                              >
                                {course.title}
                              </span>
                            )}
                            <span className="upcoming-item__date">
                              {new Date(deadline.dueDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                        <span className={getPriorityClass(deadline.priority)}>
                          {deadline.priority}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="sidebar-column">
              {/* Overdue Tasks Warning */}
              {overdueDeadlines.length > 0 && (
                <div className="warning-card">
                  <div className="warning-card__header">
                    <span className="warning-card__icon">⚠️</span>
                    <h3 className="warning-card__title">Overdue Tasks</h3>
                  </div>
                  <p className="warning-card__text">
                    You have {overdueDeadlines.length} overdue{" "}
                    {overdueDeadlines.length === 1 ? "task" : "tasks"}
                  </p>
                  <button
                    onClick={() => onNavigate("deadlines")}
                    className="warning-card__link"
                  >
                    View all →
                  </button>
                </div>
              )}

              {/* This Week Overview Chart */}
              <div className="chart-card">
                <div className="chart-card__header">
                  <span className="chart-card__icon">📈</span>
                  <h3 className="chart-card__title">This Week Overview</h3>
                </div>
                <SimpleBarChart data={chartData} />
              </div>

              {/* Quick Stats */}
              <div className="stats-summary">
                <h3 className="stats-summary__title">Quick Stats</h3>
                <div className="stats-summary__list">
                  <div className="stats-summary__item">
                    <span className="stats-summary__label">Total Courses</span>
                    <span className="stats-summary__value">
                      {courses.length}
                    </span>
                  </div>
                  <div className="stats-summary__item">
                    <span className="stats-summary__label">
                      Total Deadlines
                    </span>
                    <span className="stats-summary__value">
                      {deadlines.length}
                    </span>
                  </div>
                  <div className="stats-summary__item">
                    <span className="stats-summary__label">
                      Completion Rate
                    </span>
                    <span className="stats-summary__value">
                      {deadlines.length > 0
                        ? Math.round((completedCount / deadlines.length) * 100)
                        : 0}
                      %
                    </span>
                  </div>
                </div>
              </div>
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
    </div>
  );
}