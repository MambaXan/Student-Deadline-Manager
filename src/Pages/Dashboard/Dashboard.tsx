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
    <div className="dashboard-topbar">
      <div className="dashboard-topbar__content">
        <div className="dashboard-topbar__left">
          {onMenuClick && (
            <button onClick={onMenuClick} className="dashboard-topbar__menu-btn">
              ☰
            </button>
          )}
          <h1 className="dashboard-topbar__title">Dashboard</h1>
        </div>
        <div className="dashboard-topbar__user">
          <span className="dashboard-topbar__user-name">Welcome {userName}</span>
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
    <div className="dashboard-modal-overlay" onClick={onClose}>
      <div className="dashboard-modal" onClick={(e) => e.stopPropagation()}>
        <div className="dashboard-modal__header">
          <h3 className="dashboard-modal__title">Add New Deadline</h3>
          <button onClick={onClose} className="dashboard-modal__close-btn">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="dashboard-modal__form">
          <div className="dashboard-form-group">
            <label className="dashboard-form-label">Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="dashboard-form-input"
              required
              placeholder="Enter task name"
            />
          </div>
          <div className="dashboard-form-group">
            <label className="dashboard-form-label">Course</label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="dashboard-form-select"
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
          <div className="dashboard-form-group">
            <label className="dashboard-form-label">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="dashboard-form-select"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="dashboard-form-group">
            <label className="dashboard-form-label">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="dashboard-form-input"
              required
            />
          </div>
          <div className="dashboard-modal__actions">
            <button
              type="button"
              className="dashboard-btn dashboard-btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="dashboard-btn dashboard-btn--primary">
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
    <div className="dashboard-mobile-nav-overlay" onClick={onClose}>
      <div className="dashboard-mobile-nav" onClick={(e) => e.stopPropagation()}>
        <div className="dashboard-mobile-nav__header">
          <h3 className="dashboard-mobile-nav__title">Menu</h3>
          <button onClick={onClose} className="dashboard-mobile-nav__close-btn">
            ×
          </button>
        </div>
        <nav className="dashboard-mobile-nav__list">
          <button
            onClick={() => {
              onNavigate("dashboard");
              onClose();
            }}
            className={`dashboard-mobile-nav__item ${
              currentPage === "dashboard" ? "dashboard-mobile-nav__item--active" : ""
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => {
              onNavigate("calendar");
              onClose();
            }}
            className="dashboard-mobile-nav__item"
          >
            📅 Calendar
          </button>
          <button
            onClick={() => {
              onNavigate("courses");
              onClose();
            }}
            className="dashboard-mobile-nav__item"
          >
            📚 Courses
          </button>
          <button
            onClick={() => {
              onNavigate("deadlines");
              onClose();
            }}
            className="dashboard-mobile-nav__item"
          >
            📝 Deadlines
          </button>
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="dashboard-mobile-nav__item dashboard-mobile-nav__item--logout"
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
    <div className="dashboard-bar-chart">
      <div className="dashboard-bar-chart__bars">
        {data.map((item, index) => (
          <div key={index} className="dashboard-bar-chart__column">
            <div
              className="dashboard-bar-chart__bar"
              style={{
                height: `${(item.tasks / maxTasks) * 140}px`,
                minHeight: item.tasks > 0 ? "4px" : "0",
              }}
              title={`${item.tasks} task${item.tasks !== 1 ? "s" : ""}`}
            />
            <span className="dashboard-bar-chart__day">{item.name}</span>
            <span className="dashboard-bar-chart__count">{item.tasks}</span>
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
        return "dashboard-badge dashboard-badge--high";
      case "medium":
        return "dashboard-badge dashboard-badge--medium";
      case "low":
        return "dashboard-badge dashboard-badge--low";
      default:
        return "dashboard-badge";
    }
  };

  const getCourseById = (courseId: string) => {
    return courses.find((c) => c.id === courseId);
  };

  return (
    <div className="dashboard-page">
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

      <div className="dashboard-main-content">
        <TopBar
          userName={userName}
          onMenuClick={() => setMobileMenuOpen(true)}
        />

        <main className="dashboard-content">
          {/* Stats Cards */}
          <div className="dashboard-stats-grid">
            {/* Upcoming Deadlines Card */}
            <div className="dashboard-stats-card">
              <div className="dashboard-stats-card__header">
                <div>
                  <p className="dashboard-stats-card__label">Upcoming</p>
                  <p className="dashboard-stats-card__value">
                    {upcomingDeadlines.length}
                  </p>
                </div>
                <div className="dashboard-stats-card__icon dashboard-stats-card__icon--blue">
                  📅
                </div>
              </div>
              <p className="dashboard-stats-card__description">Tasks due soon</p>
            </div>

            {/* Overdue Card */}
            <div className="dashboard-stats-card">
              <div className="dashboard-stats-card__header">
                <div>
                  <p className="dashboard-stats-card__label">Overdue</p>
                  <p className="dashboard-stats-card__value">{overdueDeadlines.length}</p>
                </div>
                <div className="dashboard-stats-card__icon dashboard-stats-card__icon--red">⚠️</div>
              </div>
              <p className="dashboard-stats-card__description">Need attention</p>
            </div>

            {/* Completed Card */}
            <div className="dashboard-stats-card">
              <div className="dashboard-stats-card__header">
                <div>
                  <p className="dashboard-stats-card__label">Completed</p>
                  <p className="dashboard-stats-card__value">{completedCount}</p>
                </div>
                <div className="dashboard-stats-card__icon dashboard-stats-card__icon--green">
                  ✅
                </div>
              </div>
              <p className="dashboard-stats-card__description">Tasks finished</p>
            </div>
          </div>

          <div className="dashboard-grid">
            {/* Upcoming Deadlines List */}
            <div className="dashboard-upcoming-card">
              <div className="dashboard-upcoming-card__header">
                <h2 className="dashboard-upcoming-card__title">Upcoming Deadlines</h2>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="dashboard-btn dashboard-btn--primary dashboard-btn--small"
                >
                  <span className="dashboard-btn__icon">+</span>
                  <span className="dashboard-btn__text">Add Deadline</span>
                </button>
              </div>

              <div className="dashboard-upcoming-list">
                {upcomingDeadlines.length === 0 ? (
                  <div className="dashboard-empty-state">
                    <span className="dashboard-empty-state__icon">📅</span>
                    <p className="dashboard-empty-state__text">No upcoming deadlines</p>
                    <p className="dashboard-empty-state__subtext">
                      Add your first deadline to get started
                    </p>
                  </div>
                ) : (
                  upcomingDeadlines.map((deadline) => {
                    const course = getCourseById(deadline.courseId);
                    return (
                      <div
                        key={deadline.id}
                        className="dashboard-upcoming-item"
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
                          className="dashboard-upcoming-item__checkbox"
                        />
                        <div className="dashboard-upcoming-item__content">
                          <h3 className="dashboard-upcoming-item__title">
                            {deadline.taskName}
                          </h3>
                          <div className="dashboard-upcoming-item__details">
                            {course && (
                              <span
                                className="dashboard-upcoming-item__course"
                                style={{
                                  backgroundColor: `${course.color}20`,
                                  color: course.color,
                                }}
                              >
                                {course.title}
                              </span>
                            )}
                            <span className="dashboard-upcoming-item__date">
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
            <div className="dashboard-sidebar-column">
              {/* Overdue Tasks Warning */}
              {overdueDeadlines.length > 0 && (
                <div className="dashboard-warning-card">
                  <div className="dashboard-warning-card__header">
                    <span className="dashboard-warning-card__icon">⚠️</span>
                    <h3 className="dashboard-warning-card__title">Overdue Tasks</h3>
                  </div>
                  <p className="dashboard-warning-card__text">
                    You have {overdueDeadlines.length} overdue{" "}
                    {overdueDeadlines.length === 1 ? "task" : "tasks"}
                  </p>
                  <button
                    onClick={() => onNavigate("deadlines")}
                    className="dashboard-warning-card__link"
                  >
                    View all →
                  </button>
                </div>
              )}

              {/* This Week Overview Chart */}
              <div className="dashboard-chart-card">
                <div className="dashboard-chart-card__header">
                  <span className="dashboard-chart-card__icon">📈</span>
                  <h3 className="dashboard-chart-card__title">This Week Overview</h3>
                </div>
                <SimpleBarChart data={chartData} />
              </div>

              {/* Quick Stats */}
              <div className="dashboard-stats-summary">
                <h3 className="dashboard-stats-summary__title">Quick Stats</h3>
                <div className="dashboard-stats-summary__list">
                  <div className="dashboard-stats-summary__item">
                    <span className="dashboard-stats-summary__label">Total Courses</span>
                    <span className="dashboard-stats-summary__value">
                      {courses.length}
                    </span>
                  </div>
                  <div className="dashboard-stats-summary__item">
                    <span className="dashboard-stats-summary__label">
                      Total Deadlines
                    </span>
                    <span className="dashboard-stats-summary__value">
                      {deadlines.length}
                    </span>
                  </div>
                  <div className="dashboard-stats-summary__item">
                    <span className="dashboard-stats-summary__label">
                      Completion Rate
                    </span>
                    <span className="dashboard-stats-summary__value">
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