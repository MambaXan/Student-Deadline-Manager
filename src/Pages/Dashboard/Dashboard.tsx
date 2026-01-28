import React, { useState } from "react";
import "./Dashboard.scss";
import { Sidebar } from "../../components/Sidebar";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";

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
  onClearCompleted: () => void;
}

const ProgressBar: React.FC<{ percentage: number; size?: number }> = ({
  percentage,
  size = 80,
}) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  const getStrokeColor = () =>
    percentage < 30 ? "#ef4444" : percentage < 70 ? "#f59e0b" : "#10b981";

  return (
    <div
      className="dashboard-progress-circle"
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={getStrokeColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: offset,
            transition: "stroke-dashoffset 0.8s ease-in-out, stroke 0.5s ease",
          }}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span
        style={{
          position: "absolute",
          fontSize: "14px",
          fontWeight: "bold",
          color: getStrokeColor(),
        }}
      >
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

const TopBar: React.FC<{ userName: string; onMenuClick?: () => void }> = ({
  userName,
  onMenuClick,
}) => {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  return (
    <div className="dashboard-topbar">
      <div className="dashboard-topbar__content">
        <div
          className="dashboard-topbar__left"
          style={{ display: "flex", alignItems: "center", gap: "12px" }}
        >
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="dashboard-topbar__menu-btn"
            >
              ☰
            </button>
          )}
          <h1 className="dashboard-topbar__title">Dashboard</h1>
        </div>
        <div className="dashboard-topbar__user">
          <span className="dashboard-topbar__user-name">
            {greeting}, {userName || "Student"}!
          </span>
        </div>
      </div>
    </div>
  );
};

