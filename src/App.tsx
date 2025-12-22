import React, { useState } from "react";
import "./Styles/globals.scss";

import { LandingPage } from "./Pages/LandingPage/LandingPage";
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import { SignupPage } from "./Pages/SignupPage/SignupPage";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { DeadlinesPage } from "./Pages/DeadlinesPage/DeadlinesPage";
import { CoursesPage } from "./Pages/CoursesPage/CoursesPage";
import { CourseDetailsPage } from "./Pages/CourseDetailsPage/CourseDetailsPage";
import { CalendarPage } from "./Pages/CalendarPage/CalendarPage";
import { SettingsPage } from "./Pages/SettingsPage/SettingsPage";
import { Course } from "./Types/course";
import { Deadline } from "./Types/deadline";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("landing");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // Mock data
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      title: "Computer Science 101",
      instructor: "Dr. Smith",
      semester: "Fall 2024",
      color: "#3B82F6",
    },
    {
      id: "2",
      title: "Data Structures",
      instructor: "Prof. Johnson",
      semester: "Fall 2024",
      color: "#10B981",
    },
    {
      id: "3",
      title: "Calculus II",
      instructor: "Dr. Williams",
      semester: "Fall 2024",
      color: "#F59E0B",
    },
    {
      id: "4",
      title: "English Literature",
      instructor: "Prof. Brown",
      semester: "Fall 2024",
      color: "#8B5CF6",
    },
    {
      id: "5",
      title: "Physics I",
      instructor: "Dr. Davis",
      semester: "Fall 2024",
      color: "#EF4444",
    },
  ]);

  const [deadlines, setDeadlines] = useState<Deadline[]>([
    {
      id: "1",
      taskName: "Lab Report #3",
      courseId: "1",
      type: "assignment",
      dueDate: new Date("2024-12-15"),
      priority: "high",
      description: "Complete the data analysis section",
      status: "upcoming",
    },
    {
      id: "2",
      taskName: "Midterm Exam",
      courseId: "2",
      type: "exam",
      dueDate: new Date("2024-12-18"),
      priority: "high",
      description: "Chapters 1-6",
      status: "upcoming",
    },
    {
      id: "3",
      taskName: "Problem Set 7",
      courseId: "3",
      type: "assignment",
      dueDate: new Date("2024-12-14"),
      priority: "medium",
      description: "Integration problems",
      status: "upcoming",
    },
    {
      id: "4",
      taskName: "Essay Draft",
      courseId: "4",
      type: "assignment",
      dueDate: new Date("2024-12-10"),
      priority: "high",
      description: "Analysis of Shakespeare",
      status: "overdue",
    },
    {
      id: "5",
      taskName: "Quiz 4",
      courseId: "5",
      type: "quiz",
      dueDate: new Date("2024-12-20"),
      priority: "low",
      description: "Newton's Laws",
      status: "upcoming",
    },
    {
      id: "6",
      taskName: "Project Proposal",
      courseId: "2",
      type: "project",
      dueDate: new Date("2024-12-16"),
      priority: "medium",
      description: "Binary search tree implementation",
      status: "upcoming",
    },
    {
      id: "7",
      taskName: "Reading Response",
      courseId: "4",
      type: "assignment",
      dueDate: new Date("2024-12-08"),
      priority: "low",
      description: "Hamlet Act 3",
      status: "completed",
    },
  ]);

  const handleLogin = (email: string, password: string) => {
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
  };

  const handleSignup = (name: string, email: string, password: string) => {
    setUserName(name);
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage("landing");
  };

  const navigateTo = (page: string) => {
    if (
      !isAuthenticated &&
      page !== "landing" &&
      page !== "login" &&
      page !== "signup"
    ) {
      setCurrentPage("login");
      return;
    }
    setCurrentPage(page);
  };

  const viewCourseDetails = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentPage("course-details");
  };

  const addDeadline = (deadline: Omit<Deadline, "id">) => {
    const newDeadline = {
      ...deadline,
      id: Date.now().toString(),
    };
    setDeadlines([...deadlines, newDeadline]);
  };

  const updateDeadline = (id: string, updatedDeadline: Partial<Deadline>) => {
    setDeadlines(
      deadlines.map((d) => (d.id === id ? { ...d, ...updatedDeadline } : d))
    );
  };

  const deleteDeadline = (id: string) => {
    setDeadlines(deadlines.filter((d) => d.id !== id));
  };

  const addCourse = (course: Omit<Course, "id">) => {
    const newCourse = {
      ...course,
      id: Date.now().toString(),
    };
    setCourses([...courses, newCourse]);
  };

  // Username update function
  const updateUserName = (name: string) => {
    setUserName(name);
  };

  const renderPage = () => {
    if (!isAuthenticated) {
      switch (currentPage) {
        case "login":
          return <LoginPage onLogin={handleLogin} onNavigate={navigateTo} />;
        case "signup":
          return <SignupPage onSignup={handleSignup} onNavigate={navigateTo} />;
        default:
          return <LandingPage onNavigate={navigateTo} />;
      }
    }

    switch (currentPage) {
      case "dashboard":
        return (
          <Dashboard
            userName={userName}
            deadlines={deadlines}
            courses={courses}
            onNavigate={navigateTo}
            onLogout={handleLogout}
            onAddDeadline={addDeadline as any}
            onUpdateDeadline={updateDeadline}
          />
        );
      case "deadlines":
        return (
          <DeadlinesPage
            deadlines={deadlines}
            courses={courses}
            onNavigate={navigateTo}
            onLogout={handleLogout}
            onAddDeadline={addDeadline as any}
            onUpdateDeadline={updateDeadline}
            onDeleteDeadline={deleteDeadline}
          />
        );
      case "courses":
        return (
          <CoursesPage
            courses={courses}
            deadlines={deadlines}
            onNavigate={navigateTo}
            onLogout={handleLogout}
            onViewCourse={viewCourseDetails}
            onAddCourse={addCourse}
          />
        );
      case "course-details":
        const selectedCourse = courses.find((c) => c.id === selectedCourseId);
        return selectedCourse ? (
          <CourseDetailsPage
            course={selectedCourse}
            deadlines={deadlines.filter((d) => d.courseId === selectedCourseId)}
            onNavigate={navigateTo}
            onLogout={handleLogout}
            onAddDeadline={addDeadline as any}
            onBack={() => navigateTo("courses")}
          />
        ) : null;
      case "calendar":
        return (
          <CalendarPage
            deadlines={deadlines}
            courses={courses}
            onNavigate={navigateTo}
            onLogout={handleLogout}
            onAddDeadline={addDeadline as any}
          />
        );
      case "settings":
        return (
          <SettingsPage
            userName={userName}
            onNavigate={navigateTo}
            onLogout={handleLogout}
            onUpdateName={updateUserName}
          />
        );
      default:
        return (
          <Dashboard
            userName={userName}
            deadlines={deadlines}
            courses={courses}
            onNavigate={navigateTo}
            onLogout={handleLogout}
            onAddDeadline={addDeadline as any}
            onUpdateDeadline={updateDeadline}
          />
        );
    }
  };

  return <div className="app">{renderPage()}</div>;
}
