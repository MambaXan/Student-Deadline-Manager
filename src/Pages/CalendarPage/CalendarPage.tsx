import React, { useState } from 'react';
import './CalendarPage.scss';
import { Course } from '../../Types/course';
import { Deadline as ImportedDeadline} from '../../Types/deadline';

// Интерфейсы
// interface Course {
//   id: string;
//   title: string;
//   color: string;
// }

interface Deadline {
  id: string;
  courseId: string;
  taskName: string;
  dueDate: Date;
  status: 'upcoming' | 'completed';
}

interface CalendarPageProps {
  deadlines: ImportedDeadline[];
  courses: Course[];
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onAddDeadline: (deadline: Omit<Deadline, 'id'>) => void;
}

// Компоненты
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
            className={`sidebar__nav-item ${currentPage === 'calendar' ? 'sidebar__nav-item--active' : ''}`}
          >
            📅 Calendar
          </button>
          <button 
            onClick={() => onNavigate('courses')}
            className="sidebar__nav-item"
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
        <h1 className="topbar__title">Academic Calendar</h1>
        <div className="topbar__user">
          <span className="topbar__user-name">Welcome, {userName}</span>
        </div>
      </div>
    </div>
  );
};

const DeadlineModal: React.FC<{
  courses: Course[];
  onSave: (deadline: Omit<Deadline, 'id'>) => void;
  onClose: () => void;
}> = ({ courses, onSave, onClose }) => {
  const [taskName, setTaskName] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName || !selectedCourseId || !dueDate) return;

    onSave({
      courseId: selectedCourseId,
      taskName,
      dueDate: new Date(dueDate),
      status: 'upcoming'
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
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
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

export function CalendarPage({
  deadlines,
  courses,
  onNavigate,
  onLogout,
  onAddDeadline
}: CalendarPageProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);

  const getCourseById = (courseId: string) => {
    return courses.find(c => c.id === courseId);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getDeadlinesForDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    date.setHours(0, 0, 0, 0);
    
    return deadlines.filter(deadline => {
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
  
  const thisWeekDeadlines = deadlines.filter(deadline => {
    const dueDate = new Date(deadline.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate >= today && dueDate <= weekEnd && deadline.status === 'upcoming';
  }).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <div className="calendar-page">
      <Sidebar currentPage="calendar" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="main-content">
        <TopBar userName="Alex" />
        
        <main className="content">
          <div className="calendar-container">
            {/* Calendar */}
            <div className="calendar">
              {/* Calendar Header */}
              <div className="calendar__header">
                <h2 className="calendar__title">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="calendar__controls">
                  <button
                    onClick={previousMonth}
                    className="calendar__nav-btn"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="btn btn--today"
                  >
                    Today
                  </button>
                  <button
                    onClick={nextMonth}
                    className="calendar__nav-btn"
                  >
                    ›
                  </button>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="btn btn--add"
                  >
                    + Add Deadline
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="calendar__grid">
                {/* Day Headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="calendar__day-header">
                    {day}
                  </div>
                ))}

                {/* Calendar Days */}
                {days.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="calendar__day calendar__day--empty" />;
                  }

                  const dayDeadlines = getDeadlinesForDate(day);
                  const isTodayDate = isToday(day);

                  return (
                    <div
                      key={day}
                      className={`calendar__day ${isTodayDate ? 'calendar__day--today' : ''}`}
                    >
                      <div className={`calendar__day-number ${isTodayDate ? 'calendar__day-number--today' : ''}`}>
                        {day}
                      </div>
                      <div className="calendar__deadlines">
                        {dayDeadlines.slice(0, 3).map(deadline => {
                          const course = getCourseById(deadline.courseId);
                          return (
                            <div
                              key={deadline.id}
                              className="calendar__deadline-item"
                              style={{
                                backgroundColor: course?.color ? `${course.color}20` : '#f3f4f6',
                                color: course?.color || '#6b7280',
                                borderLeft: `3px solid ${course?.color || '#6b7280'}`
                              }}
                              title={deadline.taskName}
                            >
                              {deadline.taskName}
                            </div>
                          );
                        })}
                        {dayDeadlines.length > 3 && (
                          <div className="calendar__deadline-more">
                            +{dayDeadlines.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div className="sidebar-content">
              {/* This Week */}
              <div className="sidebar-card">
                <h3 className="sidebar-card__title">This Week</h3>
                
                {thisWeekDeadlines.length === 0 ? (
                  <p className="sidebar-card__empty">
                    No deadlines this week
                  </p>
                ) : (
                  <div className="deadlines-list">
                    {thisWeekDeadlines.map(deadline => {
                      const course = getCourseById(deadline.courseId);
                      return (
                        <div key={deadline.id} className="deadline-card">
                          <div className="deadline-card__title">
                            {deadline.taskName}
                          </div>
                          <div className="deadline-card__details">
                            {course && (
                              <span
                                className="deadline-card__course"
                                style={{
                                  backgroundColor: `${course.color}20`,
                                  color: course.color
                                }}
                              >
                                {course.title.split(' ')[0]}
                              </span>
                            )}
                            <span className="deadline-card__date">
                              {new Date(deadline.dueDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Color Legend */}
              <div className="sidebar-card">
                <h3 className="sidebar-card__title">Courses</h3>
                <div className="courses-list">
                  {courses.slice(0, 5).map(course => (
                    <div key={course.id} className="course-item">
                      <div
                        className="course-item__color"
                        style={{ backgroundColor: course.color }}
                      />
                      <span className="course-item__title">
                        {course.title}
                      </span>
                    </div>
                  ))}
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