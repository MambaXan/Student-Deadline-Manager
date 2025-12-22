import React, { useState } from 'react';
import './CourseDetailsPage.scss';

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
  type: 'assignment' | 'quiz' | 'exam' | 'project';
  dueDate: Date;
  status: 'upcoming' | 'overdue' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

interface CourseDetailsPageProps {
  course: Course;
  deadlines: Deadline[];
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onAddDeadline: (deadline: Omit<Deadline, 'id'>) => void;
  onBack: () => void;
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
            onClick={() => onNavigate('calendar')}
            className="sidebar__nav-item"
          >
            📅 Calendar
          </button>
          <button 
            onClick={() => onNavigate('courses')}
            className={`sidebar__nav-item ${currentPage === 'courses' ? 'sidebar__nav-item--active' : ''}`}
          >
            📚 Courses
          </button>
          <button 
            onClick={() => onNavigate('deadlines')}
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
        <h1 className="topbar__title">Course Details</h1>
        <div className="topbar__user">
          <span className="topbar__user-name">Welcome back!</span>
        </div>
      </div>
    </div>
  );
};

const DeadlineModal: React.FC<{
  courses: Course[];
  preselectedCourseId: string;
  onSave: (deadline: Omit<Deadline, 'id'>) => void;
  onClose: () => void;
}> = ({ courses, preselectedCourseId, onSave, onClose }) => {
  const [taskName, setTaskName] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(preselectedCourseId);
  const [dueDate, setDueDate] = useState('');
  const [type, setType] = useState('assignment');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName || !selectedCourseId || !dueDate) return;

    onSave({
      courseId: selectedCourseId,
      taskName,
      type: type as Deadline['type'],
      dueDate: new Date(dueDate),
      status: 'upcoming',
      priority: priority as Deadline['priority']
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">Add New Deadline</h3>
          <button onClick={onClose} className="modal__close-btn">×</button>
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
              {courses.map(course => (
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
              onChange={(e) => setType(e.target.value)}
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
            <button type="button" className="btn btn--secondary" onClick={onClose}>
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

export function CourseDetailsPage({
  course,
  deadlines,
  onNavigate,
  onLogout,
  onAddDeadline,
  onBack
}: CourseDetailsPageProps) {
  const [showAddModal, setShowAddModal] = useState(false);

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'badge badge--high';
      case 'medium': return 'badge badge--medium';
      case 'low': return 'badge badge--low';
      default: return 'badge';
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed': return 'badge badge--completed';
      case 'overdue': return 'badge badge--overdue';
      case 'upcoming': return 'badge badge--upcoming';
      default: return 'badge';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment': return '📝';
      case 'quiz': return '❓';
      case 'exam': return '📋';
      case 'project': return '💼';
      default: return '📄';
    }
  };

  const upcomingDeadlines = deadlines.filter(d => d.status === 'upcoming').length;
  const overdueDeadlines = deadlines.filter(d => d.status === 'overdue').length;
  const completedDeadlines = deadlines.filter(d => d.status === 'completed').length;

  return (
    <div className="course-details-page">
      <Sidebar currentPage="courses" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="main-content">
        <TopBar userName="Alex" />
        
        <main className="content">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="back-btn"
          >
            ← Back to Courses
          </button>

          {/* Course Header */}
          <div className="course-header">
            <div
              className="course-header__banner"
              style={{ backgroundColor: course.color }}
            >
              <div className="course-header__overlay" />
              <div className="course-header__info">
                <div className="course-header__left">
                  <h1 className="course-header__title">
                    {course.title}
                  </h1>
                  <div className="course-header__meta">
                    <div className="course-header__meta-item">
                      <span className="course-header__meta-icon">👤</span>
                      <span className="course-header__meta-text">{course.instructor}</span>
                    </div>
                    <div className="course-header__meta-item">
                      <span className="course-header__meta-icon">⏰</span>
                      <span className="course-header__meta-text">{course.semester}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn btn--add-deadline"
                >
                  <span className="btn__icon">+</span>
                  Add Deadline
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="course-stats">
              <div className="course-stats__item">
                <div className="course-stats__value">{upcomingDeadlines}</div>
                <div className="course-stats__label">Upcoming</div>
              </div>
              <div className="course-stats__item course-stats__item--border">
                <div className="course-stats__value">{overdueDeadlines}</div>
                <div className="course-stats__label">Overdue</div>
              </div>
              <div className="course-stats__item">
                <div className="course-stats__value">{completedDeadlines}</div>
                <div className="course-stats__label">Completed</div>
              </div>
            </div>
          </div>

          {/* Deadlines Section */}
          <div className="deadlines-section">
            <div className="deadlines-section__header">
              <h2 className="deadlines-section__title">Course Deadlines</h2>
            </div>

            {deadlines.length === 0 ? (
              <div className="empty-state">
                <span className="empty-state__icon">📅</span>
                <p className="empty-state__text">No deadlines for this course yet</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn btn--primary"
                >
                  <span className="btn__icon">+</span>
                  Add First Deadline
                </button>
              </div>
            ) : (
              <div className="deadlines-table-container">
                <table className="deadlines-table">
                  <thead className="deadlines-table__head">
                    <tr>
                      <th className="deadlines-table__header">Task</th>
                      <th className="deadlines-table__header">Type</th>
                      <th className="deadlines-table__header">Due Date</th>
                      <th className="deadlines-table__header">Status</th>
                      <th className="deadlines-table__header">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="deadlines-table__body">
                    {deadlines.map(deadline => (
                      <tr key={deadline.id} className="deadlines-table__row">
                        <td className="deadlines-table__cell">
                          <span className={`deadlines-table__task ${deadline.status === 'completed' ? 'deadlines-table__task--completed' : ''}`}>
                            {deadline.taskName}
                          </span>
                        </td>
                        <td className="deadlines-table__cell">
                          <span className="deadlines-table__type">
                            <span className="deadlines-table__type-icon">{getTypeIcon(deadline.type)}</span>
                            <span className="deadlines-table__type-text">{deadline.type}</span>
                          </span>
                        </td>
                        <td className="deadlines-table__cell deadlines-table__cell--date">
                          {deadline.dueDate.toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="deadlines-table__cell">
                          <span className={getStatusClass(deadline.status)}>
                            {deadline.status}
                          </span>
                        </td>
                        <td className="deadlines-table__cell">
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