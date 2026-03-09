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
import { getDeadlines, createDeadline, loginUser, registerUser } from "./api";

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

  const [deadlines, setDeadlines] = useState<Deadline[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      getDeadlines()
        .then((data) => {
          console.log("Что пришло из БД:", data);

          if (Array.isArray(data)) {
            const formatted = data.map((d: any) => ({
              ...d,
              dueDate: new Date(d.dueDate),
            }));
            setDeadlines(formatted);
          } else {
            console.error("Бэкенд вернул не список, а:", data);
            setDeadlines([]);
          }
        })
        .catch((err) => {
          console.error("Ошибка запроса:", err);
          toast.error("Database connection failed");
        });
    }
  }, [isAuthenticated]);

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isAuthenticated && token) {
      getDeadlines()
        .then((data) => {
          if (Array.isArray(data)) {
            const formatted: Deadline[] = data.map((d: any) => ({
              id: d.id.toString(),
              taskName: d.title || "Untitled",
              courseId: d.subject || "",
              dueDate: d.due_date ? new Date(d.due_date) : new Date(),
              status: (d.is_completed ? "completed" : "upcoming") as
                | "completed"
                | "upcoming",
              priority: (d.priority || "medium") as "low" | "medium" | "high",
              type: "assignment" as "assignment", // жестко задаем тип из твоего интерфейса
              description: d.description || "",
            }));
            setDeadlines(formatted);
          }
        })
        .catch((err) => {
          console.error("Ошибка загрузки:", err);
        });
    }
  }, [isAuthenticated]);

  // --- Original logic of functions ---
  const handleLogin = async (email: string, password: string) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const data = await loginUser(formData); // Токен сохранится в api.ts

      setIsAuthenticated(true);
      setUserName(email.split("@")[0]);
      setCurrentPage("dashboard");
      toast.success("Logged in successfully!");
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  const handleSignup = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      await registerUser({ email, password });
      toast.success("Registered! Now please log in.");
      setCurrentPage("login");
    } catch (err) {
      toast.error("Registration failed");
    }
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

  const addDeadline = async (deadline: any) => {
    try {
      const deadlineToSave = {
        title: deadline.taskName,
        subject: deadline.courseId,
        due_date: new Date(deadline.dueDate).toISOString(),
        is_completed: false,
        priority: deadline.priority || "medium",
        description: deadline.description || "",
      };

      const saved = await createDeadline(deadlineToSave); // Получаем ОДИН объект

      const formattedNew: Deadline = {
        id: saved.id.toString(),
        taskName: saved.title || "Untitled",
        courseId: saved.subject || "",
        dueDate: new Date(saved.due_date),
        status: (saved.is_completed ? "completed" : "upcoming") as
          | "completed"
          | "upcoming",
        priority: (saved.priority || "medium") as "low" | "medium" | "high",
        type: "assignment" as "assignment",
        description: saved.description || "",
      };

      setDeadlines((prev) => [...prev, formattedNew]);
      toast.success("Saved to Database!");
    } catch (e) {
      console.error(e);
      toast.error("DB Save Error");
    }
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
    if (!name || name.trim().length === 0) {
      return;
    }
    setUserName(name);
  };

  const deleteCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
    setDeadlines(deadlines.filter((d) => d.courseId !== id));
  };

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

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
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
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
