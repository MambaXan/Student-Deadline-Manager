import React, { useState } from "react";
import "./CoursesPage.scss";
import { Sidebar } from "../../components/Sidebar";
import { MobileNav } from "../../components/MobileNav";

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
  currentPage: string;
  userName: string;
  courses: Course[];
  deadlines: Deadline[];
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onViewCourse: (courseId: string) => void;
  onAddCourse: (course: Omit<Course, "id">) => void;
  onDeleteCourse: (courseId: string) => void;
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
    <div className="courses-page-topbar">
      <div className="courses-page-topbar__content">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {onMenuClick && (
            <button
              className="courses-page-topbar__menu-btn"
              onClick={onMenuClick}
            >
              ☰
            </button>
          )}
          <h1 className="courses-page-topbar__title">My Courses</h1>
        </div>
        <div className="courses-page-topbar__user">
          <span className="courses-page-topbar__user-name">
            {greeting}, {userName}!
          </span>
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
    <div className="courses-page-modal-overlay" onClick={onClose}>
      <div className="courses-page-modal" onClick={(e) => e.stopPropagation()}>
        <div className="courses-page-modal__header">
          <h3 className="courses-page-modal__title">Add New Course</h3>
          <button onClick={onClose} className="courses-page-modal__close-btn">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="courses-page-modal__form">
          <div className="courses-page-form-group">
            <label className="courses-page-form-label">Course Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="courses-page-form-input"
              placeholder="e.g., Computer Science 101"
              required
            />
          </div>
          <div className="courses-page-form-group">
            <label className="courses-page-form-label">Instructor Name</label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="courses-page-form-input"
              placeholder="e.g., Dr. Smith"
              required
            />
          </div>
          <div className="courses-page-form-group">
            <label className="courses-page-form-label">Semester</label>
            <input
              type="text"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="courses-page-form-input"
              placeholder="e.g., Fall 2024"
              required
            />
          </div>
          <div className="courses-page-form-group">
            <label className="courses-page-form-label">Course Color</label>
            <div className="courses-page-color-picker">
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
                  className={`courses-page-color-picker__item ${
                    color === colorOption
                      ? "courses-page-color-picker__item--selected"
                      : ""
                  }`}
                  style={{ backgroundColor: colorOption }}
                />
              ))}
            </div>
          </div>
          <div className="courses-page-modal__actions">
            <button
              type="button"
              className="courses-page-btn courses-page-btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="courses-page-btn courses-page-btn--primary"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export function CoursesPage({
  currentPage,
  courses,
  userName,
  deadlines,
  onNavigate,
  onLogout,
  onViewCourse,
  onAddCourse,
  onDeleteCourse,
}: CoursesPageProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getUpcomingTasksCount = (courseId: string) => {
    return deadlines.filter(
      (d) => d.courseId === courseId && d.status === "upcoming"
    ).length;
  };

  return (
    <div className="courses-page-container">
      <Sidebar
        currentPage={currentPage}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <MobileNav
        currentPage="courses"
        onNavigate={onNavigate}
        onLogout={onLogout}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="courses-page-main-content">
        <TopBar
          userName={userName}
          onMenuClick={() => setMobileMenuOpen(true)}
        />

        <main className="courses-page-content">
          <div className="courses-page-header">
            <div className="courses-page-header__content">
              <div className="courses-page-header__text">
                <h1 className="courses-page-header__title">My Courses</h1>
                <p className="courses-page-header__subtitle">
                  Organize and track all your university courses
                </p>
              </div>
              <div className="courses-page-header__actions">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="courses-page-btn courses-page-btn--add-course"
                >
                  <span className="courses-page-btn__icon">+</span>
                  Add Course
                </button>
              </div>
            </div>
          </div>

          {courses.length === 0 ? (
            <div className="courses-page-empty-state">
              <span className="courses-page-empty-state__icon">📚</span>
              <h3 className="courses-page-empty-state__title">
                No courses yet
              </h3>
              <p className="courses-page-empty-state__text">
                Add your first course to get started
              </p>
            </div>
          ) : (
            <div className="courses-page-grid">
              {courses.map((course) => {
                const upcomingCount = getUpcomingTasksCount(course.id);

                return (
                  <div
                    key={course.id}
                    className="courses-page-card"
                    onClick={() => onViewCourse(course.id)}
                  >
                    <div
                      className="courses-page-card__banner"
                      style={{ backgroundColor: course.color }}
                    >
                      <div className="courses-page-card__overlay" />
                      <div className="courses-page-card__icon">📚</div>
                      <button
                        className="courses-page-card__delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            window.confirm(
                              "Are you sure you want to delete this course?"
                            )
                          ) {
                            onDeleteCourse(course.id);
                          }
                        }}
                      >
                        🗑️
                      </button>
                    </div>

                    <div className="courses-page-card__content">
                      <h3 className="courses-page-card__title">
                        {course.title}
                      </h3>

                      <div className="courses-page-card__details">
                        <div className="courses-page-card__detail">
                          <span className="courses-page-card__detail-icon">
                            👤
                          </span>
                          <span className="courses-page-card__detail-text">
                            {course.instructor}
                          </span>
                        </div>
                        <div className="courses-page-card__detail">
                          <span className="courses-page-card__detail-icon">
                            ⏰
                          </span>
                          <span className="courses-page-card__detail-text">
                            {course.semester}
                          </span>
                        </div>
                      </div>

                      <div className="courses-page-card__footer">
                        <span className="courses-page-card__tasks-label">
                          Upcoming tasks
                        </span>
                        <span
                          className="courses-page-card__tasks-count"
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

                      <button className="courses-page-card__view-btn">
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
