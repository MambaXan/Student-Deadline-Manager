import React, { useState } from "react";
import "./CoursesPage.scss";

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
  type: string;
  dueDate: Date;
  status: "upcoming" | "overdue" | "completed";
  priority: string;
}

interface CoursesPageProps {
  courses: Course[];
  deadlines: Deadline[];
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onViewCourse: (courseId: string) => void;
  onAddCourse: (course: Omit<Course, "id">) => void;
}

// Components
const Sidebar: React.FC<{
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}> = ({ currentPage, onNavigate, onLogout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__content">
        <h2 className="sidebar__title">Student Planner</h2>
        <nav className="sidebar__nav">
          <button
            onClick={() => onNavigate("calendar")}
            className="sidebar__nav-item"
          >
            📅 Calendar
          </button>
          <button
            onClick={() => onNavigate("courses")}
            className={`sidebar__nav-item ${
              currentPage === "courses" ? "sidebar__nav-item--active" : ""
            }`}
          >
            📚 Courses
          </button>
          <button
            onClick={() => onNavigate("deadlines")}
            className="sidebar__nav-item"
          >
            📝 Deadlines
          </button>
        </nav>
        <button onClick={onLogout} className="sidebar__logout-btn">
          👤 Logout
        </button>
      </div>
    </div>
  );
};

const TopBar: React.FC<{ userName: string }> = ({ userName }) => {
  return (
    <div className="topbar">
      <div className="topbar__content">
        <h1 className="topbar__title">My Courses</h1>
        <div className="topbar__user">
          <span className="topbar__user-name">Welcome back!</span>
        </div>
      </div>
    </div>
  );
};

const CourseModal: React.FC<{
  onSave: (course: Omit<Course, "id">) => void;
  onClose: () => void;
}> = ({ onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [semester, setSemester] = useState("");
  const [color, setColor] = useState("#3B82F6");

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">Add New Course</h3>
          <button onClick={onClose} className="modal__close-btn">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal__form">
          <div className="form-group">
            <label className="form-label">Course Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              placeholder="e.g., Computer Science 101"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Instructor Name</label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="form-input"
              placeholder="e.g., Dr. Smith"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Semester</label>
            <input
              type="text"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="form-input"
              placeholder="e.g., Fall 2024"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Course Color</label>
            <div className="color-picker">
              {[
                "#3B82F6",
                "#10B981",
                "#F59E0B",
                "#8B5CF6",
                "#EF4444",
                "#EC4899",
                "#14B8A6",
                "#F97316",
              ].map((colorOption) => (
                <button
                  key={colorOption}
                  type="button"
                  onClick={() => setColor(colorOption)}
                  className={`color-picker__item ${
                    color === colorOption ? "color-picker__item--selected" : ""
                  }`}
                  style={{ backgroundColor: colorOption }}
                />
              ))}
            </div>
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
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export function CoursesPage({
  courses,
  deadlines,
  onNavigate,
  onLogout,
  onViewCourse,
  onAddCourse,
}: CoursesPageProps) {
  const [showAddModal, setShowAddModal] = useState(false);

  const getUpcomingTasksCount = (courseId: string) => {
    return deadlines.filter(
      (d) => d.courseId === courseId && d.status === "upcoming"
    ).length;
  };

  return (
    <div className="courses-page">
      <Sidebar
        currentPage="courses"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className="main-content">
        <TopBar userName="Alex" />

        <main className="content">
          <div className="courses-header">
            <div className="courses-header__content">
              <div className="courses-header__text">
                <h1 className="courses-header__title">My Courses</h1>
                <p className="courses-header__subtitle">
                  Organize and track all your university courses
                </p>
              </div>
              <div className="courses-header__actions">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn btn--add-course"
                >
                  <span className="btn__icon">+</span>
                  Add Course
                </button>
              </div>
            </div>
          </div>

          {courses.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state__icon">📚</span>
              <h3 className="empty-state__title">No courses yet</h3>
              <p className="empty-state__text">
                Add your first course to get started
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="btn btn--primary"
              >
                <span className="btn__icon">+</span>
                Add Course
              </button>
            </div>
          ) : (
            <div className="courses-grid">
              {courses.map((course) => {
                const upcomingCount = getUpcomingTasksCount(course.id);

                return (
                  <div
                    key={course.id}
                    className="course-card"
                    onClick={() => onViewCourse(course.id)}
                  >
                    <div
                      className="course-card__banner"
                      style={{ backgroundColor: course.color }}
                    >
                      <div className="course-card__overlay" />
                      <div className="course-card__icon">📚</div>
                    </div>

                    <div className="course-card__content">
                      <h3 className="course-card__title">{course.title}</h3>

                      <div className="course-card__details">
                        <div className="course-card__detail">
                          <span className="course-card__detail-icon">👤</span>
                          <span className="course-card__detail-text">
                            {course.instructor}
                          </span>
                        </div>
                        <div className="course-card__detail">
                          <span className="course-card__detail-icon">⏰</span>
                          <span className="course-card__detail-text">
                            {course.semester}
                          </span>
                        </div>
                      </div>

                      <div className="course-card__footer">
                        <span className="course-card__tasks-label">
                          Upcoming tasks
                        </span>
                        <span
                          className="course-card__tasks-count"
                          style={{
                            backgroundColor:
                              upcomingCount > 0
                                ? `${course.color}20`
                                : "#f3f4f6",
                            color: upcomingCount > 0 ? course.color : "#6b7280",
                          }}
                        >
                          {upcomingCount}
                        </span>
                      </div>

                      <button className="course-card__view-btn">
                        View Details →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {showAddModal && (
        <CourseModal
          onSave={onAddCourse}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}