const DeadlineModal: React.FC<{
  courses: Course[];
  onSave: (deadline: Omit<Deadline, "id">) => void;
  onClose: () => void;
  onNavigate: (page: string) => void;
}> = ({ courses, onSave, onClose, onNavigate }) => {
  const [taskName, setTaskName] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  const courseOptions = courses.map((course) => ({
    value: course.id,
    label: course.title,
  }));
  const priorityOptions = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

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

        {courses.length === 0 ? (
          <div style={{ padding: "20px", textAlign: "center" }}>
            <p style={{ marginBottom: "15px", color: "#6b7280" }}>
              You need to create a course first!
            </p>
            <button
              onClick={() => onNavigate("courses")}
              className="dashboard-btn dashboard-btn--primary"
            >
              Go to Courses
            </button>
          </div>
        ) : (
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
              <CustomDropdown
                value={selectedCourseId}
                onChange={setSelectedCourseId}
                options={courseOptions}
                placeholder="Select a course"
              />
            </div>
            <div className="dashboard-form-group">
              <label className="dashboard-form-label">Priority</label>
              <CustomDropdown
                value={priority}
                onChange={(v) => setPriority(v as Deadline["priority"])}
                options={priorityOptions}
                placeholder="Select priority"
              />
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
              <button
                type="submit"
                className="dashboard-btn dashboard-btn--primary"
              >
                Save Deadline
              </button>
            </div>
          </form>
        )}
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
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "calendar", label: "Calendar", icon: "📅" },
    { id: "courses", label: "Courses", icon: "📚" },
    { id: "deadlines", label: "Deadlines", icon: "📝" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div
      className={`dashboard-mobile-nav-overlay ${isOpen ? "is-open" : ""}`}
      onClick={onClose}
    >
      <div
        className="dashboard-mobile-nav"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dashboard-mobile-nav__header">
          <h3 className="dashboard-mobile-nav__title">Menu</h3>
          <button onClick={onClose} className="dashboard-mobile-nav__close-btn">
            ×
          </button>
        </div>
        <nav className="dashboard-mobile-nav__list">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
              className={`dashboard-mobile-nav__item ${
                currentPage === item.id
                  ? "dashboard-mobile-nav__item--active"
                  : ""
              }`}
            >
              <span style={{ marginRight: "10px" }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
          <div
            style={{
              marginTop: "auto",
              borderTop: "1px solid #eee",
              paddingTop: "10px",
            }}
          >
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="dashboard-mobile-nav__item dashboard-mobile-nav__item--logout"
            >
              <span style={{ marginRight: "10px" }}>👤</span> Log Out
            </button>
          </div>
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
                height: `${(item.tasks / maxTasks) * 120}px`,
                minHeight: item.tasks > 0 ? "4px" : "0",
              }}
              title={`${item.tasks} tasks`}
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
  onClearCompleted,
}: DashboardProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
  const completionRate =
    deadlines.length > 0
      ? Math.round((completedCount / deadlines.length) * 100)
      : 0;

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
          <div className="dashboard-stats-grid">
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
              <p className="dashboard-stats-card__description">
                Tasks due soon
              </p>
            </div>
            <div className="dashboard-stats-card">
              <div className="dashboard-stats-card__header">
                <div>
                  <p className="dashboard-stats-card__label">Overdue</p>
                  <p className="dashboard-stats-card__value">
                    {overdueDeadlines.length}
                  </p>
                </div>
                <div className="dashboard-stats-card__icon dashboard-stats-card__icon--red">
                  ⚠️
                </div>
              </div>
              <p className="dashboard-stats-card__description">
                Need attention
              </p>
            </div>
            <div className="dashboard-stats-card">
              <div className="dashboard-stats-card__header">
                <div>
                  <p className="dashboard-stats-card__label">Completed</p>
                  <p className="dashboard-stats-card__value">
                    {completedCount}
                  </p>
                </div>
                <div className="dashboard-stats-card__icon dashboard-stats-card__icon--green">
                  ✅
                </div>
              </div>
              <p className="dashboard-stats-card__description">
                Tasks finished
              </p>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-upcoming-card">
              <div className="dashboard-upcoming-card__header">
                <h2 className="dashboard-upcoming-card__title">
                  Upcoming Deadlines
                </h2>
                <button
                  onClick={() => setShowAddModal(true)}
                  className={`dashboard-btn dashboard-btn--small ${
                    courses.length === 0
                      ? "dashboard-btn--warning"
                      : "dashboard-btn--primary"
                  }`}
                >
                  <span className="dashboard-btn__icon">+</span>
                  <span className="dashboard-btn__text">
                    {courses.length === 0
                      ? "Create Course First"
                      : "Add Deadline"}
                  </span>
                </button>
              </div>

              <div className="dashboard-upcoming-list">
                {upcomingDeadlines.length === 0 ? (
                  <div className="dashboard-empty-state">
                    <span>🎉</span>
                    <h3>All clear!</h3>
                    <p>No deadlines for now.</p>
                  </div>
                ) : (
                  upcomingDeadlines.map((deadline) => {
                    const course = courses.find(
                      (c) => c.id === deadline.courseId
                    );
                    return (
                      <div
                        key={deadline.id}
                        className="dashboard-upcoming-item"
                        style={{
                          borderLeft: `4px solid ${
                            deadline.priority === "high" ? "#ef4444" : "#10b981"
                          }`,
                        }}
                        onClick={() =>
                          onUpdateDeadline(deadline.id, { status: "completed" })
                        }
                      >
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
                                { month: "short", day: "numeric" }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="dashboard-sidebar-column">
              <div className="dashboard-chart-card">
                <div className="dashboard-chart-card__header">
                  <span>📈</span>
                  <h3 className="dashboard-chart-card__title">
                    This Week Overview
                  </h3>
                </div>
                <SimpleBarChart data={chartData} />
              </div>
              <div className="dashboard-stats-summary">
                <h3 className="dashboard-stats-summary__title">Quick Stats</h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px 0",
                  }}
                >
                  <ProgressBar percentage={completionRate} size={100} />
                </div>
                <div className="dashboard-stats-summary__list">
                  <div className="dashboard-stats-summary__item">
                    <span className="dashboard-stats-summary__label">
                      Total Courses
                    </span>
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
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}
