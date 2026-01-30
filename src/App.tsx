import React, { useState, useEffect } from "react";
import "./Styles/globals.scss";

import { LandingPage } from "./Pages/LandingPage";
import { LoginPage } from "./Pages/LoginPage";
import { SignupPage } from "./Pages/SignupPage";
import { Dashboard } from "./Pages/Dashboard";
import { DeadlinesPage } from "./Pages/DeadlinesPage";
import { CoursesPage } from "./Pages/CoursesPage";
import { CourseDetailsPage } from "./Pages/CourseDetailsPage";
import { CalendarPage } from "./Pages/CalendarPage";
import { SettingsPage } from "./Pages/SettingsPage";

import { Course } from "./Types/course";
import { Deadline } from "./Types/deadline";

import { Toaster, toast } from "react-hot-toast";

export default function App() {
  // --- LocalStorage Checked States ---
  const [currentPage, setCurrentPage] = useState<string>(() => {
    return localStorage.getItem("lastPage") || "landing";
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuth") === "true";
  });
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("userName") || "";
  });
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem("my_courses");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse courses", e);
      return [];
    }
  });

  const [deadlines, setDeadlines] = useState<Deadline[]>(() => {
    try {
      const saved = localStorage.getItem("my_deadlines");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((d: any) => ({
            ...d,
            dueDate: new Date(d.dueDate),
          }));
        }
      }
      return [];
    } catch (e) {
      console.error("Failed to parse deadlines", e);
      return [];
    }
  });

  // --- Save effects (do not change appearance, only write to memory) ---
  useEffect(() => {
    localStorage.setItem("isAuth", isAuthenticated.toString());
    localStorage.setItem("lastPage", currentPage);
    localStorage.setItem("userName", userName);
  }, [isAuthenticated, currentPage, userName]);

  useEffect(() => {
    localStorage.setItem("my_courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("my_deadlines", JSON.stringify(deadlines));
  }, [deadlines]);

  // --- Original logic of functions ---
  const handleLogin = (email: string, password: string) => {
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
    toast(`Welcome back!`, { icon: "👋" });
  };

  const handleSignup = (name: string, email: string, password: string) => {
    setUserName(name);
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage("landing");
    localStorage.removeItem("isAuth");
    localStorage.removeItem("lastPage");
  };

  const navigateTo = (page: string) => {
    if (!isAuthenticated && !["landing", "login", "signup"].includes(page)) {
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
    const newDeadline = { ...deadline, id: Date.now().toString() };
    setDeadlines([...deadlines, newDeadline as Deadline]);
    toast.success("Deadline added!");
  };

  const clearCompletedDeadlines = () => {
    const activeOnly = deadlines.filter((d) => d.status !== "completed");
    setDeadlines(activeOnly);
    toast.success("Completed tasks cleared!");
  };

  const updateDeadline = (id: string, updatedDeadline: Partial<Deadline>) => {
    setDeadlines(
      deadlines.map((d) => (d.id === id ? { ...d, ...updatedDeadline } : d))
    );
  };

  const deleteDeadline = (id: string) => {
    setDeadlines(deadlines.filter((d) => d.id !== id));
    toast.error("Deadline deleted");
  };

  const addCourse = (course: Omit<Course, "id">) => {
    const newCourse = { ...course, id: Date.now().toString() };
    setCourses([...courses, newCourse]);
    toast.success("New course created!");
  };

  const updateUserName = (name: string) => {
    setUserName(name);
  };

  const deleteCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
    setDeadlines(deadlines.filter((d) => d.courseId !== id));
  };

  // --- Original rendering ---
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
        const sortedDeadlines = [...deadlines].sort(
          (a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );

        return (
          <Dashboard
            currentPage={currentPage}
            userName={userName}
            deadlines={sortedDeadlines}
            courses={courses}
            onNavigate={navigateTo}
            onLogout={handleLogout}
            onAddDeadline={addDeadline as any}
            onUpdateDeadline={updateDeadline}
            onClearCompleted={clearCompletedDeadlines}
          />
        );
      case "deadlines":
        return (
          <DeadlinesPage
            userName={userName}
            currentPage={currentPage}
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
            onDeleteCourse={deleteCourse}
            userName={userName}
            currentPage={currentPage}
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
        if (!selectedCourse) {
          setCurrentPage("courses");
          return null;
        }
        return (
          <CourseDetailsPage
            currentPage={currentPage}
            userName={userName}
            course={selectedCourse}
            deadlines={deadlines.filter((d) => d.courseId === selectedCourseId)}
            onNavigate={navigateTo}
            onLogout={handleLogout}
            onAddDeadline={addDeadline as any}
            onBack={() => navigateTo("courses")}
          />
        );
      case "calendar":
        return (
          <CalendarPage
            currentPage={currentPage}
            userName={userName}
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
            currentPage={currentPage}
            userName={userName}
            onNavigate={navigateTo}
            onLogout={handleLogout}
            onUpdateName={updateUserName}
          />
        );
      default:
        return (
          <Dashboard
            currentPage={currentPage}
            userName={userName}
            deadlines={deadlines}
            courses={courses}
            onNavigate={navigateTo}
            onLogout={handleLogout}
            onAddDeadline={addDeadline as any}
            onUpdateDeadline={updateDeadline}
            onClearCompleted={clearCompletedDeadlines}
          />
        );
    }
  };

  return (
    <div className="app">
      <Toaster position="top-right" reverseOrder={false} />
      {renderPage()}
    </div>
  );
}
