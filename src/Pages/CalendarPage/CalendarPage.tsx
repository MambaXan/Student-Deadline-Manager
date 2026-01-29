import React, { useState } from "react";
import "./CalendarPage.scss";
import { Course } from "../../Types/course";
import { Deadline as ImportedDeadline } from "../../Types/deadline";
import { Sidebar } from "../../components/Sidebar";
import { MobileNav } from "../../components/MobileNav";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";

interface Deadline {
  id: string;
  courseId: string;
  taskName: string;
  dueDate: Date;
  status: "upcoming" | "completed";
}

interface CalendarPageProps {
  currentPage: string;
  deadlines: ImportedDeadline[];
  courses: Course[];
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onAddDeadline: (deadline: Omit<Deadline, "id">) => void;
}

// Components
const TopBar: React.FC<{
  userName: string;
  onMenuClick?: () => void;
}> = ({ userName, onMenuClick }) => {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="calendar-topbar">
      <div className="calendar-topbar__content">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="calendar-topbar__menu-btn"
              style={{
                fontSize: "24px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              ☰
            </button>
          )}
          <h1 className="calendar-topbar__title" style={{ margin: 0 }}>
            Calendar
          </h1>
        </div>
        <div className="calendar-topbar__user">
          <span className="calendar-topbar__user-name">
            {greeting}, {userName}!
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
}> = ({ courses, onSave, onClose }) => {
  const [taskName, setTaskName] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [dueDate, setDueDate] = useState("");

  const courseOptions = courses.map((course) => ({
    value: course.id,
    label: course.title,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName || !selectedCourseId || !dueDate) return;

    onSave({
      courseId: selectedCourseId,
      taskName,
      dueDate: new Date(dueDate),
      status: "upcoming",
    });
    onClose();
  };

  return (
    <div className="calendar-modal-overlay" onClick={onClose}>
      <div className="calendar-modal" onClick={(e) => e.stopPropagation()}>
        <div className="calendar-modal__header">
          <h3 className="calendar-modal__title">Add New Deadline</h3>
          <button onClick={onClose} className="calendar-modal__close-btn">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="calendar-modal__form">
          <div className="calendar-form-group">
            <label className="calendar-form-label">Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="calendar-form-input"
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
          <div className="calendar-form-group">
            <label className="calendar-form-label">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="calendar-form-input"
              required
            />
          </div>
          <div className="calendar-modal__actions">
            <button
              type="button"
              className="calendar-btn calendar-btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="calendar-btn calendar-btn--primary"
            >
              Save Deadline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export function CalendarPage({
  currentPage,
  deadlines,
  courses,
  onNavigate,
  onLogout,
  onAddDeadline,
}: CalendarPageProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getCourseById = (courseId: string) => {
    return courses.find((c) => c.id === courseId);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const getDeadlinesForDate = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    date.setHours(0, 0, 0, 0);

    return deadlines.filter((deadline) => {
      const dueDate = new Date(deadline.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() === date.getTime();
    });
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  // Generate calendar days
  const days = [];
  const totalDays = daysInMonth(currentDate);
  const startDay = firstDayOfMonth(currentDate);

  // Empty cells for days before the first day of month
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  // Actual days
  for (let day = 1; day <= totalDays; day++) {
    days.push(day);
  }

  // Get this week's deadlines for sidebar
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekEnd = new Date(today);
  weekEnd.setDate(weekEnd.getDate() + 7);

  const thisWeekDeadlines = deadlines
    .filter((deadline) => {
      const dueDate = new Date(deadline.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return (
        dueDate >= today && dueDate <= weekEnd && deadline.status === "upcoming"
      );
    })
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );

  return (
    <div className="calendar-page">
      <Sidebar
        currentPage={currentPage}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <MobileNav
        currentPage="calendar"
        onNavigate={onNavigate}
        onLogout={onLogout}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="calendar-main-content">
        <TopBar userName="Marlen" onMenuClick={() => setMobileMenuOpen(true)} />

        <main className="calendar-content">
          <div className="calendar-container">
            <div className="calendar-widget">
              <div className="calendar-widget__header">
                <h2 className="calendar-widget__title">
                  {monthNames[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </h2>
                <div className="calendar-widget__controls">
                  <button
                    onClick={previousMonth}
                    className="calendar-widget__nav-btn"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="calendar-btn calendar-btn--today"
                  >
                    Today
                  </button>
                  <button
                    onClick={nextMonth}
                    className="calendar-widget__nav-btn"
                  >
                    ›
                  </button>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="calendar-btn calendar-btn--add"
                  >
                    + Add Deadline
                  </button>
                </div>
              </div>

              <div className="calendar-widget__grid">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div key={day} className="calendar-widget__day-header">
                      {day}
                    </div>
                  )
                )}

                {days.map((day, index) => {
                  if (day === null) {
                    return (
                      <div
                        key={`empty-${index}`}
                        className="calendar-widget__day calendar-widget__day--empty"
                      />
                    );
                  }

                  const dayDeadlines = getDeadlinesForDate(day);
                  const isTodayDate = isToday(day);

                  return (
                    <div
                      key={day}
                      className={`calendar-widget__day ${
                        isTodayDate ? "calendar-widget__day--today" : ""
                      }`}
                    >
                      <div
                        className={`calendar-widget__day-number ${
                          isTodayDate
                            ? "calendar-widget__day-number--today"
                            : ""
                        }`}
                      >
                        {day}
                      </div>
                      <div className="calendar-widget__deadlines">
                        {dayDeadlines.slice(0, 3).map((deadline) => {
                          const course = getCourseById(deadline.courseId);
                          return (
                            <div
                              key={deadline.id}
                              className="calendar-widget__deadline-item"
                              style={{
                                backgroundColor: course?.color
                                  ? `${course.color}20`
                                  : "#f3f4f6",
                                color: course?.color || "#6b7280",
                                borderLeft: `3px solid ${
                                  course?.color || "#6b7280"
                                }`,
                              }}
                              title={deadline.taskName}
                            >
                              {deadline.taskName}
                            </div>
                          );
                        })}
                        {dayDeadlines.length > 3 && (
                          <div className="calendar-widget__deadline-more">
                            + {dayDeadlines.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="calendar-sidebar-content">
              <div className="calendar-sidebar-card">
                <h3 className="calendar-sidebar-card__title">This Week</h3>

                {thisWeekDeadlines.length === 0 ? (
                  <p className="calendar-sidebar-card__empty">
                    No deadlines this week
                  </p>
                ) : (
                  <div className="calendar-deadlines-list">
                    {thisWeekDeadlines.map((deadline) => {
                      const course = getCourseById(deadline.courseId);
                      return (
                        <div
                          key={deadline.id}
                          className="calendar-deadline-card"
                        >
                          <div className="calendar-deadline-card__title">
                            {deadline.taskName}
                          </div>
                          <div className="calendar-deadline-card__details">
                            {course && (
                              <span
                                className="calendar-deadline-card__course"
                                style={{
                                  backgroundColor: `${course.color}20`,
                                  color: course.color,
                                }}
                              >
                                {course.title.split(" ")[0]}
                              </span>
                            )}
                            <span className="calendar-deadline-card__date">
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
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="calendar-sidebar-card">
                <h3 className="calendar-sidebar-card__title">Courses</h3>
                <div className="calendar-courses-list">
                  {courses.slice(0, 5).map((course) => (
                    <div key={course.id} className="calendar-course-item">
                      <div
                        className="calendar-course-item__color"
                        style={{ backgroundColor: course.color }}
                      />
                      <span className="calendar-course-item__title">
                        {course.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        {showAddModal && (
          <DeadlineModal
            courses={courses}
            onSave={onAddDeadline}
            onClose={() => setShowAddModal(false)}
          />
        )}
      </div>
    </div>
  );
}
